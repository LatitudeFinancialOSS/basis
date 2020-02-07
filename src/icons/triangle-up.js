import React from "react";
import PropTypes from "prop-types";

function TriangleUp({ size, primaryColor, testId }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      aria-label="Triangle up"
      data-testid={testId}
    >
      <path
        d="M11.253 17.491l4.181-4.25a.786.786 0 011.132 0l4.179 4.247a.885.885 0 01.231.827.838.838 0 01-.569.62c-.282.084-8.607.101-8.912-.035a.86.86 0 01-.495-.802.874.874 0 01.253-.607z"
        fill={primaryColor}
      />
    </svg>
  );
}

TriangleUp.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string
};

export default TriangleUp;
