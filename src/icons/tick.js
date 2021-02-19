import React from "react";
import PropTypes from "prop-types";

function Tick({ size, primaryColor, testId }) {
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
        d="M13.51 20.47l9.737-11.129a1 1 0 011.506 1.318l-10.5 12a1 1 0 01-1.514-.01l-4.5-5.28A1 1 0 019.76 16.07l3.749 4.399z"
        fill={primaryColor}
      />
    </svg>
  );
}

Tick.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Tick;
