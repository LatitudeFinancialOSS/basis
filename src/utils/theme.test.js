import defaultTheme from "../themes/default";
import { enhanceTheme } from "./theme";

describe("enhanceTheme", () => {
  it("adds minMediaQueries", () => {
    expect(enhanceTheme(defaultTheme)).toHaveProperty("minMediaQueries");
  });

  it("adds exclusiveMediaQueries", () => {
    expect(enhanceTheme(defaultTheme)).toHaveProperty("exclusiveMediaQueries");
  });

  it("adds getColor", () => {
    expect(enhanceTheme(defaultTheme)).toHaveProperty("getColor");
  });
});
