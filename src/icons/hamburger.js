import React from "react";
import PropTypes from "prop-types";

function Hamburger({ primaryColor, testId }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Hamburger"
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
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default Hamburger;
