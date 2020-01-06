import {
  getMinMediaQueries,
  getExclusiveMediaQueries,
  mergeResponsiveCSS
} from "./css";

describe("getMinMediaQueries", () => {
  it("no breakpoints", () => {
    expect(getMinMediaQueries(undefined)).toEqual({});
    expect(getMinMediaQueries({})).toEqual({});
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
    ).toEqual({
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
    expect(getExclusiveMediaQueries(undefined)).toEqual({});
    expect(getExclusiveMediaQueries({})).toEqual({});
  });

  it("1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        md: "768px"
      })
    ).toEqual({
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
    ).toEqual({
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
    ).toEqual({
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
