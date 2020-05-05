import React from "react";
import PropTypes from "prop-types";

function VisuallyHidden({ children }) {
  const child = React.Children.only(children);

  return React.cloneElement(child, {
    // See: https://github.com/emotion-js/emotion/issues/1713#issuecomment-574121500
    style: {
      // See: https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
      position: "absolute",
      width: "1px",
      height: "1px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      clip: "rect(0, 0, 0, 0)",
      clipPath: "inset(50%)",
    },
  });
}

VisuallyHidden.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VisuallyHidden;
