import React from "react";
import PropTypes from "prop-types";

function ChevronLeft({ size, primaryColor, testId }) {
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
        d="M17.02 9.354l-5.697 5.854a1.134 1.134 0 000 1.585l5.693 5.85a1.153 1.153 0 001.94-.473c.112-.395.002-.82-.284-1.107l-4.928-5.062 4.922-5.057c.33-.33.425-.824.242-1.25A1.148 1.148 0 0017.833 9c-.31.005-.606.135-.813.354z"
        fill={primaryColor}
      />
    </svg>
  );
}

ChevronLeft.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default ChevronLeft;
