import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

function Facebook({ size, primaryColor, hoverColor, testId }) {
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
        d="M4 15.998C4 21.986 8.434 26.95 14.232 27.85v-8.385h-3.079v-3.467h3.079v-2.643c0-3.007 1.81-4.668 4.58-4.668 1.326 0 2.714.234 2.714.234v2.953h-1.529c-1.506 0-1.976.924-1.976 1.873v2.251h3.363l-.537 3.467h-2.826v8.385c5.798-.9 10.231-5.864 10.231-11.852C28.252 9.372 22.823 4 16.126 4 9.428 4 4 9.372 4 15.998z"
        fillRule="evenodd"
      />
    </svg>
  );
}

Facebook.propTypes = {
  size: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  testId: PropTypes.string,
};

export default Facebook;
