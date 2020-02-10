import { theme } from "./test";
import {
  getMinMediaQueries,
  getExclusiveMediaQueries,
  mergeResponsiveCSS,
  isCSSinOrder,
  responsiveMargin,
  responsivePadding,
  responsiveWidth,
  responsiveHeight,
  responsiveMaxWidth,
  responsiveTextAlign
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

describe("isCSSinOrder", () => {
  it("in order - only default css", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        fontSize: "14px",
        height: "12px"
      })
    ).toBe(true);
  });

  it("in order - only media queries", () => {
    expect(
      isCSSinOrder({
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(true);
  });

  it("in order - default css and media queries", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        height: "12px",
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px"
        },
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        "@media (min-width: 992px)": {},
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(true);
  });

  it("not in order - default css after media queries", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px"
        },
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        height: "12px",
        "@media (min-width: 992px)": {},
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(false);
  });

  it("not in order - media queries not in ascending order", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        height: "12px",
        "@media (min-width: 380px)": {
          height: "24px"
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px"
        },
        "@media (min-width: 992px)": {},
        "@media (min-width: 768px)": {
          fontSize: "21px"
        },
        "@media (min-width: 1200px)": {
          height: "200px"
        }
      })
    ).toBe(false);
  });
});

describe("responsiveMargin", () => {
  it("valid margin", () => {
    expect(responsiveMargin({ margin: "4 -5 1 -8" }, theme)).toStrictEqual({
      margin: "16px -20px 4px -32px"
    });
  });

  it("invalid margin", () => {
    expect(responsiveMargin({ margin: "" }, theme)).toStrictEqual({});
  });
});

describe("responsivePadding", () => {
  it("valid padding", () => {
    expect(responsivePadding({ padding: "1" }, theme)).toStrictEqual({
      padding: "4px"
    });
  });

  it("invalid padding", () => {
    expect(responsivePadding({ padding: true }, theme)).toStrictEqual({});
  });
});

describe("responsiveWidth", () => {
  it("valid width", () => {
    expect(responsiveWidth({ width: "12" }, theme)).toStrictEqual({
      width: "56px"
    });
    expect(responsiveWidth({ width: "auto" }, theme)).toStrictEqual({
      width: "auto"
    });
    expect(responsiveWidth({ width: "100%" }, theme)).toStrictEqual({
      width: "100%"
    });
  });

  it("invalid width", () => {
    expect(responsiveWidth({ width: "" }, theme)).toStrictEqual({});
  });
});

describe("responsiveHeight", () => {
  it("valid height", () => {
    expect(responsiveHeight({ height: "12" }, theme)).toStrictEqual({
      height: "56px"
    });
    expect(responsiveHeight({ height: "auto" }, theme)).toStrictEqual({
      height: "auto"
    });
    expect(responsiveHeight({ height: "100%" }, theme)).toStrictEqual({
      height: "100%"
    });
  });

  it("invalid height", () => {
    expect(responsiveHeight({ height: "" }, theme)).toStrictEqual({});
  });
});

describe("responsiveMaxWidth", () => {
  it("valid maxWidth", () => {
    expect(responsiveMaxWidth({ maxWidth: "120" }, theme)).toStrictEqual({
      maxWidth: "120"
    });
    expect(responsiveMaxWidth({ maxWidth: "120px" }, theme)).toStrictEqual({
      maxWidth: "120px"
    });
    expect(responsiveMaxWidth({ maxWidth: "auto" }, theme)).toStrictEqual({
      maxWidth: "auto"
    });
    expect(responsiveMaxWidth({ maxWidth: "100%" }, theme)).toStrictEqual({
      maxWidth: "100%"
    });
  });

  it("invalid maxWidth", () => {
    expect(responsiveMaxWidth({ maxWidth: true }, theme)).toStrictEqual({});
    expect(responsiveMaxWidth({ maxWidth: "" }, theme)).toStrictEqual({});
  });
});

describe("responsiveTextAlign", () => {
  it("valid textAlign", () => {
    expect(responsiveTextAlign({ textAlign: "inherit" }, theme)).toStrictEqual({
      textAlign: "inherit"
    });
    expect(responsiveTextAlign({ textAlign: "left" }, theme)).toStrictEqual({
      textAlign: "left"
    });
    expect(responsiveTextAlign({ textAlign: "center" }, theme)).toStrictEqual({
      textAlign: "center"
    });
    expect(responsiveTextAlign({ textAlign: "right" }, theme)).toStrictEqual({
      textAlign: "right"
    });
  });

  it("invalid textAlign", () => {
    expect(responsiveTextAlign({ textAlign: "bottom" }, theme)).toStrictEqual(
      {}
    );
  });
});
