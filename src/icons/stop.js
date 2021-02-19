import React from "react";
import PropTypes from "prop-types";

function Stop({ size, primaryColor, testId }) {
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
        d="M20.311 6l5.928 5.928v8.383l-5.928 5.928h-8.383L6 20.311v-8.383L11.93 6h8.382zm-.828 2h-6.727L8 12.756v6.727l4.757 4.756h6.727l4.756-4.756v-6.727L19.483 8zm.756 7.239a1 1 0 011 1l-.007.116a1 1 0 01-.993.884h-8a1 1 0 110-2z"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

Stop.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Stop;
