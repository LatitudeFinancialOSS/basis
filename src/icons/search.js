import React from "react";
import PropTypes from "prop-types";

function Search({ size, primaryColor, testId }) {
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
        d="M18.243 18.243a6 6 0 10-8.485-8.485 6 6 0 008.485 8.485zm6.964 5.55c.943.943-.471 2.357-1.414 1.414l-4.887-4.887a8 8 0 111.414-1.414l4.887 4.887z"
        fill={primaryColor}
      />
    </svg>
  );
}

Search.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Search;
