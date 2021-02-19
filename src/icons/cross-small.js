import React from "react";
import PropTypes from "prop-types";

function CrossSmall({ size, primaryColor, testId }) {
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
        d="M21.731 11.269a.915.915 0 010 1.296l-3.935 3.934 3.935 3.936a.915.915 0 11-1.296 1.296L16.5 17.795l-3.935 3.936a.914.914 0 01-1.296 0 .915.915 0 010-1.296l3.934-3.936-3.934-3.934a.915.915 0 111.296-1.296l3.935 3.934 3.935-3.934a.916.916 0 011.296 0z"
        fill={primaryColor}
      />
    </svg>
  );
}

CrossSmall.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default CrossSmall;
