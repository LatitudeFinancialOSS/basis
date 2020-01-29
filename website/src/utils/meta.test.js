import { pascalCase } from "pascal-case";
import { getAllComponentNames } from "./meta";

describe("getAllComponentNames", () => {
  it("all component names must be PascalCase with optional dots in between", () => {
    const allComponentNames = getAllComponentNames();

    allComponentNames.forEach(componentName => {
      const parts = componentName.split(".");

      parts.forEach(part => {
        expect(pascalCase(part)).toBe(part);
      });
    });
  });
});
