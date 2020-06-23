import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import { BackgroundProvider } from "../hooks/useBackground";
import {
  responsiveMarginType,
  responsivePaddingType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { mergeProps } from "../utils/component";
import { responsiveMargin, responsivePadding } from "../utils/css";

const sizesMap = {
  tiny: {
    offset: 20,
    borderWidth: 20,
    minSize: 60,
  },
  small: {
    offset: 40,
    borderWidth: 24,
    minSize: 104,
  },
  medium: {
    offset: 48,
    borderWidth: 32,
    minSize: 128,
  },
  large: {
    offset: 60,
    borderWidth: 40,
    minSize: 160,
  },
};

const colorsMap = {
  low: {
    grey: {
      contentBackgroundColor: "grey.t03",
      shadowBorderColor: "grey.t07",
    },
    blue: {
      contentBackgroundColor: "secondary.lightBlue.t25",
      shadowBorderColor: "secondary.lightBlue.t15",
    },
    pink: {
      contentBackgroundColor: "secondary.pink.t30",
      shadowBorderColor: "secondary.pink.t15",
    },
    purple: {
      contentBackgroundColor: "secondary.purple.t30",
      shadowBorderColor: "secondary.purple.t15",
    },
  },
  medium: {
    grey: {
      contentBackgroundColor: "white",
      shadowBorderColor: "grey.t07",
    },
    blue: {
      contentBackgroundColor: "secondary.lightBlue.t25",
      shadowBorderColor: "secondary.lightBlue.t60",
    },
    pink: {
      contentBackgroundColor: "secondary.pink.t30",
      shadowBorderColor: "secondary.pink.t60",
    },
    purple: {
      contentBackgroundColor: "secondary.purple.t30",
      shadowBorderColor: "secondary.purple.t60",
    },
  },
  high: {
    grey: {
      contentBackgroundColor: "white",
      shadowBorderColor: "grey.t16",
    },
    blue: {
      contentBackgroundColor: "secondary.lightBlue.t60",
      shadowBorderColor: "secondary.lightBlue.t100",
    },
    pink: {
      contentBackgroundColor: "secondary.pink.t60",
      shadowBorderColor: "secondary.pink.t100",
    },
    purple: {
      contentBackgroundColor: "secondary.purple.t60",
      shadowBorderColor: "secondary.purple.t100",
    },
  },
};

function getColors(backgroundVariant, shadowColor) {
  const { contentBackgroundColor, shadowBorderColor } = colorsMap[
    backgroundVariant
  ][shadowColor];

  return {
    contentBackgroundColor,
    shadowBorderColor,
  };
}

const SHADOW_SIZES = ["none", "tiny", "small", "medium", "large"];
const SHADOW_DIRECTIONS = ["left", "right"];
const SHADOW_COLORS = ["grey", "blue", "pink", "purple"];
const SHADOW_CONTRASTS = ["low", "medium", "high"];

const DEFAULT_PROPS = {
  shadowSize: "large",
  shadowDirection: "right",
  shadowColor: "grey",
  shadowContrast: "high",
};

ShadowContainer.SHADOW_SIZES = SHADOW_SIZES;
ShadowContainer.SHADOW_DIRECTIONS = SHADOW_DIRECTIONS;
ShadowContainer.SHADOW_COLORS = SHADOW_COLORS;
ShadowContainer.SHADOW_CONTRASTS = SHADOW_CONTRASTS;
ShadowContainer.DEFAULT_PROPS = DEFAULT_PROPS;

function ShadowContainer(props) {
  const theme = useTheme();
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      shadowSize: (shadowSize) => SHADOW_SIZES.includes(shadowSize),
      shadowDirection: (shadowDirection) =>
        SHADOW_DIRECTIONS.includes(shadowDirection),
      shadowColor: (shadowColor) => SHADOW_COLORS.includes(shadowColor),
      shadowContrast: (shadowContrast) =>
        SHADOW_CONTRASTS.includes(shadowContrast),
    }
  );
  const {
    shadowDirection,
    shadowColor,
    shadowContrast,
    children,
    testId,
  } = mergedProps;
  const { contentBackgroundColor, shadowBorderColor } = getColors(
    shadowContrast,
    shadowColor
  );
  const contentHasBorder = shadowColor === "grey";
  const contentBorderWidth = contentHasBorder
    ? parseInt(theme.borderWidths[0], 10)
    : 0;
  const contentBorderColor = theme.colors.grey.t10;
  const shadowSizePx = `calc(100% + ${2 * contentBorderWidth}px)`;
  const contentResponsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding,
    shadowSize: ({ shadowSize }) => {
      if (shadowSize === "none") {
        return {};
      }

      const contentMinSize = sizesMap[shadowSize].minSize;

      return {
        minWidth: contentMinSize,
        minHeight: contentMinSize,
      };
    },
  });
  const contentBeforeResponsiveCSS = useResponsivePropsCSS(
    props,
    DEFAULT_PROPS,
    {
      shadowSize: ({ shadowSize }) => {
        const display = shadowSize === "none" ? "none" : "block";

        if (shadowSize === "none") {
          return { display };
        }

        const shadowOffset = sizesMap[shadowSize].offset;
        const shadowBorderWidth = sizesMap[shadowSize].borderWidth;

        return {
          display,
          top: shadowOffset - contentBorderWidth,
          left:
            (shadowDirection === "left" ? -shadowOffset : shadowOffset) -
            contentBorderWidth,
          border: `${shadowBorderWidth}px solid ${theme.getColor(
            shadowBorderColor
          )}`,
        };
      },
    }
  );

  return (
    <BackgroundProvider value={contentBackgroundColor}>
      <div
        css={{
          /* 
            We set { display: "flex", flexDirection: "column" } in order to allow `children`
            to be full height.
            See: https://stackoverflow.com/q/8468066/247243
          */
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          ...contentResponsiveCSS,
          backgroundColor: theme.getColor(contentBackgroundColor),
          ...(contentHasBorder && {
            border: `${contentBorderWidth}px solid ${contentBorderColor}`,
          }),
          position: "relative",
          transformStyle: "preserve-3d", // See: https://stackoverflow.com/a/51432213/247243
          "::before": {
            transform: "translateZ(-1px)", // See: https://stackoverflow.com/a/51432213/247243
            boxSizing: "border-box",
            content: '""',
            position: "absolute",
            width: shadowSizePx,
            height: shadowSizePx,
            ...contentBeforeResponsiveCSS,
          },
        }}
        data-testid={testId}
      >
        {children}
      </div>
    </BackgroundProvider>
  );
}

ShadowContainer.propTypes = {
  ...responsiveMarginType,
  ...responsivePaddingType,
  ...responsivePropType("shadowSize", PropTypes.oneOf(SHADOW_SIZES)),
  shadowDirection: PropTypes.oneOf(SHADOW_DIRECTIONS),
  shadowColor: PropTypes.oneOf(SHADOW_COLORS),
  shadowContrast: PropTypes.oneOf(SHADOW_CONTRASTS),
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default ShadowContainer;
