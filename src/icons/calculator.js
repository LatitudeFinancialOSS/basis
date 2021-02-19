import React from "react";
import PropTypes from "prop-types";

function Calculator({ size, primaryColor, testId }) {
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
        d="M25 1a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h18zM12 26H7v2a1 1 0 0 0 .883.993L8 29h4v-3zm6 0h-4v3h4v-3zm7-5h-5v8h4a1 1 0 0 0 .993-.883L25 28v-7zm-7 0h-4v3h4v-3zm-6 0H7v3h5v-3zm0-5H7v3h5v-3zm6 0h-4v3h4v-3zm7 0h-5v3h5v-3zm-13-5H7v3h5v-3zm6 0h-4v3h4v-3zm7 0h-5v3h5v-3zm-1-8H8a1 1 0 0 0-.993.883L7 4v5h18V4a1 1 0 0 0-1-1zm-2 1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1zm0 1h-1v2h1V5z"
        fill={primaryColor}
      />
    </svg>
  );
}

Calculator.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Calculator;
