import React from "react";
import PropTypes from "prop-types";

function Duplicate({ size, primaryColor, testId }) {
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
        d="M26 10a2 2 0 012 2v14a2 2 0 01-2 2H12a2 2 0 01-2-2v-2h2v2h14V12H12v6h-2v-6a2 2 0 012-2zm-6-6a2 2 0 012 2v2h-2V6H6v14h12.086l-1.293-1.293a.999.999 0 111.414-1.414l3 3a.999.999 0 010 1.414l-3 3a.997.997 0 01-1.414 0 .999.999 0 010-1.414L18.086 22H6a2 2 0 01-2-2V6a2 2 0 012-2z"
        fill={primaryColor}
        fillRule="evenodd"
      />
    </svg>
  );
}

Duplicate.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Duplicate;
