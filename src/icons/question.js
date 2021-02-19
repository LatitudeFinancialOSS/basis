import React from "react";
import PropTypes from "prop-types";

function Question({ size, primaryColor, testId }) {
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
        d="M16 8c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m0 18c-5.514 0-10-4.486-10-10S10.486 6 16 6s10 4.486 10 10-4.486 10-10 10m0-3.94c-.13 0-.26-.03-.38-.08-.13-.05-.23-.12-.33-.21-.181-.19-.29-.45-.29-.71 0-.27.109-.52.29-.71.1-.09.2-.16.33-.21.359-.16.81-.07 1.09.21.18.19.29.45.29.71 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29m-.107-3.07a1 1 0 01-1-1v-.675c0-.108.018-.213.049-.31.193-.984.922-1.695 1.523-2.282.655-.639 1.052-1.062 1.052-1.548 0-.456-.56-.94-1.596-.94-1.094 0-1.55.798-1.554.807a1 1 0 11-1.766-.939c.368-.694 1.482-1.869 3.32-1.869 2.336 0 3.596 1.515 3.596 2.941 0 1.364-.917 2.26-1.654 2.98-.5.486-.97.946-.97 1.357v.477a1 1 0 01-1 1"
        fill={primaryColor}
      />
    </svg>
  );
}

Question.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Question;
