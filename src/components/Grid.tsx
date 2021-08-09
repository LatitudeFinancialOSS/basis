import React from "react";
import useTheme from "../hooks/useTheme";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";

import {
  getGridTemplateColumns,
  getGridTemplateRows,
  getGridRowColumn,
  getGapPx,
  responsiveMargin,
  responsiveSize,
} from "../utils/css";
import { ResponsiveProp, SizeValue } from "../types";

const DEFAULT_GRID_ITEM_PROPS = {};

Item.DEFAULT_PROPS = DEFAULT_GRID_ITEM_PROPS;

type ItemProps = {
  children: React.ReactNode;
  testId?: string;
} & ResponsiveProp<"colSpan"> &
  ResponsiveProp<"rowSpan">;

export function Item(props: ItemProps) {
  const { children, testId } = props;
  const responsivePropsCSS = useResponsivePropsCSS(
    props,
    DEFAULT_GRID_ITEM_PROPS,
    {
      colSpan: ({ colSpan }) => {
        const gridColumn = getGridRowColumn(colSpan, { allAllowed: true });

        return gridColumn ? { gridColumn } : {};
      },
      rowSpan: ({ rowSpan }) => {
        const gridRow = getGridRowColumn(rowSpan);

        return gridRow ? { gridRow } : {};
      },
    }
  );

  return (
    <div
      css={{
        /*
          Don't add overflow: hidden here because it will hide the focus style
          of the components that use Grid (e.g. TimeSpan, Frequency).
        */
        minWidth: 0, // This helps the RadioGroup items to shrink on narrow screens
        /*
          This helps in situations where Grid.Item has a vertical scrollbar.
          Without setting `minHeight: 0`, if Grid.Item's height is 1fr, for example,
          the actual height would be greater than what you'd expect (lots of content
          makes it go beyond the desired 1fr).
        */
        minHeight: 0,
        ...responsivePropsCSS,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

const PRESETS = ["page"];

const presetsMap = {
  page: {
    cols: 4,
    "cols-sm": 8,
    "cols-lg": 12,
    colsGap: "30px",
  },
};

const DEFAULT_GRID_PROPS = {} as const;

Grid.PRESETS = PRESETS;
Grid.DEFAULT_PROPS = DEFAULT_GRID_PROPS;

type GridProps = {
  preset?: "page";
  children: React.ReactNode;
  testId?: string;
} & ResponsiveProp<"colsGap"> &
  ResponsiveProp<"rowsGap"> &
  ResponsiveProp<"rows"> &
  ResponsiveProp<"cols"> &
  ResponsiveProp<"height", SizeValue> &
  ResponsiveProp<"margin">;

function Grid(props: GridProps) {
  const { preset, children, testId } = props;
  const theme = useTheme();
  const parsedProps = {
    ...(preset && presetsMap[preset]),
    ...props,
  };
  const responsivePropsCSS = useResponsivePropsCSS(
    parsedProps,
    DEFAULT_GRID_PROPS,
    {
      cols: ({ cols }) => {
        return {
          gridTemplateColumns: getGridTemplateColumns(cols) ?? undefined,
        };
      },
      rows: ({ rows }) => {
        return {
          gridTemplateRows: getGridTemplateRows(rows) ?? undefined,
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
      margin: responsiveMargin,
      height: responsiveSize("height"),
    }
  );

  return (
    <div
      css={{
        display: "grid",
        ...responsivePropsCSS,
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );
}

Grid.Item = Item;

export default Grid;
