import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useContainer from "../hooks/useContainer";

export const VARIANTS = ["primary", "secondary"];
export const COLORS = ["highlight.blue.t100", "white"];
export const TYPES = ["button", "submit"];

export const DEFAULT_PROPS = {
  variant: "primary",
  color: "highlight.blue.t100",
  isFullWidth: true,
  isDisabled: false,
  type: "button"
};

function Button(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { variant, isFullWidth, isDisabled, type, onClick, children } = props;
  const theme = useTheme();
  const { buttonColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && buttonColor ? buttonColor : props.color;
  const css = {
    ...theme.button,
    ...(isFullWidth && theme["button.fullWidth"]),
    ...theme[`button.${variant}.${color}`],
    ":focus": theme["button:focus"],
    ":hover": {
      ...(!isDisabled && theme[`button.${variant}.${color}:hover`])
    },
    ":active": {
      ...(!isDisabled && theme[`button.${variant}.${color}:active`])
    },
    ":disabled": {
      ...theme["button:disabled"],
      ...theme[`button.${variant}.${color}:disabled`]
    }
  };

  return (
    <button css={css} disabled={isDisabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(VARIANTS),
  color: PropTypes.oneOf(COLORS),
  isFullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(TYPES),
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default Button;
