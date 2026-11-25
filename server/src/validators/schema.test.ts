import { describe, expect, it } from "vitest";
import {
  emailSchema,
  phoneSchema,
  positiveIntegerSchema,
  stringSchema,
} from "./schema";

describe("schema helpers", () => {
  it("accepts a valid email and lowercases it", () => {
    const { error, value } = emailSchema.validate("User@Example.com");
    expect(error).toBeUndefined();
    expect(value).toBe("user@example.com");
  });

  it("rejects emails with unsupported tlds", () => {
    const { error } = emailSchema.validate("user@example.org");
    expect(error).toBeDefined();
  });

  it("accepts phone numbers with country prefix", () => {
    const { error, value } = phoneSchema.validate("+9779800000000");
    expect(error).toBeUndefined();
    expect(value).toBe("+9779800000000");
  });

  it("rejects short phone numbers", () => {
    const { error } = phoneSchema.validate("123");
    expect(error).toBeDefined();
  });

  it("requires positive integers", () => {
    expect(positiveIntegerSchema.validate(0).error).toBeDefined();
    expect(positiveIntegerSchema.validate(1).error).toBeUndefined();
  });

  it("accepts plain strings", () => {
    expect(stringSchema.validate("hello").error).toBeUndefined();
  });
});
