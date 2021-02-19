import React from "react";
import PropTypes from "prop-types";

function ChevronDown({ size, primaryColor, testId }) {
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
        d="M22.646 14.98l-5.854 5.697c-.442.43-1.143.43-1.585 0l-5.85-5.693a1.153 1.153 0 01.473-1.94c.395-.112.82-.002 1.107.284l5.062 4.928 5.057-4.922c.33-.33.824-.425 1.25-.242a1.15 1.15 0 01.34 1.888z"
        fill={primaryColor}
      />
    </svg>
  );
}

ChevronDown.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default ChevronDown;
