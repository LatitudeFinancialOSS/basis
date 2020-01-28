import React from "react";
import PropTypes from "prop-types";

function ChevronUp({ primaryColor, testId }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Chevron up"
      data-testid={testId}
    >
      <path
        d="M9.354 17.02l5.854-5.697a1.134 1.134 0 011.585 0l5.85 5.693a1.153 1.153 0 01-.473 1.94c-.395.112-.82.002-1.107-.284l-5.062-4.928-5.057 4.922c-.33.33-.824.425-1.25.242A1.148 1.148 0 019 17.833c.005-.31.135-.606.354-.813z"
        fill={primaryColor}
      />
    </svg>
  );
}

ChevronUp.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default ChevronUp;
