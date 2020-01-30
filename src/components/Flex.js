import React from "react";
import PropTypes from "prop-types";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveHeightType,
  responsivePropType
} from "../hooks/useResponsiveProp";
import {
  responsiveHeight,
  responsiveFlexDirection,
  responsiveFlexGutter,
  responsiveFlexPlaceItems
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

  "center"
];

const DEFAULT_PROPS = {
  direction: "row",
  placeItems: "top left"
};

Flex.DIRECTIONS = DIRECTIONS;
Flex.PLACE_ITEMS = PLACE_ITEMS;
Flex.DEFAULT_PROPS = DEFAULT_PROPS;

function Flex(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { children, testId } = props;
  const childrenArray = React.Children.toArray(children);
  const flexCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    height: responsiveHeight,
    placeItems: responsiveFlexPlaceItems,
    direction: responsiveFlexDirection,
    gutter: responsiveFlexGutter
  });

  return (
    <div
      css={{
        display: "flex",
        boxSizing: "border-box",
        ...flexCSS
      }}
      data-testid={testId}
    >
      {childrenArray}
    </div>
  );
}

Flex.propTypes = {
  ...responsivePropType("direction", PropTypes.oneOf(DIRECTIONS)),
  ...responsiveHeightType,
  ...responsivePropType(
    "gutter",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  ...responsivePropType("placeItems", PropTypes.oneOf(PLACE_ITEMS)),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

export default Flex;
