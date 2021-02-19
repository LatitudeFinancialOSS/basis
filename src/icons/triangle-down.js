import React from "react";
import PropTypes from "prop-types";

function TriangleDown({ size, primaryColor, testId }) {
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
        d="M20.747 14.509l-4.181 4.25a.786.786 0 01-1.132 0l-4.179-4.247a.885.885 0 01-.231-.827c.07-.3.287-.536.569-.62.282-.084 8.607-.101 8.912.035a.86.86 0 01.495.802.874.874 0 01-.253.607z"
        fill={primaryColor}
      />
    </svg>
  );
}

TriangleDown.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default TriangleDown;
