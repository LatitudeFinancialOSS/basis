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

const VARIANTS = ["primary", "secondary", "icon"];
const COLORS = ["highlight.blue.t100", "white", "green"];
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

function getInheritedColor(backgroundColor) {
  return backgroundColor === "primary.blue.t100"
    ? "white"
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
    variant,
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
    color: (propsAtBreakpoint, theme, bp) => {
      const color =
        hasOwnProperty(props, "color") && hasOwnProperty(mergedProps, "color")
          ? mergedProps.color
          : getInheritedColor(bgMap?.[bp]);

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
  color: PropTypes.oneOf(COLORS),
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
