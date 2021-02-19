import React from "react";
import PropTypes from "prop-types";

function FaceID({ size, primaryColor, testId }) {
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
        d="M7 20a1 1 0 011 1v3h3a1 1 0 110 2H7a1 1 0 01-1-1v-4a1 1 0 011-1zm18 0a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h3v-3a1 1 0 011-1zm-4-.189v.004c0 .37-.198.721-.529.887A9.955 9.955 0 0116 21.754a9.955 9.955 0 01-4.471-1.052.987.987 0 01-.529-.887v-.004a.996.996 0 011.449-.886 7.967 7.967 0 003.551.83 7.967 7.967 0 003.551-.83.996.996 0 011.449.886zM16 13a1 1 0 011 1v3a1 1 0 01-1 1h-1a1 1 0 110-2v-2a1 1 0 011-1zm-4-2a1 1 0 011 1v1a1 1 0 01-2 0v-1a1 1 0 011-1zm8 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-9-5a1 1 0 010 2H8v3a1 1 0 01-2 0V7a1 1 0 011-1h4zm14 0a1 1 0 011 1v4a1 1 0 11-2 0V8h-3a1 1 0 110-2h4z"
        fill={primaryColor}
      />
    </svg>
  );
}

FaceID.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default FaceID;
