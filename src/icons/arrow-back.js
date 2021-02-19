import React from "react";
import PropTypes from "prop-types";

function ArrowBack({ size, primaryColor, testId }) {
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
        d="M19.71 22.365a1 1 0 01-1.42 1.408l-7-7.07a1 1 0 01.003-1.41l7-7a1 1 0 011.414 1.414l-6.296 6.296 6.3 6.362z"
        fill={primaryColor}
      />
    </svg>
  );
}

ArrowBack.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default ArrowBack;
