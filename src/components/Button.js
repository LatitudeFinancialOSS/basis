import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMarginType } from "../hooks/useResponsiveProp";
import { hasOwnProperty } from "../utils/core";
import { responsiveMargin } from "../utils/css";
import { mergeProps } from "../utils/component";

const VARIANTS = ["primary", "secondary", "icon"];
const COLORS = ["highlight.blue.t100", "white"];
const TYPES = ["button", "submit"];

const DEFAULT_PROPS = {
  variant: "primary",
  color: "highlight.blue.t100",
  fullWidth: false,
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
  const theme = useTheme();
  const { bgMap } = useBackground();
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      variant: (variant) => VARIANTS.includes(variant),
      color: (color) => COLORS.includes(color),
      fullWidth: (fullWidth) => typeof fullWidth === "boolean",
      disabled: (disabled) => typeof disabled === "boolean",
      type: (type) => TYPES.includes(type),
    }
  );
  const {
    variant,
    fullWidth,
    disabled,
    type,
    onClick,
    children,
    testId,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active,
  } = mergedProps;
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    margin: responsiveMargin,
    color: (propsAtBreakpoint, theme, bp) => {
      const color =
        hasOwnProperty(props, "color") && hasOwnProperty(mergedProps, "color")
          ? mergedProps.color
          : getInheritedColor(bgMap?.[bp]);
      const colorStr = color === DEFAULT_PROPS.color ? "default" : color;

      return {
        ...theme[`button.${variant}.${colorStr}`],
        ":hover": {
          ...(!disabled && theme[`button.${variant}.${colorStr}:hover`]),
        },
        ...(__internal__hover && theme[`button.${variant}.${colorStr}:hover`]),
        ":active": {
          ...(!disabled && theme[`button.${variant}.${colorStr}:active`]),
        },
        ...(__internal__active &&
          theme[`button.${variant}.${colorStr}:active`]),
        ":disabled": {
          ...theme["button:disabled"],
          ...theme[`button.${variant}.${colorStr}:disabled`],
        },
      };
    },
  });
  const css = {
    ...theme.button,
    ...(fullWidth && theme["button.fullWidth"]),
    ...(__internal__keyboardFocus && theme.focusStyles.__keyboardFocus),
    ...responsivePropsCSS,
  };

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
  variant: PropTypes.oneOf(VARIANTS),
  color: PropTypes.oneOf(COLORS),
  fullWidth: PropTypes.bool,
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
