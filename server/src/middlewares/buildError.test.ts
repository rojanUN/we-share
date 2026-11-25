import { conflict } from "@hapi/boom";
import {
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
  ValidationErrorItem,
} from "sequelize";
import { describe, expect, it } from "vitest";
import { HttpStatusEnum } from "../enums";
import buildError from "./buildError";

describe("buildError", () => {
  it("maps joi validation errors", () => {
    const err = {
      isJoi: true,
      details: [{ message: '"email" is required', path: ["email"] }],
    };
    expect(buildError(err)).toEqual({
      success: false,
      code: HttpStatusEnum.BAD_REQUEST,
      message: "BAD REQUEST",
      details: [{ message: '"email" is required', param: "email" }],
    });
  });

  it("maps generic validation error messages", () => {
    const err = new Error("Validation error: name required");
    expect(buildError(err)).toMatchObject({
      success: false,
      code: HttpStatusEnum.BAD_REQUEST,
      message: "BAD REQUEST",
    });
  });

  it("maps boom http errors", () => {
    const err = conflict("already exists");
    expect(buildError(err)).toMatchObject({
      success: false,
      code: 409,
      message: "already exists",
    });
  });

  it("maps firebase auth style errors", () => {
    const firebaseErr: any = new Error("bad token");
    Object.defineProperty(firebaseErr, "constructor", {
      value: { name: "FirebaseAuthError" },
    });
    expect(buildError(firebaseErr)).toEqual({
      success: false,
      code: HttpStatusEnum.UNAUTHORIZED,
      message: "Invalid access token",
    });
  });

  it("maps sequelize unique constraint errors", () => {
    const err = new UniqueConstraintError({});
    expect(buildError(err)).toMatchObject({
      success: false,
      code: HttpStatusEnum.CONFLICT,
      message: "CONFLICT",
    });
  });

  it("maps sequelize foreign key errors", () => {
    const err = new ForeignKeyConstraintError({});
    expect(buildError(err)).toMatchObject({
      success: false,
      code: HttpStatusEnum.CONFLICT,
      message: "CONFLICT",
    });
  });

  it("maps sequelize validation errors", () => {
    const item = new ValidationErrorItem(
      "email must be unique",
      "validation error",
      "email",
      "dup@test.com",
      undefined as any,
      "not_unique" as any,
      "email" as any,
      undefined as any
    );
    // message must not start with "Validation error" or the generic Error branch wins
    const err = new ValidationError("Sequelize validation failed", [item]);
    expect(buildError(err)).toMatchObject({
      success: false,
      code: HttpStatusEnum.BAD_REQUEST,
      message: "BAD REQUEST",
      details: [{ message: "email must be unique", path: "email" }],
    });
  });

  it("falls back to internal server error", () => {
    expect(buildError(new Error("boom"))).toEqual({
      success: false,
      code: HttpStatusEnum.INTERNAL_SERVER_ERROR,
      message: "INTERNAL SERVER ERROR",
    });
  });
});
