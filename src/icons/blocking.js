import React from "react";
import PropTypes from "prop-types";

function Blocking({ size, primaryColor, testId }) {
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
        d="M16 24a7.952 7.952 0 01-4.897-1.688l11.209-11.209A7.954 7.954 0 0124 16c0 4.411-3.589 8-8 8m-8-8c0-4.411 3.589-8 8-8 1.846 0 3.543.634 4.897 1.688L9.688 20.897A7.952 7.952 0 018 16m8-10C10.478 6 6 10.477 6 16c0 5.522 4.478 10 10 10s10-4.478 10-10c0-5.523-4.478-10-10-10"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

Blocking.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Blocking;
