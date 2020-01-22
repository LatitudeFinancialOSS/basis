import { renderHook } from "@testing-library/react-hooks";
import { DEFAULT_PROPS as DEFAULT_CONTAINER_PROPS } from "../components/Container";
import {
  DEFAULT_GRID_PROPS,
  DEFAULT_GRID_ITEM_PROPS
} from "../components/Grid";
import { DEFAULT_PROPS as DEFAULT_TEXT_PROPS } from "../components/Text";
import { DEFAULT_PROPS as DEFAULT_FLEX_PROPS } from "../components/Flex";
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
        useResponsivePropsCSS(props, DEFAULT_CONTAINER_PROPS, {
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
        useResponsivePropsCSS(props, DEFAULT_GRID_PROPS, {
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
        useResponsivePropsCSS(props, DEFAULT_GRID_ITEM_PROPS, {
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

  it("Text - header", () => {
    const props = {
      intent: "h4",
      "size-sm": 3,
      "size-lg": "2"
    };
    const defaultProps = {
      ...DEFAULT_TEXT_PROPS,
      size: "4"
    };
    const { result } = renderHook(
      ({ isHeader, theme }) =>
        useResponsivePropsCSS(props, defaultProps, {
          size: ({ size }) => {
            return isHeader ? theme[`text.size${size}`] : {};
          }
        }),
      {
        wrapper: TestWrapper,
        initialProps: {
          isHeader: true,
          theme: defaultTheme
        }
      }
    );

    expect(result.current).toStrictEqual({
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "24px",
      fontWeight: 600,
      letterSpacing: "-0.52px",
      lineHeight: "28px",
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

  it("Text - not header", () => {
    const props = {
      intent: "body2",
      "size-sm": 3,
      "size-lg": "2"
    };
    const defaultProps = {
      ...DEFAULT_TEXT_PROPS,
      size: null
    };
    const { result } = renderHook(
      ({ isHeader, theme }) =>
        useResponsivePropsCSS(props, defaultProps, {
          size: ({ size }) => {
            return isHeader ? theme[`text.size${size}`] : {};
          }
        }),
      {
        wrapper: TestWrapper,
        initialProps: {
          isHeader: false,
          theme: defaultTheme
        }
      }
    );

    expect(result.current).toStrictEqual({});
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
        useResponsivePropsCSS(props, DEFAULT_FLEX_PROPS, {
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
        useResponsivePropsCSS(props, DEFAULT_FLEX_PROPS, {
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
        useResponsivePropsCSS(props, DEFAULT_FLEX_PROPS, {
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
