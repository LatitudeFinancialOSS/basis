import React from "react";
import PropTypes from "prop-types";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMarginType,
  responsivePropType
} from "../hooks/useResponsiveProp";
import {
  responsiveMargin,
  responsiveFlexDirection,
  responsiveFlexGap,
  responsiveFlexPlaceItems
} from "../utils/css";
import { isObjectEmpty } from "../utils/core";

const DIRECTIONS = ["row", "column"];
const PLACE_ITEMS = [
  "top left",
  "top center",
  "top right",
  "center left",
  "center center",
  "center right",
  "bottom left",
  "bottom center",
  "bottom right",

  "left top",
  "center top",
  "right top",
  "left center",
  "right center",
  "left bottom",
  "center bottom",
  "right bottom",

  "center"
];

const DEFAULT_PROPS = {
  direction: "row",
  fullHeight: false,
  wrap: false,
  placeItems: "top left"
};

Flex.DIRECTIONS = DIRECTIONS;
Flex.PLACE_ITEMS = PLACE_ITEMS;
Flex.DEFAULT_PROPS = DEFAULT_PROPS;

function Flex(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { fullHeight, wrap, children, testId } = props;
  const childrenArray = React.Children.toArray(children);
  const wrapperCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin
  });
  const flexCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    gap: responsiveFlexGap("items-container"),
    placeItems: responsiveFlexPlaceItems,
    direction: responsiveFlexDirection
  });
  const flexItemCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    gap: responsiveFlexGap("item")
  });

  return (
    <div
      css={{
        display: "flex", // Without it, parent and child margins collapse. See: https://stackoverflow.com/a/19719427/247243
        ...(fullHeight === true ? { height: "100%" } : {}),
        ...wrapperCSS
      }}
      data-testid={testId}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexWrap: wrap === true ? "wrap" : "nowrap",
          ...flexCSS
        }}
      >
        {isObjectEmpty(flexItemCSS)
          ? childrenArray
          : childrenArray.map((child, index) => (
              <div css={flexItemCSS} key={index}>
                {child}
              </div>
            ))}
      </div>
    </div>
  );
}

Flex.propTypes = {
  ...responsiveMarginType,
  ...responsivePropType("direction", PropTypes.oneOf(DIRECTIONS)),
  ...responsivePropType(
    "gap",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  fullHeight: PropTypes.bool,
  wrap: PropTypes.bool,
  ...responsivePropType("placeItems", PropTypes.oneOf(PLACE_ITEMS)),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

export default Flex;
