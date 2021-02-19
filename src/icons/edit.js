import React from "react";
import PropTypes from "prop-types";

function Edit({ size, primaryColor, testId }) {
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
        d="M22.157 12.657l-2.83-2.83 1.415-1.412 2.829 2.828-1.414 1.414zM10.829 23.985l-2.827-.001L8 21.157l9.913-9.915 2.828 2.829-9.913 9.914zm14.863-13.45l-4.243-4.242a1 1 0 00-1.414 0L6.293 20.035a.992.992 0 00-.292.707v4.242a1 1 0 001 .999l4.242.002c.265 0 .519-.106.707-.293L25.692 11.95a1 1 0 000-1.415z"
        fill={primaryColor}
      />
    </svg>
  );
}

Edit.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Edit;
