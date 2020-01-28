import React from "react";
import PropTypes from "prop-types";

function ArrowForward({ primaryColor, testId }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Arrow forward"
      data-testid={testId}
    >
      <path
        d="M12.29 22.365a1 1 0 001.42 1.408l7-7.07a1 1 0 00-.003-1.41l-7-7a1 1 0 00-1.414 1.414l6.296 6.296-6.3 6.362z"
        fill={primaryColor}
      />
    </svg>
  );
}

ArrowForward.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default ArrowForward;
