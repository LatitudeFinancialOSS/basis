import React from "react";
import PropTypes from "prop-types";

function Shield({ size, primaryColor, testId }) {
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
        d="M25.999 8.027a2 2 0 00-2.255-1.982 9.439 9.439 0 01-6.576-1.668 2 2 0 00-2.336 0 9.416 9.416 0 01-6.578 1.668 1.967 1.967 0 00-1.575.482A1.996 1.996 0 006 8.027v6.43c0 8.066 7.045 11.748 9.204 12.684a1.989 1.989 0 001.592 0C18.955 26.207 26 22.524 26 14.459l-.001-6.43z"
        fill={primaryColor}
      />
    </svg>
  );
}

Shield.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Shield;
