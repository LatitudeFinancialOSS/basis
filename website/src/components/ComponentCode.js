import React from "react";
import PropTypes from "prop-types";
import { LiveEditor } from "react-live";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { designTokens } from "basis";

function ComponentCode({ className, code }) {
  return (
    <div
      className={className}
      css={{
        padding: `${designTokens.space[3]} ${designTokens.space[5]}`,
        "textarea:focus": {
          outline: "none"
        }
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
  code: PropTypes.string.isRequired
};

export default ComponentCode;
