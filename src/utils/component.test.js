import {
  areOptionsValid,
  getResponsivePropMap,
  mergeResponsivePropMaps,
} from "./component";
import { theme } from "./test";

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

describe("getResponsivePropMap", () => {
  it("prop not specified, default doesn't exist", () => {
    expect(
      getResponsivePropMap({ width: 100, height: 200 }, {}, "bg", theme)
    ).toStrictEqual({
      default: undefined,
      xs: undefined,
      sm: undefined,
      md: undefined,
      lg: undefined,
      xl: undefined,
    });
  });

  it("prop not specified, default exists", () => {
    expect(
      getResponsivePropMap(
        { width: 100, height: 200 },
        { bg: "transparent" },
        "bg",
        theme
      )
    ).toStrictEqual({
      default: "transparent",
      xs: "transparent",
      sm: "transparent",
      md: "transparent",
      lg: "transparent",
      xl: "transparent",
    });
  });

  it("prop specified", () => {
    expect(
      getResponsivePropMap(
        { width: 100, height: 200, bg: "grey.t03" },
        { bg: "transparent" },
        "bg",
        theme
      )
    ).toStrictEqual({
      default: "grey.t03",
      xs: "grey.t03",
      sm: "grey.t03",
      md: "grey.t03",
      lg: "grey.t03",
      xl: "grey.t03",
    });
  });

  it("responsive prop specified, default doesn't exist", () => {
    expect(
      getResponsivePropMap(
        { width: 100, height: 200, "bg-sm": "grey.t03" },
        {},
        "bg",
        theme
      )
    ).toStrictEqual({
      default: undefined,
      xs: undefined,
      sm: "grey.t03",
      md: "grey.t03",
      lg: "grey.t03",
      xl: "grey.t03",
    });
  });

  it("responsive prop specified, default exists", () => {
    expect(
      getResponsivePropMap(
        { width: 100, height: 200, "bg-sm": "grey.t03" },
        { bg: "transparent" },
        "bg",
        theme
      )
    ).toStrictEqual({
      default: "transparent",
      xs: "transparent",
      sm: "grey.t03",
      md: "grey.t03",
      lg: "grey.t03",
      xl: "grey.t03",
    });
  });

  it("multiple responsive props specified", () => {
    expect(
      getResponsivePropMap(
        {
          width: 100,
          height: 200,
          "bg-xs": "grey.t03",
          "bg-md": "white",
          "bg-xl": "primary.blue.t100",
        },
        { bg: "transparent" },
        "bg",
        theme
      )
    ).toStrictEqual({
      default: "transparent",
      xs: "grey.t03",
      sm: "grey.t03",
      md: "white",
      lg: "white",
      xl: "primary.blue.t100",
    });
  });
});

describe("mergeResponsivePropMaps", () => {
  it("parent map doesn't exist", () => {
    expect(
      mergeResponsivePropMaps(
        undefined,
        {
          default: "transparent",
          xs: "grey.t03",
          sm: "grey.t03",
          md: "white",
          lg: "white",
          xl: "primary.blue.t100",
        },
        theme
      )
    ).toStrictEqual({
      default: "transparent",
      xs: "grey.t03",
      sm: "grey.t03",
      md: "white",
      lg: "white",
      xl: "primary.blue.t100",
    });
  });

  it("parent map exists", () => {
    expect(
      mergeResponsivePropMaps(
        {
          default: undefined,
          xs: undefined,
          sm: "grey.t05",
          md: "white",
          lg: "transparent",
          xl: "transparent",
        },
        {
          default: "transparent",
          xs: "grey.t03",
          sm: "grey.t07",
          md: "transparent",
          lg: "white",
          xl: "transparent",
        },
        theme
      )
    ).toStrictEqual({
      default: undefined,
      xs: "grey.t03",
      sm: "grey.t07",
      md: "white",
      lg: "white",
      xl: "transparent",
    });
  });
});
