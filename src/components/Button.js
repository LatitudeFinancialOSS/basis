import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useContainer from "../hooks/useContainer";
import { responsiveMargin } from "../utils/css";
import { responsiveMarginType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";

export const VARIANTS = ["primary", "secondary"];
export const COLORS = ["highlight.blue.t100", "white"];
export const TYPES = ["button", "submit"];

export const DEFAULT_PROPS = {
  variant: "primary",
  color: "highlight.blue.t100",
  isFullWidth: false,
  isDisabled: false,
  type: "button"
};

function Button(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { variant, isFullWidth, isDisabled, type, onClick, children } = props;
  const theme = useTheme();
  const { buttonColor } = useContainer();
  const responsivePropsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin
  });
  const color =
    !COLORS.includes(_props.color) && buttonColor ? buttonColor : props.color;
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const css = {
    ...theme.button,
    ...(isFullWidth && theme["button.fullWidth"]),
    ...theme[`button.${variant}.${colorStr}`],
    ":focus": theme["button:focus"],
    ":focus-visible": theme["button:focus-visible"],
    ":hover": {
      ...(!isDisabled && theme[`button.${variant}.${colorStr}:hover`])
    },
    ":active": {
      ...(!isDisabled && theme[`button.${variant}.${colorStr}:active`])
    },
    ":disabled": {
      ...theme["button:disabled"],
      ...theme[`button.${variant}.${colorStr}:disabled`]
    },
    ...responsivePropsCSS
  };

  return (
    <button css={css} disabled={isDisabled} type={type} onClick={onClick}>
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
  children: PropTypes.node
};

export default Button;
