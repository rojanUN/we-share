const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const EXCLUDE_DIRS =
  /(^|\/)(node_modules|\.dart_tool|build|Pods|Carthage|DerivedData|dist|\.next|out|projectFilesBackup|\.idea|\.vscode|\.gradle|release|intermediates|libs|google_fonts|schemas|graphify-out|generated|coverage|vendor|venv|\.venv|__pycache__|\.cxx|captures|bin|obj|target|ephe|build-logic|buildSrc|\.github|fastlane|\.kiro|\.claude)(\/|$)/;
const EXCLUDE_TOOLING = /^([^/]+\/)?([Ss]cripts|[Tt]ools?|tooling|Docker|docker)\//;
const EXCLUDE_ROOT_SCRIPT = /^[^/]+\.(py|sh|rb|js|mjs|cjs)$/;
const EXCLUDE_GEN =
  /(\.freezed\.dart|\.g\.dart|\.gr\.dart|\.mocks\.dart|\.config\.dart|\.min\.js|\.min\.css|package-lock\.json|yarn\.lock|pnpm-lock\.yaml|next-env\.d\.ts|Package\.swift|\.gradle|\.gradle\.kts|\.config\.(js|cjs|mjs|ts))$/;
const TEST =
  /(^|\/)(test|tests|androidTest|androidTests|testDebug|testRelease|__tests__|integration_test|testFixtures)(\/|$)|(^|\/)[^/]*Tests(\/|$)|\.(test|spec)\.(ts|tsx|js|jsx|mjs)$|_test\.dart$|(^|\/)test_[^/]*\.py$|(^|\/)tests\.py$|(^|\/)conftest\.py$/;
const LOGIC =
  /\.(java|kt|swift|m|mm|dart|ts|tsx|js|jsx|mjs|cjs|py|sql|c|cc|cpp|cxx|h|hpp|go|rs|cs|rb|php|lua|proto|groovy)$/;
const SQL_DATA =
  /(sample|seed|dump|fixture|demo)[^/]*\.sql$|\/(sample-data|sample_data|seed|seeds|fixtures)\//;
const VENDORED =
  /(^|\/)(third_party|ThirdParty|thirdparty|Vendor|vendored)(\/|$)/;
const MARKUP =
  /res\/(layout|menu|navigation)[^/]*\/[^/]*\.xml$|\.(storyboard|xib|css|scss|sass|less|html|htm|jrxml)$/;
// Only Python framework-generated migrations are EXCLUDE_GEN; Sequelize JS migrations stay in LOGIC.
const PY_MIG_GEN = /(^|\/)migrations\/[0-9]{4}_[^/]*\.py$/;

function countCodeLines(full) {
  const text = fs.readFileSync(full, "utf8");
  const lines = text.split(/\r?\n/);
  let code = 0,
    blank = 0,
    comment = 0;
  let inBlock = false;
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      blank++;
      continue;
    }
    if (inBlock) {
      comment++;
      if (t.includes("*/")) inBlock = false;
      continue;
    }
    if (t.startsWith("/*")) {
      comment++;
      if (!t.includes("*/")) inBlock = true;
      continue;
    }
    if (t.startsWith("//") || t.startsWith("#")) {
      comment++;
      continue;
    }
    code++;
  }
  return { code, blank, comment, total: lines.length, text };
}

function normalizedHash(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("import ") && !l.startsWith("from ") && !l.startsWith("package ") && !l.startsWith("export ") && !/^const .+ = require\(/.test(l));
  return crypto.createHash("sha256").update(lines.join("\n")).digest("hex");
}

