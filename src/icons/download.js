import React from "react";
import PropTypes from "prop-types";

function Download({ primaryColor }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Download"
    >
      <path
        d="M25 24a1 1 0 110 2H7a1 1 0 110-2zM16 6a1 1 0 011 1v12.172l4.139-4.14a1 1 0 111.415 1.414l-4.968 4.968a2 2 0 01-1.414.586h-.344a2 2 0 01-1.414-.586l-4.967-4.968a1 1 0 011.415-1.414L15 19.172V7a1 1 0 011-1z"
        fill={primaryColor}
      />
    </svg>
  );
}

Download.propTypes = {
  primaryColor: PropTypes.string.isRequired
};

export default Download;
