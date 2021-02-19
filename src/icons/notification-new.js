import React from "react";
import PropTypes from "prop-types";

function NotificationNew({ size, primaryColor, secondaryColor, testId }) {
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
        d="M18 24.5a2 2 0 01-4 0zM16 6a1.5 1.5 0 011.5 1.5v1.202c2.619.707 4.5 3.22 4.5 6.049V20.5a1 1 0 001 1 1 1 0 110 2H9a1 1 0 110-2 1 1 0 001-1v-6a5.998 5.998 0 014.5-5.805V7.5A1.5 1.5 0 0116 6zm0 4.5a4 4 0 00-4 4v7h8v-7a4 4 0 00-4-4z"
        fill={primaryColor}
      />
      <path d="M24 12.5a3 3 0 11-6 0 3 3 0 016 0" fill={secondaryColor} />
    </svg>
  );
}

NotificationNew.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default NotificationNew;
