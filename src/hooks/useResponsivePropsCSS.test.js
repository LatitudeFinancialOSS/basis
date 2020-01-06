import { renderHook } from "@testing-library/react-hooks";
import useResponsivePropsCSS from "./useResponsivePropsCSS";
import {
  getSpaceValue,
  getGridTemplateColumns,
  getGutterPx,
  getGridLines
} from "../utils/css";
import { TestWrapper } from "../utils/test";
import { defaultTheme } from "..";

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
        useResponsivePropsCSS(props, {
          margin: {
            getCSS: value => {
              return {
                margin: getSpaceValue(value)
              };
            }
          },
          padding: {
            getCSS: value => {
              return {
                padding: getSpaceValue(value)
              };
            }
          }
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toEqual({
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
        padding: "0px 40px"
      }
    });
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
        useResponsivePropsCSS(props, {
          cols: {
            getCSS: value => {
              return {
                gridTemplateColumns: getGridTemplateColumns(value)
              };
            }
          },
          colsGutter: {
            getCSS: value => {
              return {
                gridColumnGap: getGutterPx(value)
              };
            }
          },
          rowsGutter: {
            getCSS: value => {
              return {
                gridRowGap: getGutterPx(value)
              };
            }
          }
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toEqual({
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
        gridRowGap: "32px"
      },
      "@media (min-width: 1200px)": {
        gridTemplateColumns: "repeat(240px, 1fr)"
      }
    });
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
        useResponsivePropsCSS(props, {
          colSpan: {
            getCSS: value => {
              const gridLines = getGridLines(value, { allAllowed: true });

              return gridLines
                ? {
                    gridColumn: `${gridLines[0]} / ${gridLines[1]}`
                  }
                : {};
            }
          },
          rowSpan: {
            getCSS: value => {
              const gridLines = getGridLines(value);

              return gridLines
                ? {
                    gridRow: `${gridLines[0]} / ${gridLines[1]}`
                  }
                : {};
            }
          }
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toEqual({
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
  });

  it("Text - header", () => {
    const props = {
      intent: "h4",
      "size-sm": 3,
      "size-lg": "2"
    };
    const { result } = renderHook(
      ({ isHeader, theme, defaultSize }) =>
        useResponsivePropsCSS(props, {
          size: {
            getCSS: value => {
              return isHeader ? theme[`text.size${value}`] : {};
            },
            defaultValue: defaultSize
          }
        }),
      {
        wrapper: TestWrapper,
        initialProps: {
          isHeader: true,
          theme: defaultTheme,
          defaultSize: "4"
        }
      }
    );

    expect(result.current).toEqual({
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "24px",
      fontWeight: 600,
      letterSpacing: "-0.52px",
      lineHeight: "28px",
      "@media (min-width: 576px)": {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "32px",
        fontWeight: 600,
        letterSpacing: "-0.7px",
        lineHeight: "36px"
      },
      "@media (min-width: 992px)": {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "40px",
        fontWeight: 600,
        letterSpacing: "-0.88px",
        lineHeight: "48px"
      }
    });
  });

  it("Text - not header", () => {
    const props = {
      intent: "body2",
      "size-sm": 3,
      "size-lg": "2"
    };
    const { result } = renderHook(
      ({ isHeader, theme, defaultSize }) =>
        useResponsivePropsCSS(props, {
          size: {
            getCSS: value => {
              return isHeader ? theme[`text.size${value}`] : {};
            },
            defaultValue: defaultSize
          }
        }),
      {
        wrapper: TestWrapper,
        initialProps: {
          isHeader: false,
          theme: defaultTheme,
          defaultSize: null
        }
      }
    );

    expect(result.current).toEqual({});
  });
});
