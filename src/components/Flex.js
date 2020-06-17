import React from "react";
import PropTypes from "prop-types";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMarginType,
  responsiveHeightType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import {
  responsiveMargin,
  responsiveSize,
  responsiveFlexDirection,
  responsiveFlexPlaceItems,
} from "../utils/css";

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

  "center",
];

const DEFAULT_PROPS = {
  direction: "row",
  placeItems: "top left",
};

Flex.DIRECTIONS = DIRECTIONS;
Flex.PLACE_ITEMS = PLACE_ITEMS;
Flex.DEFAULT_PROPS = DEFAULT_PROPS;

function Flex(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { children, testId } = props;
  const childrenArray = React.Children.toArray(children);
  const wrapperCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    height: responsiveSize("height"),
  });
  const flexCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    placeItems: responsiveFlexPlaceItems,
    direction: responsiveFlexDirection,
  });

  return (
    <div
      css={{
        display: "flex", // Without it, parent and child margins collapse. See: https://stackoverflow.com/a/19719427/247243
        ...wrapperCSS,
      }}
      data-testid={testId}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          height: "100%",
          ...flexCSS,
        }}
      >
        {childrenArray}
      </div>
    </div>
  );
}

Flex.propTypes = {
  ...responsiveMarginType,
  ...responsiveHeightType,
  ...responsivePropType("direction", PropTypes.oneOf(DIRECTIONS)),
  ...responsivePropType("placeItems", PropTypes.oneOf(PLACE_ITEMS)),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

export default Flex;
