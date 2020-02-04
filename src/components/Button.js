import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMarginType } from "../hooks/useResponsiveProp";
import { responsiveMargin } from "../utils/css";
import { mergeProps } from "../utils/component";

const VARIANTS = ["primary", "secondary", "icon"];
const COLORS = ["highlight.blue.t100", "white"];
const TYPES = ["button", "submit"];

const DEFAULT_PROPS = {
  variant: "primary",
  color: "highlight.blue.t100",
  isFullWidth: false,
  isDisabled: false,
  type: "button"
};

Button.VARIANTS = VARIANTS;
Button.COLORS = COLORS;
Button.TYPES = TYPES;
Button.DEFAULT_PROPS = DEFAULT_PROPS;

function Button(props) {
  const theme = useTheme();
  const { background } = useBackground();
  const inheritedColor =
    background === "primary.blue.t100" ? "white" : "highlight.blue.t100";
  const inheritedProps = {
    color: inheritedColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    variant: variant => VARIANTS.includes(variant),
    color: color => COLORS.includes(color),
    isFullWidth: isFullWidth => typeof isFullWidth === "boolean",
    isDisabled: isDisabled => typeof isDisabled === "boolean",
    type: type => TYPES.includes(type)
  });
  const {
    variant,
    color,
    isFullWidth,
    isDisabled,
    type,
    onClick,
    children,
    testId,
    __internal__keyboardFocus,
    __internal__hover,
    __internal__active
  } = mergedProps;
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    margin: responsiveMargin
  });
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const css = {
    ...theme.button,
    ...(isFullWidth && theme["button.fullWidth"]),
    ...theme[`button.${variant}.${colorStr}`],
    ":focus": theme["button:focus"],
    ":focus-visible": theme["button:focus-visible"],
    ...(__internal__keyboardFocus && {
      ...theme["button:focus"],
      ...theme["button:focus-visible"]
    }),
    ":hover": {
      ...(!isDisabled && theme[`button.${variant}.${colorStr}:hover`])
    },
    ...(__internal__hover && theme[`button.${variant}.${colorStr}:hover`]),
    ":active": {
      ...(!isDisabled && theme[`button.${variant}.${colorStr}:active`])
    },
    ...(__internal__active && theme[`button.${variant}.${colorStr}:active`]),
    ":disabled": {
      ...theme["button:disabled"],
      ...theme[`button.${variant}.${colorStr}:disabled`]
    },
    ...responsivePropsCSS
  };

  return (
    <button
      css={css}
      disabled={isDisabled}
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
  isFullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  onClick: PropTypes.func,
  children: PropTypes.node,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool,
  __internal__hover: PropTypes.bool,
  __internal__active: PropTypes.bool
};

export default Button;
