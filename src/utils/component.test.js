import { areOptionsValid } from "./component";

describe("areOptionsValid", () => {
  it("options are invalid", () => {
    const invalidOptions = [
      [],
      [{}],
      [{ label: "label" }],
      [{ value: "value" }],
      [{ label: "label", value: "value" }, { label: "label2" }],
    ];

    invalidOptions.forEach((option) => {
      expect(areOptionsValid(option)).toBe(false);
    });
  });

  it("options are valid", () => {
    const validOptions = [
      [{ label: "label", value: "value" }],
      [
        { label: "label", value: "value" },
        { label: "label2", value: "value2" },
      ],
    ];

    validOptions.forEach((option) => {
      expect(areOptionsValid(option)).toBe(true);
    });
  });
});
