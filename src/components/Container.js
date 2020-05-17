import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import useTheme from "../hooks/useTheme";
import { TextStyleProvider } from "../hooks/useTextStyle";
import { BackgroundProvider } from "../hooks/useBackground";
import {
  responsiveMarginType,
  responsivePaddingType,
  responsiveWidthType,
  responsiveHeightType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMargin,
  responsivePadding,
  responsiveSize,
  responsiveTextAlign,
} from "../utils/css";
import { DEFAULT_BREAKPOINT } from "../utils/css";

const BACKGROUNDS = [
  "transparent",
  "white",
  "grey.t03",
  "grey.t05",
  "grey.t07",
  "secondary.lightBlue.t15",
  "secondary.lightBlue.t25",
  "primary.blue.t100",
];

const BOX_SHADOWS = ["header"];

const DEFAULT_PROPS = {
  bg: "transparent",
  hasBreakpointWidth: false,
};

Container.BACKGROUNDS = BACKGROUNDS;
Container.BOX_SHADOWS = BOX_SHADOWS;
Container.DEFAULT_PROPS = DEFAULT_PROPS;

function Container(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { bg, boxShadow, textStyle, children, testId } = props;
  const theme = useTheme();
  const responsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding,
    width: responsiveSize("width"),
    height: responsiveSize("height"),
    textAlign: responsiveTextAlign,
    hasBreakpointWidth: ({ hasBreakpointWidth, margin }, theme, bp) => {
      if (hasBreakpointWidth !== true) {
        if (margin) {
          return {
            maxWidth: "initial",
          };
        }

        return {
          maxWidth: "initial",
          marginLeft: "initial",
          marginRight: "initial",
        };
      }

      if (bp === DEFAULT_BREAKPOINT || !theme.breakpointMaxWidths[bp]) {
        return {
          marginLeft: "15px", // This is half of our special 30px columns gap.
          marginRight: "15px",
        };
      }

      return {
        maxWidth: theme.breakpointMaxWidths[bp],
        marginLeft: "auto",
        marginRight: "auto",
      };
    },
  });
  let container = (
    <div
      css={{
        boxSizing: "border-box",
        backgroundColor: bg === "transparent" ? bg : theme.getColor(bg),
        ...responsiveCSS,
        ...theme[`container.${boxShadow}`],
        "::after": theme[`container.${boxShadow}::after`],
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );

  if (textStyle) {
    container = (
      <TextStyleProvider value={textStyle}>{container}</TextStyleProvider>
    );
  }

  if (bg !== "transparent") {
    container = <BackgroundProvider value={bg}>{container}</BackgroundProvider>;
  }

  return container;
}

Container.propTypes = {
  bg: (props) => {
    if (!props.bg || BACKGROUNDS.includes(props.bg)) {
      return;
    }

    return new Error(
      `Container: bg="${
        props.bg
      }" is not allowed. Must be one of: ${JSON.stringify(BACKGROUNDS)}`
    );
  },
  boxShadow: PropTypes.oneOf(BOX_SHADOWS),
  ...responsiveMarginType,
  ...responsivePaddingType,
  ...responsiveWidthType,
  ...responsiveHeightType,
  ...responsivePropType("textStyle", PropTypes.oneOf(Text.TEXT_STYLES)),
  ...responsivePropType("textAlign", PropTypes.oneOf(Text.ALIGNS)),
  ...responsivePropType("hasBreakpointWidth", PropTypes.bool),
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default Container;
