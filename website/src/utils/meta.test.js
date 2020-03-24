import { pascalCase } from "pascal-case";
import { allComponentNames } from "./meta";

describe("allComponentNames", () => {
  it("all component names must be PascalCase with optional dots in between", () => {
    allComponentNames.forEach((componentName) => {
      const parts = componentName.split(".");

      parts.forEach((part) => {
        expect(pascalCase(part)).toBe(part);
      });
    });
  });
});
