import { describe, expect, it } from "vitest";
import { filterDataSchema, problemSetKeysSchema } from "./problemValidation";

describe("problemValidation", () => {
  it("allows empty optional filter fields", () => {
    const { error, value } = filterDataSchema.validate({
      searchKeywords: "",
      difficulty: "",
      tags: [],
    });
    expect(error).toBeUndefined();
    expect(value.tags).toEqual([]);
  });

  it("rejects non-string tags", () => {
    const { error } = filterDataSchema.validate({ tags: [1, 2] });
    expect(error).toBeDefined();
  });

  it("accepts a problem set query with pagination", () => {
    const { error, value } = problemSetKeysSchema.validate({
      categorySlug: "algorithms",
      limit: 10,
      skip: 0,
      filters: { difficulty: "Easy" },
    });
    expect(error).toBeUndefined();
    expect(value.limit).toBe(10);
  });

  it("rejects negative skip", () => {
    const { error } = problemSetKeysSchema.validate({ skip: -1 });
    expect(error).toBeDefined();
  });

  it("rejects zero limit", () => {
    const { error } = problemSetKeysSchema.validate({ limit: 0 });
    expect(error).toBeDefined();
  });
});
