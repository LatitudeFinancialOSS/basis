import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsivePropType,
  responsiveMarginType,
  responsiveHeightType,
} from "../hooks/useResponsiveProp";
import {
  getGridTemplateColumns,
  getGridTemplateRows,
  getGridRowColumn,
  getGapPx,
  responsiveMargin,
  responsiveSize,
} from "../utils/css";

const DEFAULT_GRID_ITEM_PROPS = {};

Item.DEFAULT_PROPS = DEFAULT_GRID_ITEM_PROPS;

function Item(props) {
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

Item.propTypes = {
  ...responsivePropType(
    "colSpan",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType(
    "rowSpan",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

const PRESETS = ["page"];

const presetsMap = {
  page: {
    cols: 4,
    "cols-sm": 8,
    "cols-lg": 12,
    colsGap: "30px",
  },
};

const DEFAULT_GRID_PROPS = {};

Grid.PRESETS = PRESETS;
Grid.DEFAULT_PROPS = DEFAULT_GRID_PROPS;

function Grid(_props) {
  const props = { ...DEFAULT_GRID_PROPS, ..._props };
  const { preset, children, testId } = props;
  const theme = useTheme();
  const parsedProps = {
    ...presetsMap[preset],
    ...props,
  };
  const responsivePropsCSS = useResponsivePropsCSS(
    parsedProps,
    DEFAULT_GRID_PROPS,
    {
      cols: ({ cols }) => {
        return {
          gridTemplateColumns: getGridTemplateColumns(cols),
        };
      },
      rows: ({ rows }) => {
        return {
          gridTemplateRows: getGridTemplateRows(rows),
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

Grid.propTypes = {
  ...responsivePropType(
    "cols",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType(
    "rows",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType(
    "colsGap",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType(
    "rowsGap",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsiveMarginType,
  ...responsiveHeightType,
  preset: PropTypes.oneOf(PRESETS),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

Grid.Item = Item;

export default Grid;
