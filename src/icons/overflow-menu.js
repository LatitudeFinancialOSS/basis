import React from "react";
import PropTypes from "prop-types";

function OverflowMenu({ size, primaryColor, testId }) {
  return (
    <svg
      css={{
        display: "block",
      }}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
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
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default OverflowMenu;
