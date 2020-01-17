import { colorContrast } from "./color";

describe("colorContrast", () => {
  it("calculates the contrast", () => {
    expect(colorContrast("#123456", "#123456")).toBe(1);
    expect(colorContrast("#e7aa90", "#193ccb")).toBeCloseTo(4.137350318176988);
    expect(colorContrast("#000000", "#ffffff")).toBe(21);
    expect(colorContrast("#ffffff", "#000000")).toBe(21);
  });
});
