import React from "react";
import PropTypes from "prop-types";

function EyeVisible({ size, primaryColor, testId }) {
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
        d="M23.041 18.834C20.751 20.905 18.316 22 16 22c-2.316 0-4.751-1.095-7.041-3.166A19.218 19.218 0 016.402 16a19.355 19.355 0 012.557-2.833c.451-.408.908-.767 1.368-1.098A6 6 0 0010 14.011a6 6 0 0012 0 6.01 6.01 0 00-.327-1.943c.46.332.917.691 1.368 1.099a19.27 19.27 0 012.557 2.834 19.407 19.407 0 01-2.557 2.833zm-8.305-6.623a1.5 1.5 0 11-3.001-.001 1.5 1.5 0 013.001.001zm9.647-.527C21.719 9.273 18.82 8 16 8c-2.82 0-5.719 1.273-8.383 3.684a20.654 20.654 0 00-2.805 3.134 2 2 0 000 2.364c.865 1.18 1.8 2.225 2.805 3.134C10.281 22.727 13.18 24 16 24c2.82 0 5.719-1.273 8.383-3.684a20.654 20.654 0 002.805-3.134 2 2 0 000-2.364 20.654 20.654 0 00-2.805-3.134z"
        fill={primaryColor}
      />
    </svg>
  );
}

EyeVisible.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default EyeVisible;
