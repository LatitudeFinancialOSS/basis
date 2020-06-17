import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import {
  responsiveWidthType,
  responsiveHeightType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveSize } from "../utils/css";
import { mergeProps } from "../utils/component";
import Flex from "./Flex";
import Text from "./Text";

const DEFAULT_PROPS = {
  height: "72px",
  label: "Placeholder",
};

function Placeholder(props) {
  const theme = useTheme();
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      label: (label) => typeof label === "string" && label.trim().length > 0,
    }
  );
  const { label, testId } = mergedProps;
  const responsivePropsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    width: responsiveSize("width"),
    height: responsiveSize("height"),
  });

  return (
    <div
      css={{
        ...responsivePropsCSS,
        backgroundColor: theme.getColor("grey.t07"),
        border: `${theme.borderWidths[1]} solid ${theme.getColor("grey.t30")}`,
        boxSizing: "border-box",
      }}
      data-testid={testId}
    >
      <Flex height="100%" placeItems="center">
        <Text>{label}</Text>
      </Flex>
    </div>
  );
}

Placeholder.propTypes = {
  ...responsiveWidthType,
  ...responsiveHeightType,
  label: PropTypes.string,
  testId: PropTypes.string,
};

export default Placeholder;
