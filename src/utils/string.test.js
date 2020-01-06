import { pluralize } from "./string";

describe("pluralize", () => {
  it("count = 1", () => {
    expect(pluralize(1, "day")).toBe("1 day");
  });

  it("count > 1", () => {
    expect(pluralize(5, "day")).toBe("5 days");
  });
});
