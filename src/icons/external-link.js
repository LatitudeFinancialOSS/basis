import React from "react";
import PropTypes from "prop-types";

function ExternalLink({ size, primaryColor, testId }) {
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
        d="M16 10a1 1 0 110 2H8v12h12v-8a1 1 0 112 0v9a1 1 0 01-1 1H7a1 1 0 01-1-1V11a1 1 0 011-1zm9-4a1 1 0 011 1v9a1 1 0 11-2 0V9.414l-9.408 9.409c-.391.39-1.025.39-1.415 0a1.002 1.002 0 010-1.415L22.586 8H16a1 1 0 110-2z"
        fill={primaryColor}
      />
    </svg>
  );
}

ExternalLink.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default ExternalLink;
