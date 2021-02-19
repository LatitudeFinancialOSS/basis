import React from "react";
import PropTypes from "prop-types";

function ChevronRight({ size, primaryColor, testId }) {
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
        d="M14.98 9.354l5.697 5.854c.43.442.43 1.143 0 1.585l-5.693 5.85a1.153 1.153 0 0 1-1.94-.473 1.132 1.132 0 0 1 .284-1.107l4.928-5.062-4.922-5.057a1.134 1.134 0 0 1-.242-1.25A1.148 1.148 0 0 1 14.167 9c.31.005.606.135.813.354z"
        fill={primaryColor}
      />
    </svg>
  );
}

ChevronRight.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default ChevronRight;
