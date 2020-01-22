import { isObjectEmpty, hasOwnProperty } from "./core";

describe("isObjectEmpty", () => {
  it("empty", () => {
    expect(isObjectEmpty({})).toBe(true);
  });

  it("not empty", () => {
    expect(isObjectEmpty({ a: 1 })).toBe(false);
    expect(isObjectEmpty({ b: undefined })).toBe(false);
  });
});

describe("hasOwnProperty", () => {
  it("has property", () => {
    expect(hasOwnProperty({ a: 1, b: undefined }, "b")).toBe(true);
  });

  it("does not have property", () => {
    expect(hasOwnProperty({ a: 1, b: undefined }, "c")).toBe(false);
  });
});
