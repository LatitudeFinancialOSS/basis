import React from "react";
import PropTypes from "prop-types";

function Mail({ primaryColor }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Mail"
    >
      <path
        d="M26 8a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V9a1 1 0 011-1h20zm-1 3.079l-9 7.202-9-7.201V22h18V11.079zM23.149 10H8.85L16 15.72 23.149 10z"
        fill={primaryColor}
      />
    </svg>
  );
}

Mail.propTypes = {
  primaryColor: PropTypes.string.isRequired
};

export default Mail;
