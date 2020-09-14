import React from "react";
import PropTypes from "prop-types";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMarginType,
  responsiveWidthType,
  responsiveHeightType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import {
  responsiveMargin,
  responsiveSize,
  responsiveFlexDirection,
  responsiveFlexPlaceItems,
} from "../utils/css";
import { FLEX_DIRECTIONS, FLEX_PLACE_ITEMS } from "../utils/constants";

const DIRECTIONS = FLEX_DIRECTIONS;
const PLACE_ITEMS = FLEX_PLACE_ITEMS;

const DEFAULT_PROPS = {
  direction: "row",
};

Flex.DIRECTIONS = DIRECTIONS;
Flex.PLACE_ITEMS = PLACE_ITEMS;
Flex.DEFAULT_PROPS = DEFAULT_PROPS;

function Flex(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { children, testId } = props;
  const wrapperCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    width: responsiveSize("width"),
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
        {children}
      </div>
    </div>
  );
}

Flex.propTypes = {
  ...responsiveMarginType,
  ...responsiveWidthType,
  ...responsiveHeightType,
  ...responsivePropType("direction", PropTypes.oneOf(DIRECTIONS)),
  ...responsivePropType("placeItems", PropTypes.oneOf(PLACE_ITEMS)),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
};

export default Flex;