function embeddedDataCheck(text, codeLines) {
  if (codeLines < 300) return false;
  const nonBlank = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const withLiteral = nonBlank.filter((l) => /['"`]/.test(l)).length;
  return withLiteral / nonBlank.length >= 0.7;
}

function classifyRepo(repoPath) {
  const files = execSync("git ls-files", { cwd: repoPath, encoding: "utf8" })
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((f) => f.replace(/\\/g, "/"));

  const buckets = {
    excluded: [],
    excluded_gen: [],
    test: [],
    logic: [],
    markup: [],
    vendored: [],
    sql_data: [],
    config_docs: [],
  };

  for (const norm of files) {
    if (
      EXCLUDE_DIRS.test(norm) ||
      EXCLUDE_TOOLING.test(norm) ||
      EXCLUDE_ROOT_SCRIPT.test(norm)
    ) {
      buckets.excluded.push(norm);
      continue;
    }
    if (EXCLUDE_GEN.test(norm) || PY_MIG_GEN.test(norm)) {
      buckets.excluded_gen.push(norm);
      continue;
    }
    if (VENDORED.test(norm)) {
      buckets.vendored.push(norm);
      continue;
    }
    if (SQL_DATA.test(norm)) {
      buckets.sql_data.push(norm);
      continue;
    }
    if (TEST.test(norm)) {
      buckets.test.push(norm);
      continue;
    }
    if (MARKUP.test(norm)) {
      buckets.markup.push(norm);
      continue;
    }
    if (LOGIC.test(norm)) {
      buckets.logic.push(norm);
      continue;
    }
    buckets.config_docs.push(norm);
  }

  function analyze(list, opts = {}) {
    let code = 0,
      blank = 0,
      comment = 0,
      total = 0,
      embedded = 0;
    const byLang = {};
    const fileDetails = [];
    const hashes = new Map();
    for (const f of list) {
      const full = path.join(repoPath, f);
      if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) continue;
      const c = countCodeLines(full);
      const lang = path.extname(f).toLowerCase() || "none";
      const isEmbedded = opts.checkEmbedded && embeddedDataCheck(c.text, c.code);
      if (isEmbedded) embedded += c.code;
      const h = c.code >= 10 ? normalizedHash(c.text) : null;
      if (h) {
        if (!hashes.has(h)) hashes.set(h, []);
        hashes.get(h).push({ f, code: c.code });
      }
      code += c.code;
      blank += c.blank;
      comment += c.comment;
      total += c.total;
      byLang[lang] = (byLang[lang] || 0) + c.code;
      fileDetails.push({ f, code: c.code, lang, embedded: isEmbedded });
    }
    let dup = 0;
    const dupGroups = [];
    for (const [h, arr] of hashes) {
      if (arr.length > 1) {
        arr.sort((a, b) => b.code - a.code);
        const keep = arr[0].code;
        const extra = arr.slice(1).reduce((s, x) => s + x.code, 0);
        dup += extra;
        dupGroups.push({ keep: arr[0].f, copies: arr.slice(1).map((x) => x.f), extra });
      }
    }
    return {
      files: list.length,
      code,
      blank,
      comment,
      total,
      byLang,
      embedded,
      dup,
      dupGroups,
      fileDetails,
    };
  }

  // Raw tracked: all files with code extensions for cloc-like
  const rawLogicMarkup = files.filter(
    (f) =>
      !EXCLUDE_DIRS.test(f) &&
      (LOGIC.test(f) || MARKUP.test(f) || /\.(json|md|yml|yaml|css|html)$/i.test(f))
  );

  return {
    repo: path.basename(repoPath),
    tracked_files: files.length,
    logic: analyze(buckets.logic, { checkEmbedded: true }),
    markup: analyze(buckets.markup),
    test: analyze(buckets.test),
    vendored: analyze(buckets.vendored),
    sql_data: analyze(buckets.sql_data),
    config_docs: analyze(buckets.config_docs),
    excluded_gen: buckets.excluded_gen,
    logic_files: buckets.logic,
    test_files: buckets.test,
    markup_files: buckets.markup,
    mock_data_files: buckets.logic.filter((f) => /mock-data|mock_data|fixtures?/i.test(f)),
  };
}

const fe = classifyRepo("D:/IdeaProjects/we-share/we-share-v2");
const be = classifyRepo("D:/IdeaProjects/we-share/we-share-v2-backend");

function slim(r) {
  return {
    repo: r.repo,
    tracked_files: r.tracked_files,
    logic: {
      files: r.logic.files,
      code: r.logic.code,
      byLang: r.logic.byLang,
      embedded: r.logic.embedded,
      dup: r.logic.dup,
      dupGroups: r.logic.dupGroups,
    },
    markup: { files: r.markup.files, code: r.markup.code, byLang: r.markup.byLang, dup: r.markup.dup },
    test: { files: r.test.files, code: r.test.code, byLang: r.test.byLang },
    vendored: { files: r.vendored.files, code: r.vendored.code },
    sql_data: { files: r.sql_data.files, code: r.sql_data.code },
    config_docs: { files: r.config_docs.files, code: r.config_docs.code },
    excluded_gen: r.excluded_gen,
    mock_data_files: r.mock_data_files,
    embedded_files: r.logic.fileDetails.filter((x) => x.embedded),
    largest_logic: [...r.logic.fileDetails].sort((a, b) => b.code - a.code).slice(0, 20),
    test_files: r.test_files,
    markup_files: r.markup_files,
    migration_logic_files: r.logic_files.filter((f) => /migrations\//.test(f)),
  };
}

const out = { fe: slim(fe), be: slim(be) };
fs.writeFileSync("D:/IdeaProjects/we-share/scripts/loc_report.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
