import React from "react";
import PropTypes from "prop-types";

function Home({ size, primaryColor, testId }) {
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
        d="M23 24.182h-4v-5a1 1 0 00-1-1h-4a1 1 0 00-1 1v5H9v-8.768l7-7 7 7v8.768zm3.707-7.89l-10-10a1 1 0 00-1.414 0l-10 10a.999.999 0 101.414 1.415L7 17.414v7.768a1 1 0 001 1h6a1 1 0 001-1v-5h2v5a1 1 0 001 1h6a1 1 0 001-1v-7.768l.293.293A.993.993 0 0026 18a.999.999 0 00.707-1.707z"
        fill={primaryColor}
        fillRule="evenodd"
      />
    </svg>
  );
}

Home.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

export default Home;
