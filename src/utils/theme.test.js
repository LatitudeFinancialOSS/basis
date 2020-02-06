import theme from "../themes/default";
import { enhanceTheme } from "./theme";

describe("enhanceTheme", () => {
  it("adds minMediaQueries", () => {
    expect(enhanceTheme(theme)).toHaveProperty("minMediaQueries");
  });

  it("adds exclusiveMediaQueries", () => {
    expect(enhanceTheme(theme)).toHaveProperty("exclusiveMediaQueries");
  });

  it("adds getColor", () => {
    expect(enhanceTheme(theme)).toHaveProperty("getColor");
  });
});
