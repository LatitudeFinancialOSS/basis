import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useResizeAware from "react-resize-aware";
import useTheme from "../hooks/useTheme";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsivePropType } from "../hooks/useResponsiveProp";
import { range } from "../utils/array";
import {
  getGridTemplateColumns,
  getGridLines,
  getGutterPx
} from "../utils/css";

const DEFAULT_GRID_ITEM_PROPS = {};

Item.DEFAULT_PROPS = DEFAULT_GRID_ITEM_PROPS;

function Item(props) {
  const { children } = props;
  const theme = useTheme();
  const responsivePropsCSS = useResponsivePropsCSS(
    props,
    DEFAULT_GRID_ITEM_PROPS,
    {
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
    }
  );
  const itemCSS = {
    ...theme.gridItem,
    ...responsivePropsCSS
  };

  return <div css={itemCSS}>{children}</div>;
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
  children: PropTypes.node.isRequired
};

const PRESETS = ["page"];

const presetsMap = {
  page: {
    cols: 4,
    "cols-sm": 8,
    "cols-lg": 12,
    colsGutter: "30px"
  }
};

const DEFAULT_GRID_PROPS = {
  debug: false
};

Grid.PRESETS = PRESETS;
Grid.DEFAULT_PROPS = DEFAULT_GRID_PROPS;

function Grid(_props) {
  const props = { ...DEFAULT_GRID_PROPS, ..._props };
  const { preset, debug, children, testId } = props;
  const theme = useTheme();
  const [resizeListener, sizes] = useResizeAware();
  const parsedProps = {
    ...presetsMap[preset],
    ...props
  };
  const responsivePropsCSS = useResponsivePropsCSS(
    parsedProps,
    DEFAULT_GRID_PROPS,
    {
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
    }
  );
  const gridRef = useRef();
  const [gridInfo, setGridInfo] = useState(null);

  useEffect(() => {
    const gridStyles = getComputedStyle(gridRef.current);
    const gridTemplateColumns = gridStyles.getPropertyValue(
      "grid-template-columns"
    );
    const gridTemplateRows = gridStyles.getPropertyValue("grid-template-rows");

    setGridInfo({
      gridTemplateColumns,
      columnsCount: gridTemplateColumns.split(" ").length,
      gridTemplateRows,
      rowsCount: gridTemplateRows.split(" ").length
    });
  }, [sizes.width, children]);

  return (
    <div
      css={{ ...theme.grid, ...responsivePropsCSS }}
      data-testid={testId}
      ref={gridRef}
    >
      {resizeListener}
      {children}
      {debug && gridInfo && (
        <div
          css={{
            ...theme.gridOverlay,
            gridTemplateColumns: gridInfo.gridTemplateColumns,
            gridTemplateRows: gridInfo.gridTemplateRows
          }}
        >
          {range(gridInfo.columnsCount * gridInfo.rowsCount).map(i => (
            <div css={theme.gridOverlayItem} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

Grid.propTypes = {
  ...responsivePropType("cols", PropTypes.number),
  ...responsivePropType(
    "colsGutter",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType(
    "rowsGutter",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  preset: PropTypes.oneOf(PRESETS),
  debug: PropTypes.bool,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

Grid.Item = Item;

export default Grid;
