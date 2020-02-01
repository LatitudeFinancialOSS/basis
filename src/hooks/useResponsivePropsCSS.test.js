import { renderHook } from "@testing-library/react-hooks";
import Container from "../components/Container";
import Grid from "../components/Grid";
import Flex from "../components/Flex";
import Text from "../components/Text";
import useResponsivePropsCSS, {
  getBreakpointToPropsMap
} from "./useResponsivePropsCSS";
import {
  getGridTemplateColumns,
  getGutterPx,
  getGridLines,
  isCSSinOrder,
  responsiveMargin,
  responsivePadding,
  responsiveTextStyle,
  responsiveFlexDirection,
  responsiveFlexGutter,
  responsiveFlexPlaceItems
} from "../utils/css";
import { TestWrapper } from "../utils/test";
import { defaultTheme } from "..";

describe("getBreakpointToPropsMap", () => {
  it("builds the correct map", () => {
    const props = {
      direction: "row",
      "direction-sm": "column",
      "gutter-lg": 6,
      placeItems: "center",
      "placeItems-md": "bottom right",
      width: 4,
      "foo-xll": true
    };
    const defaultProps = {
      gutter: 2
    };

    expect(
      getBreakpointToPropsMap(defaultTheme, props, defaultProps)
    ).toStrictEqual({
      default: {
        direction: "row",
        gutter: 2,
        placeItems: "center",
        width: 4,
        "foo-xll": true
      },
      xs: {
        direction: "row",
        gutter: 2,
        placeItems: "center",
        width: 4,
        "foo-xll": true
      },
      sm: {
        direction: "column",
        gutter: 2,
        placeItems: "center",
        width: 4,
        "foo-xll": true
      },
      md: {
        direction: "column",
        gutter: 2,
        placeItems: "bottom right",
        width: 4,
        "foo-xll": true
      },
      lg: {
        direction: "column",
        gutter: 6,
        placeItems: "bottom right",
        width: 4,
        "foo-xll": true
      },
      xl: {
        direction: "column",
        gutter: 6,
        placeItems: "bottom right",
        width: 4,
        "foo-xll": true
      }
    });
  });
});

