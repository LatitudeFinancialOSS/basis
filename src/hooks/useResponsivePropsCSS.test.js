import { renderHook } from "@testing-library/react-hooks";
import Container from "../components/Container";
import Grid from "../components/Grid";
import Flex from "../components/Flex";
import Text from "../components/Text";
import useResponsivePropsCSS, {
  getBreakpointToPropsMap,
} from "./useResponsivePropsCSS";
import {
  getGridTemplateColumns,
  getGapPx,
  getGridRowColumn,
  isCSSinOrder,
  responsiveMargin,
  responsivePadding,
  responsiveTextStyle,
  responsiveFlexDirection,
  responsiveFlexPlaceItems,
} from "../utils/css";
import { TestWrapper } from "../utils/test";
import { defaultTheme as theme } from "..";

describe("getBreakpointToPropsMap", () => {
  it("builds the correct map", () => {
    const props = {
      direction: "row",
      "direction-sm": "column",
      "gap-lg": 6,
      placeItems: "center",
      "placeItems-md": "bottom right",
      width: "40",
      "foo-xll": true,
    };
    const defaultProps = {
      gap: 2,
    };

    expect(getBreakpointToPropsMap(theme, props, defaultProps)).toStrictEqual({
      default: {
        direction: "row",
        gap: 2,
        placeItems: "center",
        width: "40",
        "foo-xll": true,
      },
      xs: {
        direction: "row",
        gap: 2,
        placeItems: "center",
        width: "40",
        "foo-xll": true,
      },
      sm: {
        direction: "column",
        gap: 2,
        placeItems: "center",
        width: "40",
        "foo-xll": true,
      },
      md: {
        direction: "column",
        gap: 2,
        placeItems: "bottom right",
        width: "40",
        "foo-xll": true,
      },
      lg: {
        direction: "column",
        gap: 6,
        placeItems: "bottom right",
        width: "40",
        "foo-xll": true,
      },
      xl: {
        direction: "column",
        gap: 6,
        placeItems: "bottom right",
        width: "40",
        "foo-xll": true,
      },
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
      anotherProp: "some value",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Container.DEFAULT_PROPS, {
          margin: responsiveMargin,
          padding: responsivePadding,
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      margin: "4px 8px 12px 16px",
      padding: "16px",
      "@media (min-width: 375px)": {
        margin: "auto 16px 24px auto",
        padding: "20px",
      },
      "@media (min-width: 576px)": {
        margin: "16px 24px",
        padding: "24px",
      },
      "@media (min-width: 992px)": {
        margin: "8px 12px 0px",
      },
      "@media (min-width: 1200px)": {
        padding: "0px 32px",
      },
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Grid", () => {
    const props = {
      cols: 3,
      "cols-xs": "2",
      "cols-md": "40px",
      "cols-xl": "repeat(240px, 1fr)",
      colsGap: 5,
      "colsGap-lg": "30px",
      rowsGap: "0",
      "rowsGap-lg": "7",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Grid.DEFAULT_PROPS, {
          cols: ({ cols }) => {
            return {
              gridTemplateColumns: getGridTemplateColumns(cols),
            };
          },
          colsGap: ({ colsGap }) => {
            return {
              gridColumnGap: getGapPx(colsGap, theme),
            };
          },
          rowsGap: ({ rowsGap }) => {
            return {
              gridRowGap: getGapPx(rowsGap, theme),
            };
          },
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      gridTemplateColumns: "repeat(3, 1fr)",
      gridColumnGap: "20px",
      gridRowGap: "0px",
      "@media (min-width: 375px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      "@media (min-width: 768px)": {
        gridTemplateColumns: "40px",
      },
      "@media (min-width: 992px)": {
        gridColumnGap: "30px",
        gridRowGap: "28px",
      },
      "@media (min-width: 1200px)": {
        gridTemplateColumns: "repeat(240px, 1fr)",
      },
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Grid.Item", () => {
    const props = {
      colSpan: "all",
      "colSpan-xs": "auto / span 4",
      "colSpan-sm": 8,
      "colSpan-md": "4",
      "colSpan-lg": "0-2",
      rowSpan: true,
      "rowSpan-xs": "span 2 / 7",
      "rowSpan-lg": "2-3",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Grid.Item.DEFAULT_PROPS, {
          colSpan: ({ colSpan }) => {
            const gridColumn = getGridRowColumn(colSpan, { allAllowed: true });

            return gridColumn ? { gridColumn } : {};
          },
          rowSpan: ({ rowSpan }) => {
            const gridRow = getGridRowColumn(rowSpan);

            return gridRow ? { gridRow } : {};
          },
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      gridColumn: "1 / -1",
      "@media (min-width: 375px)": {
        gridColumn: "auto / span 4",
        gridRow: "span 2 / 7",
      },
      "@media (min-width: 576px)": {
        gridColumn: "9 / 10",
      },
      "@media (min-width: 768px)": {
        gridColumn: "5 / 6",
      },
      "@media (min-width: 992px)": {
        gridColumn: "1 / 4",
        gridRow: "3 / 5",
      },
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Text - heading", () => {
    const props = {
      as: "h4",
      textStyle: "heading4",
      "textStyle-sm": "heading3",
      "textStyle-lg": "heading2",
      margin: "5",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Text.DEFAULT_PROPS, {
          margin: responsiveMargin,
          textStyle: responsiveTextStyle,
        }),
      {
        wrapper: TestWrapper,
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
        fontWeight: 600,
      },
      "& strong": {
        fontWeight: 600,
      },
      "@media (min-width: 576px)": {
        fontSize: "32px",
        letterSpacing: "-0.7px",
        lineHeight: "36px",
      },
      "@media (min-width: 992px)": {
        fontSize: "40px",
        letterSpacing: "-0.88px",
        lineHeight: "48px",
      },
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });

  it("Text - paragraph", () => {
    const props = {
      textStyle: "body2",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Text.DEFAULT_PROPS, {
          margin: responsiveMargin,
          textStyle: responsiveTextStyle,
        }),
      {
        wrapper: TestWrapper,
      }
    );

    expect(result.current).toStrictEqual({
      fontFamily: "'Roboto', sans-serif",
      fontSize: "14px",
      fontWeight: 300,
      letterSpacing: "0px",
      lineHeight: "20px",
      "& b": {
        fontWeight: 500,
      },
      "& strong": {
        fontWeight: 500,
      },
    });
  });

  it("Flex - direction", () => {
    const props = {
      height: "80px",
      "direction-md": "column",
      "direction-large": "row",
      "direction-xl": "row",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Flex.DEFAULT_PROPS, {
          gap: responsiveFlexDirection,
        }),
      {
        wrapper: TestWrapper,
      }
    );

    expect(result.current).toStrictEqual({
      flexDirection: "row",
      "@media (min-width: 768px)": {
        flexDirection: "column",
      },
      "@media (min-width: 1200px)": {
        flexDirection: "row",
      },
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
      "placeItems-xl": "center",
    };
    const { result } = renderHook(
      () =>
        useResponsivePropsCSS(props, Flex.DEFAULT_PROPS, {
          placeItems: responsiveFlexPlaceItems,
        }),
      {
        wrapper: TestWrapper,
      }
    );

    expect(result.current).toStrictEqual({
      "@media (min-width: 375px)": {
        alignItems: "flex-end",
        justifyContent: "flex-start",
      },
      "@media (min-width: 576px)": {
        alignItems: "center",
        justifyContent: "flex-end",
      },
      "@media (min-width: 768px)": {
        alignItems: "flex-end",
        justifyContent: "center",
      },
      "@media (min-width: 992px)": {
        alignItems: "center",
        justifyContent: "flex-end",
      },
      "@media (min-width: 1200px)": {
        justifyContent: "center",
      },
    });
    expect(isCSSinOrder(result.current)).toBe(true);
  });
});
