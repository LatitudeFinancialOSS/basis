import React from "react";
import PropTypes from "prop-types";

function TickSmall({ size, primaryColor, testId }) {
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
        d="M13.749 18.129l5.985-6.787a1 1 0 011.505 1.317l-6.747 7.658a1 1 0 01-1.514-.01l-1.74-2.178a1 1 0 111.523-1.298l.988 1.298z"
        fill={primaryColor}
      />
    </svg>
  );
}

TickSmall.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default TickSmall;
