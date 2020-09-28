import React from "react";
import PropTypes from "prop-types";
import flattenChildren from "react-keyed-flatten-children";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import useResponsiveProp, {
  responsiveMarginType,
  responsiveWidthType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import {
  responsiveMargin,
  responsiveSize,
  getGapValues,
  mergeResponsiveCSS,
} from "../utils/css";
import { mergeProps } from "../utils/component";

const DIRECTIONS = ["vertical", "horizontal"];
const ALIGNMENTS = ["normal", "left", "center", "right"];

const DEFAULT_PROPS = {
  direction: "vertical",
  align: "normal",
  gap: "0",
  flatten: false,
};

Stack.DIRECTIONS = DIRECTIONS;
Stack.ALIGNMENTS = ALIGNMENTS;
Stack.DEFAULT_PROPS = DEFAULT_PROPS;

function Stack(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      direction: (direction) => DIRECTIONS.includes(direction),
      align: (align) => ALIGNMENTS.includes(align),
      flatten: (flatten) => typeof flatten === "boolean",
    }
  );
  const { flatten, children, testId } = mergedProps;
  const maybeFlattenedChildren = flatten
    ? flattenChildren(children)
    : React.Children.toArray(children);
  const direction = useResponsiveProp(mergedProps, "direction");
  const flexWrapperCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    width: responsiveSize("width"),
    gap: ({ gap }, theme) => {
      const gapValues = getGapValues(gap, theme);

      if (gapValues === null) {
        return {};
      }

      const { rowGap } = gapValues;

      return {
        "::before": {
          marginTop: `-${parseInt(rowGap, 10) + 1}px`,
        },
      };
    },
  });
  const flexCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    align: ({ direction, align }) => {
      if (!align) {
        return {};
      }

      return {
        [direction === "horizontal" ? "justifyContent" : "alignItems"]: [
          "normal",
          "center",
        ].includes(align)
          ? align
          : align === "right"
          ? "flex-end"
          : "flex-start",
      };
    },
    gap: ({ gap }, theme) => {
      const gapValues = getGapValues(gap, theme);

      if (gapValues === null) {
        return {};
      }

      const { columnGap } = gapValues;

      return {
        marginLeft: `-${columnGap}`,
      };
    },
  });
  const childCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    gap: ({ gap }, theme) => {
      const gapValues = getGapValues(gap, theme);

      if (gapValues === null) {
        return {};
      }

      const { rowGap, columnGap } = gapValues;

      return {
        marginTop: rowGap,
        marginLeft: columnGap,
      };
    },
  });

  return (
    <div
      css={mergeResponsiveCSS(
        {
          paddingTop: "1px",
          "::before": {
            content: '""',
            display: "block",
          },
        },
        flexWrapperCSS
      )}
      data-testid={testId}
    >
      <div
        css={{
          display: "flex",
          flexDirection: direction === "horizontal" ? null : "column",
          flexWrap: direction === "horizontal" ? "wrap" : null,
          ...flexCSS,
        }}
      >
        {maybeFlattenedChildren
          .filter((child) => child != null)
          .map((child, index) => (
            <div
              css={{
                ":empty": {
                  display: "none",
                },
                ...childCSS,
              }}
              key={index}
            >
              {child}
            </div>
          ))}
      </div>
    </div>
  );
}

Stack.propTypes = {
  ...responsiveMarginType,
  ...responsiveWidthType,
  ...responsivePropType("direction", PropTypes.oneOf(DIRECTIONS)),
  ...responsivePropType("align", PropTypes.oneOf(ALIGNMENTS)),
  ...responsivePropType(
    "gap",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  flatten: PropTypes.bool,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

export default Stack;
