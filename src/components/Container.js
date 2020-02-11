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
  responsivePropType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMargin,
  responsivePadding,
  responsiveSize,
  responsiveTextAlign,
  mergeResponsiveCSS
} from "../utils/css";
import { EXCEPTION_PREFIX } from "../utils/css";

const BACKGROUNDS = [
  "white",
  "grey.t03",
  "grey.t05",
  "secondary.lightBlue.t30",
  "primary.blue.t100"
];

const BOX_SHADOWS = ["header"];

const DEFAULT_PROPS = {
  hasBreakpointWidth: false
};

Container.BACKGROUNDS = BACKGROUNDS;
Container.BOX_SHADOWS = BOX_SHADOWS;
Container.DEFAULT_PROPS = DEFAULT_PROPS;

function Container(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    bg,
    boxShadow,
    hasBreakpointWidth,
    textStyle,
    children,
    testId
  } = props;
  const theme = useTheme();
  const responsivePropsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding,
    width: responsiveSize("width"),
    height: responsiveSize("height"),
    textAlign: responsiveTextAlign
  });
  const responsiveCSS = hasBreakpointWidth
    ? mergeResponsiveCSS(
        {
          marginLeft: "15px", // This is half of our special 30px columns gutter.
          marginRight: "15px",
          // Note: the order of these media queries is important (because they are not exclusive).
          [theme.minMediaQueries.sm]: {
            maxWidth: theme.breakpointMaxWidths.sm,
            marginLeft: "auto",
            marginRight: "auto"
          },
          [theme.minMediaQueries.md]: {
            maxWidth: theme.breakpointMaxWidths.md
          },
          [theme.minMediaQueries.lg]: {
            maxWidth: theme.breakpointMaxWidths.lg
          },
          [theme.minMediaQueries.xl]: {
            maxWidth: theme.breakpointMaxWidths.xl
          }
        },
        responsivePropsCSS
      )
    : responsivePropsCSS;
  let container = (
    <div
      css={{
        boxSizing: "border-box",
        backgroundColor: theme.getColor(bg),
        ...responsiveCSS,
        ...theme[`container.${boxShadow}`],
        "::after": theme[`container.${boxShadow}::after`]
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

  if (bg) {
    container = <BackgroundProvider value={bg}>{container}</BackgroundProvider>;
  }

  return container;
}

Container.propTypes = {
  bg: props => {
    if (!props.bg || BACKGROUNDS.includes(props.bg)) {
      return;
    }

    if (typeof props.bg === "string" && props.bg.startsWith(EXCEPTION_PREFIX)) {
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
  hasBreakpointWidth: PropTypes.bool,
  children: PropTypes.node,
  testId: PropTypes.string
};

export default Container;
