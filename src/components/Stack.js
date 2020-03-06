import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsivePropType } from "../hooks/useResponsiveProp";
import { mergeProps } from "../utils/component";
import { getGapPx } from "../utils/css";

const DEFAULT_PROPS = {
  gap: "0"
};

Stack.DEFAULT_PROPS = DEFAULT_PROPS;

function Stack(props) {
  const mergedProps = mergeProps(props, DEFAULT_PROPS);
  const { children, testId } = mergedProps;
  const theme = useTheme();
  const childCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    gap: ({ gap }) => {
      return {
        marginTop: getGapPx(gap, theme)
      };
    }
  });

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column"
      }}
      data-testid={testId}
    >
      {children.map((child, index) => (
        <div css={index > 0 && childCSS} key={index}>
          {child}
        </div>
      ))}
    </div>
  );
}

Stack.propTypes = {
  ...responsivePropType(
    "gap",
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

export default Stack;
