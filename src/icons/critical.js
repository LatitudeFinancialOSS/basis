import React from "react";
import PropTypes from "prop-types";

function Critical({ size, primaryColor, testId }) {
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
        d="M20.312 6l5.928 5.928v8.383l-5.928 5.928h-8.383L6 20.311v-8.383L11.929 6h8.383zm-.828 2h-6.727L8 12.756v6.727l4.757 4.756h6.727l4.756-4.756v-6.727L19.484 8zm-5.483 11.5a1 1 0 01.117 1.993l-.117.007a1 1 0 110-2zm4 0a1 1 0 01.117 1.993l-.117.007a1 1 0 110-2zm.058-8.5c.52 0 .942.422.942.943v5.115c0 .52-.421.942-.942.942h-.115a.943.943 0 01-.943-.942v-5.115c0-.521.422-.943.943-.943zm-4 0c.52 0 .942.422.942.943v5.115c0 .52-.421.942-.942.942h-.115a.943.943 0 01-.943-.942v-5.115c0-.521.422-.943.943-.943z"
        fillRule="evenodd"
        fill={primaryColor}
      />
    </svg>
  );
}

Critical.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Critical;
