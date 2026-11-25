import { describe, expect, it } from "vitest";
import {
  inputGetSubmissionDetailsSchema,
  inputSubmitProblemSchema,
} from "./submissionValidation";

describe("submissionValidation", () => {
  it("requires language, code, and slug for submit", () => {
    const { error } = inputSubmitProblemSchema.validate({});
    expect(error).toBeDefined();
  });

  it("accepts a complete submit payload", () => {
    const { error, value } = inputSubmitProblemSchema.validate({
      language: "javascript",
      code: "console.log(1)",
      slug: "two-sum",
    });
    expect(error).toBeUndefined();
    expect(value.slug).toBe("two-sum");
  });

  it("requires a numeric submissionId", () => {
    expect(inputGetSubmissionDetailsSchema.validate({}).error).toBeDefined();
    expect(
      inputGetSubmissionDetailsSchema.validate({ submissionId: "abc" }).error
    ).toBeDefined();
    expect(
      inputGetSubmissionDetailsSchema.validate({ submissionId: 42 }).error
    ).toBeUndefined();
  });
});
