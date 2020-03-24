import React from "react";
import PropTypes from "prop-types";
import { LiveEditor } from "react-live";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTheme } from "basis";

function ComponentCode({ className, code }) {
  const theme = useTheme();

  return (
    <div
      className={className}
      css={{
        padding: `${theme.space[3]} ${theme.space[5]}`,
        "textarea:focus": {
          outline: "none",
        },
      }}
    >
      <LiveEditor />
      <CopyToClipboard text={code}>
        <button>Copy Code</button>
      </CopyToClipboard>
    </div>
  );
}

ComponentCode.propTypes = {
  className: PropTypes.string,
  code: PropTypes.string.isRequired,
};

export default ComponentCode;
