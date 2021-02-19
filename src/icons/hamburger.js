import React from "react";
import PropTypes from "prop-types";

function Hamburger({ size, primaryColor, testId }) {
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
        d="M26 22a1 1 0 010 2H6a1 1 0 010-2h20zm0-7a1 1 0 010 2H6a1 1 0 010-2h20zm0-7a1 1 0 010 2H6a1 1 0 110-2h20z"
        fill={primaryColor}
      />
    </svg>
  );
}

Hamburger.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Hamburger;
