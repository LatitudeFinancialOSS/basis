import React from "react";
import PropTypes from "prop-types";

function Devices({ size, primaryColor, testId }) {
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
      fill={primaryColor}
      data-testid={testId}
    >
      <path d="M26.1 4H11.31a1.84 1.84 0 00-1.85 1.83V10H6a2 2 0 00-2 2v14a2 2 0 002 2h20.1a1.84 1.84 0 001.9-1.83V5.83A1.84 1.84 0 0026.1 4zM13 13.5v11a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5h6a.5.5 0 01.5.5zM26 26H15V12a2 2 0 00-2-2h-1.54V6H26z" />
    </svg>
  );
}

Devices.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Devices;
