import { pluralize, notStringOrEmpty } from "./string";

describe("pluralize", () => {
  it("count = 1", () => {
    expect(pluralize(1, "day")).toBe("1 day");
  });

  it("count > 1", () => {
    expect(pluralize(5, "day")).toBe("5 days");
  });
});

describe("notStringOrEmpty", () => {
  it("returns true", () => {
    expect(notStringOrEmpty(123)).toBe(true);
    expect(notStringOrEmpty("")).toBe(true);
    expect(notStringOrEmpty("   ")).toBe(true);
  });

  it("returns false", () => {
    expect(notStringOrEmpty("valid")).toBe(false);
  });
});
