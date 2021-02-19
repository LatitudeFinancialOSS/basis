import React from "react";
import PropTypes from "prop-types";

function WarningOrSignificant({ size, primaryColor, testId }) {
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
        d="M16 6a1.9 1.9 0 011.349.559l8.092 8.092a1.906 1.906 0 010 2.698l-8.092 8.092a1.904 1.904 0 01-2.698 0l-8.092-8.092a1.906 1.906 0 010-2.698l8.092-8.092A1.9 1.9 0 0116 6zm0 2h-.002L8 16l8 8 8-8-8-8zm0 10.5a1 1 0 01.117 1.993L16 20.5a1 1 0 110-2zm.058-7.5c.521 0 .942.422.942.943v5.115c0 .52-.421.942-.942.942h-.115a.943.943 0 01-.943-.942v-5.115c0-.521.422-.943.943-.943z"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

WarningOrSignificant.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default WarningOrSignificant;
