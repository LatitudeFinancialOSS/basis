import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
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
  white: {
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
  "grey.t03": {
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
  "grey.t05": {
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

function getColors(backgroundVariant, shadowColor, theme) {
  const { contentBackgroundColor, shadowBorderColor } = colorsMap[
    backgroundVariant
  ][shadowColor];

  return {
    contentBackgroundColor: theme.getColor(contentBackgroundColor),
    shadowBorderColor: theme.getColor(shadowBorderColor),
  };
}

const SHADOW_SIZES = ["tiny", "small", "medium", "large"];
const SHADOW_DIRECTIONS = ["left", "right"];
const SHADOW_COLORS = ["grey", "blue", "pink", "purple"];

const DEFAULT_PROPS = {
  shadowSize: "large",
  shadowDirection: "right",
  shadowColor: "grey",
};

ShadowContainer.SHADOW_SIZES = SHADOW_SIZES;
ShadowContainer.SHADOW_DIRECTIONS = SHADOW_DIRECTIONS;
ShadowContainer.SHADOW_COLORS = SHADOW_COLORS;
ShadowContainer.DEFAULT_PROPS = DEFAULT_PROPS;

function ShadowContainer(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      shadowSize: (shadowSize) => SHADOW_SIZES.includes(shadowSize),
      shadowDirection: (shadowDirection) =>
        SHADOW_DIRECTIONS.includes(shadowDirection),
      shadowColor: (shadowColor) => SHADOW_COLORS.includes(shadowColor),
    }
  );
  const { shadowDirection, shadowColor, children, testId } = mergedProps;
  const theme = useTheme();
  const { background } = useBackground();
  const backgroundVariant = background
    ? ["white", "grey.t03"].includes(background)
      ? background
      : "grey.t05"
    : "white";
  const { contentBackgroundColor, shadowBorderColor } = getColors(
    backgroundVariant,
    shadowColor,
    theme
  );
  const contentHasBorder = shadowColor === "grey";
  const contentBorderWidth = contentHasBorder
    ? parseInt(theme.borderWidths[0], 10)
    : 0;
  const contentBorderColor = theme.colors.grey.t10;
  const shadowSizePx = `calc(100% + ${2 * contentBorderWidth}px)`;
  const wrapperResponsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    shadowSize: ({ shadowSize }) => {
      const shadowOffset = sizesMap[shadowSize].offset;

      return {
        padding:
          shadowDirection === "left"
            ? `0 0 ${shadowOffset}px ${shadowOffset}px`
            : `0 ${shadowOffset}px ${shadowOffset}px 0`,
      };
    },
  });
  const contentResponsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    padding: responsivePadding,
    shadowSize: ({ shadowSize }) => {
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
        const shadowOffset = sizesMap[shadowSize].offset;
        const shadowBorderWidth = sizesMap[shadowSize].borderWidth;

        return {
          top: shadowOffset - contentBorderWidth,
          left:
            (shadowDirection === "left" ? -shadowOffset : shadowOffset) -
            contentBorderWidth,
          border: `${shadowBorderWidth}px solid ${shadowBorderColor}`,
        };
      },
    }
  );

  return (
    <div
      css={{
        boxSizing: "border-box",
        ...wrapperResponsiveCSS,
      }}
      data-testid={testId}
    >
      <div
        css={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...contentResponsiveCSS,
          backgroundColor: contentBackgroundColor,
          ...(contentHasBorder && {
            border: `${contentBorderWidth}px solid ${contentBorderColor}`,
          }),
          position: "relative",
          transformStyle: "preserve-3d", // See: https://stackoverflow.com/a/51432213/247243
          "::before": {
            transform: "translateZ(-1px)", // See: https://stackoverflow.com/a/51432213/247243
            boxSizing: "border-box",
            display: "block",
            content: '""',
            position: "absolute",
            width: shadowSizePx,
            height: shadowSizePx,
            ...contentBeforeResponsiveCSS,
          },
        }}
      >
        {children}
      </div>
    </div>
  );
}

ShadowContainer.propTypes = {
  ...responsiveMarginType,
  ...responsivePaddingType,
  ...responsivePropType("shadowSize", PropTypes.oneOf(SHADOW_SIZES)),
  shadowDirection: PropTypes.oneOf(SHADOW_DIRECTIONS),
  shadowColor: PropTypes.oneOf(SHADOW_COLORS),
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default ShadowContainer;
