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

function Item(props) {
  const { children } = props;
  const theme = useTheme();
  const responsivePropsCSS = useResponsivePropsCSS(props, {
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
  });
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

export const PRESETS = ["page"];

const presetsMap = {
  page: {
    cols: 4,
    "cols-sm": 8,
    "cols-lg": 12,
    colsGutter: "30px"
  }
};

export const DEFAULT_GRID_PROPS = {
  debug: false
};

function Grid(_props) {
  const props = { ...DEFAULT_GRID_PROPS, ..._props };
  const { preset, debug, children } = props;
  const theme = useTheme();
  const [resizeListener, sizes] = useResizeAware();
  const parsedProps = {
    ...presetsMap[preset],
    ...props
  };
  const responsivePropsCSS = useResponsivePropsCSS(parsedProps, {
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
  });
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
    <div css={{ ...theme.grid, ...responsivePropsCSS }} ref={gridRef}>
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
  children: PropTypes.node.isRequired
};

Grid.Item = Item;

export default Grid;
