import React from "react";
import PropTypes from "prop-types";

// See: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
const css = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
};

function VisuallyHidden({ children }) {
  if (typeof children === "string") {
    return <span css={css}>{children}</span>;
  }

  const child = React.Children.only(children);

  /*
    Note: We avoid adding extra DOM elements here since we rely on elements order in some places.
    For example, Radio has the following DOM structure:
      <VisuallyHidden>
        <input>
      </VisuallyHidden>
      <label>
    and one of the CSS selectors we use on the input is: ":checked + label"
    If we wrapped the input with a span/div, we'd break the styling.
  */
  return React.cloneElement(child, {
    // See: https://github.com/emotion-js/emotion/issues/1713#issuecomment-574121500
    style: css,
  });
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VisuallyHidden;
