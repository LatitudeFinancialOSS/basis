import React from "react";
import PropTypes from "prop-types";

function OverflowMenu({ primaryColor, testId }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      aria-label="Overflow menu"
      data-testid={testId}
    >
      <path
        d="M16 23a2 2 0 110 4 2 2 0 010-4zm0-9a2 2 0 110 4 2 2 0 010-4zm0-9a2 2 0 110 4 2 2 0 010-4z"
        fill={primaryColor}
      />
    </svg>
  );
}

OverflowMenu.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default OverflowMenu;
