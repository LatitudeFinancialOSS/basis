import React from "react";
import PropTypes from "prop-types";

function Mail({ size, primaryColor, testId }) {
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
        d="M26 8a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V9a1 1 0 011-1h20zm-1 3.079l-9 7.202-9-7.201V22h18V11.079zM23.149 10H8.85L16 15.72 23.149 10z"
        fill={primaryColor}
      />
    </svg>
  );
}

Mail.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Mail;
