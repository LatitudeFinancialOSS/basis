import React from "react";
import PropTypes from "prop-types";
import useBackground from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMarginType,
  responsiveWidthType,
} from "../hooks/useResponsiveProp";
import { hasOwnProperty } from "../utils/core";
import { responsiveMargin, responsiveSize } from "../utils/css";
import { mergeProps } from "../utils/component";
import { formatArray } from "../utils/array";

const VARIANTS = ["primary", "secondary", "icon"];
const COLORS = ["highlight.blue.t100", "white", "black", "green"];
const TYPES = ["button", "submit"];

const DEFAULT_PROPS = {
  variant: "primary",
  color: "highlight.blue.t100",
  disabled: false,
  type: "button",
  __internal__keyboardFocus: false,
  __internal__hover: false,
  __internal__active: false,
};

Button.VARIANTS = VARIANTS;
Button.COLORS = COLORS;
Button.TYPES = TYPES;
Button.DEFAULT_PROPS = DEFAULT_PROPS;

const darkColorsMap = {
  "primary.blue.t100": true,
  "highlight.blue.t100": true,
  "highlight.pink.t100": true,
  "highlight.purple.t100": true,
};
const mediumColorsMap = {
  "grey.t07": true,
  "grey.t10": true,
  "grey.t16": true,
  "secondary.lightBlue.t25": true,
  "secondary.lightBlue.t15": true,
  "secondary.pink.t30": true,
  "secondary.pink.t15": true,
  "secondary.purple.t30": true,
  "secondary.purple.t15": true,
  "secondary.turquoise.t30": true,
  "secondary.turquoise.t10": true,
};

function getInheritedColor(backgroundColor) {
  return darkColorsMap[backgroundColor]
    ? "white"
    : mediumColorsMap[backgroundColor]
    ? "black"
    : "highlight.blue.t100";
}

function Button(props) {
  const { bgMap } = useBackground();
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      variant: (variant) => VARIANTS.includes(variant),
      color: (color) => COLORS.includes(color),
      disabled: (disabled) => typeof disabled === "boolean",
      type: (type) => TYPES.includes(type),
    }
  );
  const {
    disabled,
    type,
    onClick,
    children,
    testId,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active,
  } = mergedProps;
  const css = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    color: (_, theme, bp) => {
      const color =
        hasOwnProperty(props, "color") && hasOwnProperty(mergedProps, "color")
          ? mergedProps.color
          : getInheritedColor(bgMap?.[bp]);
      const variant =
        hasOwnProperty(props, "variant") &&
        hasOwnProperty(mergedProps, "variant")
          ? mergedProps.variant
          : color === "black"
          ? "secondary"
          : "primary";

      return theme.button.getCSS({
        variant,
        color,
        __internal__keyboardFocus,
        __internal__hover,
        __internal__active,
      });
    },
    margin: responsiveMargin,
    width: responsiveSize("width"),
  });

  return (
    <button
      css={css}
      disabled={disabled}
      type={type}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  ...responsiveMarginType,
  ...responsiveWidthType,
  variant: PropTypes.oneOf(VARIANTS),
  color: (props) => {
    if (props.color === undefined) {
      return;
    }

    if (COLORS.includes(props.color) === false) {
      return new Error(
        `Button: color="${
          props.color
        }" is not supported. Must be one of: ${formatArray(COLORS)}`
      );
    }

    if (
      props.variant === "primary" &&
      ["highlight.blue.t100", "white", "green"].includes(props.color) === false
    ) {
      return new Error(
        `Button: variant="primary" should be used only with these colors: ${formatArray(
          ["highlight.blue.t100", "white", "green"]
        )}`
      );
    }
  },
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  onClick: PropTypes.func,
  children: PropTypes.node,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool,
  __internal__hover: PropTypes.bool,
  __internal__active: PropTypes.bool,
};

export default Button;
