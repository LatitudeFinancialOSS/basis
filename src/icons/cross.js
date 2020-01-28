import React from "react";
import PropTypes from "prop-types";

function Cross({ primaryColor, testId }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Cross"
      data-testid={testId}
    >
      <path
        d="M9.707 8.293l6.364 6.363 6.364-6.363a1 1 0 011.414 1.414l-6.364 6.364 6.364 6.364a1 1 0 01-1.414 1.414l-6.364-6.364-6.364 6.364a1 1 0 11-1.414-1.414l6.363-6.364-6.363-6.364a1 1 0 011.414-1.414z"
        fill={primaryColor}
      />
    </svg>
  );
}

Cross.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default Cross;