describe("useResponsivePropsCSS", () => {
  it("Container", () => {
    const props = {
      margin: "1 2 3 4",
      "margin-xs": "auto 4 6 auto",
      "margin-sm": "4 6",
      "margin-lg": "2 3 100",
      padding: "4",
      "padding-xs": 5,
      "padding-sm": "6",
      "padding-xl": "0 8",
      anotherProp: "some value"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Container.DEFAULT_PROPS, {
          margin: responsiveMargin,
          padding: responsivePadding
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      margin: "4px 8px 12px 16px",
      padding: "16px",
      "@media (min-width: 380px)": {
        margin: "auto 16px 24px auto",
        padding: "20px"
      },
      "@media (min-width: 576px)": {
        margin: "16px 24px",
        padding: "24px"
      },
      "@media (min-width: 992px)": {
        margin: "8px 12px 0px"
      },
      "@media (min-width: 1200px)": {
        padding: "0px 32px"
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Grid", () => {
    const props = {
      cols: 3,
      "cols-xs": "2",
      "cols-md": "40px",
      "cols-xl": "repeat(240px, 1fr)",
      colsGutter: 5,
      "colsGutter-lg": "30px",
      rowsGutter: "0",
      "rowsGutter-lg": "7"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Grid.DEFAULT_PROPS, {
          cols: ({ cols }) => {
            return {
              gridTemplateColumns: getGridTemplateColumns(cols)
            };
          },
          colsGutter: ({ colsGutter }) => {
            return {
              gridColumnGap: getGutterPx(colsGutter)
            };
          },
          rowsGutter: ({ rowsGutter }) => {
            return {
              gridRowGap: getGutterPx(rowsGutter)
            };
          }
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      gridTemplateColumns: "repeat(3, 1fr)",
      gridColumnGap: "20px",
      gridRowGap: "0px",
      "@media (min-width: 380px)": {
        gridTemplateColumns: "repeat(2, 1fr)"
      },
      "@media (min-width: 768px)": {
        gridTemplateColumns: "40px"
      },
      "@media (min-width: 992px)": {
        gridColumnGap: "30px",
        gridRowGap: "28px"
      },
      "@media (min-width: 1200px)": {
        gridTemplateColumns: "repeat(240px, 1fr)"
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Grid.Item", () => {
    const props = {
      colSpan: "all",
      "colSpan-sm": 8,
      "colSpan-md": "4",
      "colSpan-lg": "0-2",
      "colSpan-xl": "foo",
      rowSpan: true,
      "rowSpan-xs": "1-2-3",
      "rowSpan-lg": "2-3"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Grid.Item.DEFAULT_PROPS, {
          colSpan: ({ colSpan }) => {
            const gridLines = getGridLines(colSpan, { allAllowed: true });

            return gridLines
              ? {
                  gridColumn: `${gridLines[0]} / ${gridLines[1]}`
                }
              : {};
          },
          rowSpan: ({ rowSpan }) => {
            const gridLines = getGridLines(rowSpan);

            return gridLines
              ? {
                  gridRow: `${gridLines[0]} / ${gridLines[1]}`
                }
              : {};
          }
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      gridColumn: "1 / -1",
      "@media (min-width: 576px)": {
        gridColumn: "9 / 10"
      },
      "@media (min-width: 768px)": {
        gridColumn: "5 / 6"
      },
      "@media (min-width: 992px)": {
        gridColumn: "1 / 4",
        gridRow: "3 / 5"
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Text - heading", () => {
    const props = {
      as: "h4",
      textStyle: "heading4",
      "textStyle-sm": "heading3",
      "textStyle-lg": "heading2",
      margin: "5"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Text.DEFAULT_PROPS, {
          margin: responsiveMargin,
          textStyle: responsiveTextStyle
        }),
      {
        wrapper: TestWrapper
      }
    );

    expect(result.current).toStrictEqual({
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "24px",
      fontWeight: 600,
      letterSpacing: "-0.52px",
      lineHeight: "28px",
      margin: "20px",
      "& b": {
        fontWeight: 600
      },
      "& strong": {
        fontWeight: 600
      },
      "@media (min-width: 576px)": {
        fontSize: "32px",
        letterSpacing: "-0.7px",
        lineHeight: "36px"
      },
      "@media (min-width: 992px)": {
        fontSize: "40px",
        letterSpacing: "-0.88px",
        lineHeight: "48px"
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Text - paragraph", () => {
    const props = {
      textStyle: "body2"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Text.DEFAULT_PROPS, {
          margin: responsiveMargin,
          textStyle: responsiveTextStyle
        }),
      {
        wrapper: TestWrapper
      }
    );

    expect(result.current).toStrictEqual({
      fontFamily: "'Roboto', sans-serif",
      fontSize: "14px",
      fontWeight: 300,
      letterSpacing: "0px",
      lineHeight: "20px",
      "& b": {
        fontWeight: 500
      },
      "& strong": {
        fontWeight: 500
      }
    });
  });

  it("Flex - direction", () => {
    const props = {
      height: "15",
      "direction-md": "column",
      "direction-large": "row",
      "direction-xl": "row"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Flex.DEFAULT_PROPS, {
          gutter: responsiveFlexDirection
        }),
      {
        wrapper: TestWrapper
      }
    );

    expect(result.current).toStrictEqual({
      flexDirection: "row",
      "@media (min-width: 768px)": {
        flexDirection: "column"
      },
      "@media (min-width: 1200px)": {
        flexDirection: "row"
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Flex - gutter with direction change", () => {
    const props = {
      height: "100%",
      direction: "column",
      "direction-sm": "row",
      gutter: "6",
      placeItems: "top center"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Flex.DEFAULT_PROPS, {
          gutter: responsiveFlexGutter
        }),
      {
        wrapper: TestWrapper
      }
    );

    expect(result.current).toStrictEqual({
      ":not(:first-of-type)": {
        marginTop: "24px",
        marginLeft: "0px"
      },
      "@media (min-width: 576px)": {
        ":not(:first-of-type)": {
          marginTop: "0px",
          marginLeft: "24px"
        }
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Flex - placeItems with direction change", () => {
    const props = {
      "direction-md": "column",
      "direction-lg": "row",
      "direction-xl": "column",
      "placeItems-xs": "bottom left",
      "placeItems-sm": "center right",
      "placeItems-xl": "center"
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Flex.DEFAULT_PROPS, {
          placeItems: responsiveFlexPlaceItems
        }),
      {
        wrapper: TestWrapper
      }
    );

    expect(result.current).toStrictEqual({
      alignItems: "flex-start",
      justifyContent: "flex-start",
      "@media (min-width: 380px)": {
        alignItems: "flex-end"
      },
      "@media (min-width: 576px)": {
        alignItems: "center",
        justifyContent: "flex-end"
      },
      "@media (min-width: 768px)": {
        alignItems: "flex-end",
        justifyContent: "center"
      },
      "@media (min-width: 992px)": {
        alignItems: "center",
        justifyContent: "flex-end"
      },
      "@media (min-width: 1200px)": {
        justifyContent: "center"
      }
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });
});
