import React from "react";
import PropTypes from "prop-types";

function StopwatchAlt({ size, primaryColor, testId }) {
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
        d="M16 6c5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10-5.522 0-10-4.478-10-10 0-5.523 4.478-10 10-10zm0 2c-4.411 0-8 3.588-8 8 0 4.411 3.589 8 8 8s8-3.589 8-8c0-4.412-3.589-8-8-8zm0 2a1 1 0 01.993.883L17 11v4.586l3.243 3.242a.999.999 0 01-1.312 1.504l-.102-.09-3.535-3.534a.99.99 0 01-.285-.578L15 16v-5a1 1 0 011-1zm3-8a1 1 0 110 2h-6a1 1 0 110-2z"
        fill={primaryColor}
      />
    </svg>
  );
}

StopwatchAlt.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default StopwatchAlt;
