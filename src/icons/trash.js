import React from "react";
import PropTypes from "prop-types";

function Trash({ size, primaryColor, testId }) {
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
        d="M23 26H9V10h2v13.428a1 1 0 002 0V10h2v13.428a1 1 0 002 0V10h2v13.428a1 1 0 002 0V10h2v16zM14 8h4V6h-4v2zm12 0h-6V6a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H6a1 1 0 000 2h1v16a2 2 0 002 2h14a2 2 0 002-2V10h1a1 1 0 100-2z"
        fill={primaryColor}
        fillRule="evenodd"
      />
    </svg>
  );
}

Trash.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Trash;
