import React from "react";
import PropTypes from "prop-types";

function Logout({ size, primaryColor, testId }) {
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
        d="M18 12V8H7.027v16H18v-4"
        fill="none"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17a1 1 0 010-2h10.696l-1.251-1.293a1.023 1.023 0 010-1.414.945.945 0 011.368 0l2.903 3a1.023 1.023 0 010 1.414l-2.903 3a.95.95 0 01-.684.293.95.95 0 01-.684-.293 1.023 1.023 0 010-1.414L22.695 17H12z"
        fill={primaryColor}
      />
    </svg>
  );
}

Logout.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Logout;
