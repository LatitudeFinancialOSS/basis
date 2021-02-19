import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

function GitHub({ size, primaryColor, hoverColor, testId }) {
  const theme = useTheme();

  return (
    <svg
      css={{
        display: "block",
        fill: primaryColor,
        transition: hoverColor ? theme.transitions.icon : null,
        ":hover": {
          ...(hoverColor && { fill: hoverColor }),
        },
      }}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      data-testid={testId}
    >
      <path
        d="M15.846 4C9.304 4 4 9.148 4 15.5c0 5.08 3.394 9.388 8.102 10.91.593.105.809-.25.809-.555 0-.273-.01-.996-.016-1.955-3.295.694-3.99-1.542-3.99-1.542-.54-1.329-1.316-1.682-1.316-1.682-1.076-.713.081-.7.081-.7 1.19.083 1.815 1.186 1.815 1.186 1.057 1.757 2.772 1.25 3.448.956.107-.743.413-1.25.752-1.538-2.63-.29-5.397-1.276-5.397-5.683 0-1.255.462-2.281 1.22-3.085-.122-.29-.529-1.46.116-3.043 0 0 .995-.31 3.258 1.179a11.67 11.67 0 012.966-.388c1.006.005 2.02.132 2.966.388 2.261-1.488 3.254-1.18 3.254-1.18.647 1.584.24 2.753.118 3.044.76.804 1.218 1.83 1.218 3.085 0 4.418-2.77 5.39-5.41 5.674.426.355.805 1.057.805 2.13 0 1.537-.015 2.777-.015 3.154 0 .308.214.665.815.553 4.703-1.524 8.095-5.83 8.095-10.908C27.694 9.148 22.39 4 15.846 4"
        fillRule="evenodd"
      />
    </svg>
  );
}

GitHub.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  testId: PropTypes.string,
};

export default GitHub;
