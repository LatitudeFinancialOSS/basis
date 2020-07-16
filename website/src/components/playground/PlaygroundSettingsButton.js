import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "basis";

const TYPES = ["button", "submit"];

function PlaygroundSettingsButton({
  type = "button",
  title,
  width,
  onClick,
  children,
}) {
  const theme = useTheme();
  const buttonCSS = {
    boxSizing: "border-box",
    width,
    height: 22,
    fontSize: "14px",
    fontWeight: "inherit",
    fontFamily: "inherit",
    padding: 0,
    border: 0,
    borderRadius: 2,
    backgroundColor: theme.getColor("grey.t10"),
    ":hover": {
      backgroundColor: theme.getColor("grey.t16"),
    },
  };

  return (
    <button css={buttonCSS} type={type} onClick={onClick} title={title}>
      {children}
    </button>
  );
}

PlaygroundSettingsButton.propTypes = {
  type: PropTypes.oneOf(TYPES),
  title: PropTypes.string,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default PlaygroundSettingsButton;
