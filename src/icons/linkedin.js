import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";

function LinkedIn({ primaryColor, hoverColor, testId }) {
  const theme = useTheme();

  return (
    <svg
      width={32}
      height={32}
      css={{
        fill: primaryColor,
        transition: theme.transitions.icon,
        ":hover": {
          ...(hoverColor && { fill: hoverColor })
        }
      }}
      viewBox="0 0 32 32"
      focusable="false"
      role="img"
      aria-label="LinkedIn"
      data-testid={testId}
    >
      <path
        d="M22.176 11.512c3.394 0 5.824 2.071 5.824 6.357V28h-4.931v-8.398c0-2.304-.876-3.59-2.698-3.59-1.983 0-3.02 1.34-3.02 3.59V28H12.6V12h4.752v2.155l.016-.028c.164-.283 1.619-2.615 4.808-2.615zM9.43 12v16H4.476V12h4.955zM6.93 4c1.619 0 2.93 1.322 2.93 2.952S8.549 9.905 6.93 9.905C5.312 9.905 4 8.583 4 6.952 4 5.322 5.312 4 6.93 4z"
        fillRule="evenodd"
      />
    </svg>
  );
}

LinkedIn.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string,
  testId: PropTypes.string
};

export default LinkedIn;
