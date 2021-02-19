import React from "react";
import PropTypes from "prop-types";

function Time({ size, primaryColor, testId }) {
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
        d="M16 24c-4.411 0-8-3.589-8-8 0-4.412 3.589-8 8-8s8 3.588 8 8c0 4.411-3.589 8-8 8m0-18C10.478 6 6 10.477 6 16c0 5.522 4.478 10 10 10s10-4.478 10-10c0-5.523-4.478-10-10-10m1 9.586V11a1 1 0 10-2 0v5c0 .13.026.26.077.382a.99.99 0 00.217.326l3.534 3.534a.993.993 0 00.707.293.999.999 0 00.707-1.707L17 15.586z"
        fill={primaryColor}
      />
    </svg>
  );
}

Time.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Time;
