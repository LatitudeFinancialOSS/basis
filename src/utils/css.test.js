import {
  getMinMediaQueries,
  getExclusiveMediaQueries,
  mergeResponsiveCSS,
  responsiveMargin,
  responsivePadding,
  responsiveHeight
} from "./css";

describe("getMinMediaQueries", () => {
  it("no breakpoints", () => {
    expect(getMinMediaQueries(undefined)).toStrictEqual({});
    expect(getMinMediaQueries({})).toStrictEqual({});
  });

  it("5 breakpoints", () => {
    expect(
      getMinMediaQueries({
        xs: "380px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px"
      })
    ).toStrictEqual({
      xs: "@media (min-width: 380px)",
      sm: "@media (min-width: 576px)",
      md: "@media (min-width: 768px)",
      lg: "@media (min-width: 992px)",
      xl: "@media (min-width: 1200px)"
    });
  });
});

describe("getExclusiveMediaQueries", () => {
  it("0 breakpoints", () => {
    expect(getExclusiveMediaQueries(undefined)).toStrictEqual({});
    expect(getExclusiveMediaQueries({})).toStrictEqual({});
  });

  it("1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        md: "768px"
      })
    ).toStrictEqual({
      default: "(max-width: 767px)",
      md: "(min-width: 768px)"
    });
  });

  it("> 1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        xs: "380px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px"
      })
    ).toStrictEqual({
      default: "(max-width: 379px)",
      xs: "(min-width: 380px) and (max-width: 575px)",
      sm: "(min-width: 576px) and (max-width: 767px)",
      md: "(min-width: 768px) and (max-width: 991px)",
      lg: "(min-width: 992px) and (max-width: 1199px)",
      xl: "(min-width: 1200px)"
    });
  });
});

describe("mergeResponsiveCSS", () => {
  it("merges media queries", () => {
    expect(
      mergeResponsiveCSS(
        {
          margin: "4px",
          "@media (min-width: 576px)": {
            maxWidth: "540px",
            marginLeft: "auto",
            marginRight: "auto"
          }
        },
        {
          padding: "12px",
          margin: "0px",
          "@media (min-width: 576px)": {
            padding: "0px"
          },
          "@media (min-width: 768px)": {
            margin: "32px",
            padding: "16px 48px"
          }
        }
      )
    ).toStrictEqual({
      margin: "0px",
      padding: "12px",
      "@media (min-width: 576px)": {
        maxWidth: "540px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0px"
      },
      "@media (min-width: 768px)": {
        margin: "32px",
        padding: "16px 48px"
      }
    });
  });
});

describe("responsiveMargin", () => {
  it("valid margin", () => {
    expect(responsiveMargin.getCSS("4 -5 1 -8")).toStrictEqual({
      margin: "16px -20px 4px -32px"
    });
  });

  it("invalid margin", () => {
    expect(responsiveMargin.getCSS("")).toStrictEqual({});
  });
});

describe("responsivePadding", () => {
  it("valid padding", () => {
    expect(responsivePadding.getCSS("1")).toStrictEqual({ padding: "4px" });
  });

  it("invalid padding", () => {
    expect(responsivePadding.getCSS(true)).toStrictEqual({});
  });
});

describe("responsiveHeight", () => {
  it("valid height", () => {
    expect(responsiveHeight.getCSS("12")).toStrictEqual({ height: "56px" });
    expect(responsiveHeight.getCSS("auto")).toStrictEqual({ height: "auto" });
    expect(responsiveHeight.getCSS("100%")).toStrictEqual({ height: "100%" });
  });

  it("invalid height", () => {
    expect(responsiveHeight.getCSS("")).toStrictEqual({});
  });
});
