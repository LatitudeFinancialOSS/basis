import React from "react";
import PropTypes from "prop-types";

function Search({ primaryColor }) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      role="img"
      aria-label="Search"
    >
      <path
        d="M18.243 18.243a6 6 0 10-8.485-8.485 6 6 0 008.485 8.485zm6.964 5.55c.943.943-.471 2.357-1.414 1.414l-4.887-4.887a8 8 0 111.414-1.414l4.887 4.887z"
        fill={primaryColor}
      />
    </svg>
  );
}

Search.propTypes = {
  primaryColor: PropTypes.string.isRequired
};

export default Search;
