import { theme } from "./test";
import {
  getMinMediaQueries,
  getExclusiveMediaQueries,
  mergeResponsiveCSS,
  isCSSinOrder,
  responsiveMargin,
  responsivePadding,
  responsiveSize,
  responsiveTextAlign,
} from "./css";

describe("getMinMediaQueries", () => {
  it("5 breakpoints", () => {
    expect(
      getMinMediaQueries({
        xs: "375px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      })
    ).toStrictEqual({
      xs: "@media (min-width: 375px)",
      sm: "@media (min-width: 576px)",
      md: "@media (min-width: 768px)",
      lg: "@media (min-width: 992px)",
      xl: "@media (min-width: 1200px)",
    });
  });
});

describe("getExclusiveMediaQueries", () => {
  it("1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        md: "768px",
      })
    ).toStrictEqual({
      default: "(max-width: 767px)",
      md: "(min-width: 768px)",
    });
  });

  it("> 1 breakpoint", () => {
    expect(
      getExclusiveMediaQueries({
        xs: "375px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      })
    ).toStrictEqual({
      default: "(max-width: 374px)",
      xs: "(min-width: 375px) and (max-width: 575px)",
      sm: "(min-width: 576px) and (max-width: 767px)",
      md: "(min-width: 768px) and (max-width: 991px)",
      lg: "(min-width: 992px) and (max-width: 1199px)",
      xl: "(min-width: 1200px)",
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
            marginRight: "auto",
          },
        },
        {
          padding: "12px",
          margin: "0px",
          "@media (min-width: 576px)": {
            padding: "0px",
          },
          "@media (min-width: 768px)": {
            margin: "32px",
            padding: "16px 48px",
          },
        }
      )
    ).toStrictEqual({
      margin: "0px",
      padding: "12px",
      "@media (min-width: 576px)": {
        maxWidth: "540px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0px",
      },
      "@media (min-width: 768px)": {
        margin: "32px",
        padding: "16px 48px",
      },
    });
  });

  it("sorts the media queries", () => {
    const result = mergeResponsiveCSS(
      {
        "@media (min-width: 1200px)": {
          padding: "16px",
        },
        "@media (min-width: 768px)": {
          flexDirection: "row",
        },
      },
      {
        "@media (min-width: 576px)": {
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "540px",
        },
        "@media (min-width: 768px)": {
          maxWidth: "720px",
        },
        "@media (min-width: 992px)": {
          maxWidth: "960px",
        },
        "@media (min-width: 1200px)": {
          maxWidth: "1140px",
        },
      }
    );

    expect(Object.keys(result)).toStrictEqual([
      "@media (min-width: 576px)",
      "@media (min-width: 768px)",
      "@media (min-width: 992px)",
      "@media (min-width: 1200px)",
    ]);
  });
});

describe("isCSSinOrder", () => {
  it("in order - only default css", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        fontSize: "14px",
        height: "12px",
      })
    ).toBe(true);
  });

  it("in order - only media queries", () => {
    expect(
      isCSSinOrder({
        "@media (min-width: 375px)": {
          height: "24px",
        },
        "@media (min-width: 768px)": {
          fontSize: "21px",
        },
        "@media (min-width: 1200px)": {
          height: "200px",
        },
      })
    ).toBe(true);
  });

  it("in order - default css and media queries", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        height: "12px",
        "@media (min-width: 375px)": {
          height: "24px",
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px",
        },
        "@media (min-width: 768px)": {
          fontSize: "21px",
        },
        "@media (min-width: 992px)": {},
        "@media (min-width: 1200px)": {
          height: "200px",
        },
      })
    ).toBe(true);
  });

  it("not in order - default css after media queries", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        "@media (min-width: 375px)": {
          height: "24px",
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px",
        },
        "@media (min-width: 768px)": {
          fontSize: "21px",
        },
        height: "12px",
        "@media (min-width: 992px)": {},
        "@media (min-width: 1200px)": {
          height: "200px",
        },
      })
    ).toBe(false);
  });

  it("not in order - media queries not in ascending order", () => {
    expect(
      isCSSinOrder({
        width: "100%",
        height: "12px",
        "@media (min-width: 375px)": {
          height: "24px",
        },
        "@media (min-width: 576px)": {
          width: "100px",
          height: "24px",
        },
        "@media (min-width: 992px)": {},
        "@media (min-width: 768px)": {
          fontSize: "21px",
        },
        "@media (min-width: 1200px)": {
          height: "200px",
        },
      })
    ).toBe(false);
  });
});

describe("responsiveMargin", () => {
  it("valid margin", () => {
    expect(responsiveMargin({ margin: "4 -5 1 -8" }, theme)).toStrictEqual({
      margin: "16px -20px 4px -32px",
    });
  });

  it("invalid margin", () => {
    expect(responsiveMargin({ margin: "" }, theme)).toStrictEqual({});
  });
});

describe("responsivePadding", () => {
  it("valid padding", () => {
    expect(responsivePadding({ padding: "1" }, theme)).toStrictEqual({
      padding: "4px",
    });
  });

  it("invalid padding", () => {
    expect(responsivePadding({ padding: true }, theme)).toStrictEqual({});
  });
});

describe("responsiveSize", () => {
  it("valid value", () => {
    expect(responsiveSize("width")({ width: "120" }, theme)).toStrictEqual({
      width: "120px",
    });
    expect(
      responsiveSize("maxWidth")({ maxWidth: "120px" }, theme)
    ).toStrictEqual({
      maxWidth: "120px",
    });
    expect(responsiveSize("height")({ height: "100%" }, theme)).toStrictEqual({
      height: "100%",
    });
    expect(responsiveSize("height")({ height: "auto" }, theme)).toStrictEqual({
      height: "auto",
    });
  });

  it("invalid value", () => {
    expect(responsiveSize("width")({ width: "" }, theme)).toStrictEqual({});
    expect(responsiveSize("maxWidth")({ width: "  " }, theme)).toStrictEqual(
      {}
    );
    expect(responsiveSize("height")({ height: true }, theme)).toStrictEqual({});
  });
});

describe("responsiveTextAlign", () => {
  it("valid textAlign", () => {
    expect(responsiveTextAlign({ textAlign: "inherit" }, theme)).toStrictEqual({
      textAlign: "inherit",
    });
    expect(responsiveTextAlign({ textAlign: "left" }, theme)).toStrictEqual({
      textAlign: "left",
    });
    expect(responsiveTextAlign({ textAlign: "center" }, theme)).toStrictEqual({
      textAlign: "center",
    });
    expect(responsiveTextAlign({ textAlign: "right" }, theme)).toStrictEqual({
      textAlign: "right",
    });
  });

  it("invalid textAlign", () => {
    expect(responsiveTextAlign({ textAlign: "bottom" }, theme)).toStrictEqual(
      {}
    );
  });
});
