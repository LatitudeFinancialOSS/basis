import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useBackground, { mapResponsiveValues } from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveHeightType,
  responsiveMaxWidthType,
} from "../hooks/useResponsiveProp";
import { responsiveSize } from "../utils/css";
import { mergeProps } from "../utils/component";

const COLORS = ["primary.blue.t100", "black", "white"];

const DEFAULT_PROPS = {
  color: "primary.blue.t100",
  height: "40px",
};

function LatitudeLogo(props) {
  const theme = useTheme();
  const { bgMap } = useBackground();
  const colorMap = mapResponsiveValues(
    bgMap,
    (backgroundColor) => {
      return (
        props.color ??
        (backgroundColor === "primary.blue.t100"
          ? "white"
          : "primary.blue.t100")
      );
    },
    theme
  );
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      color: (color) => COLORS.includes(color),
    }
  );
  const { testId } = mergedProps;
  const svgResponsiveCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    height: responsiveSize("height"),
    maxWidth: responsiveSize("maxWidth"),
  });
  const pathResponsiveCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      return {
        fill: theme.getColor(colorMap[bp]),
      };
    },
  });

  return (
    <svg
      css={{
        display: "flex",
        ...svgResponsiveCSS,
      }}
      viewBox="0 0 203 48"
      focusable="false"
      role="img"
      aria-label="Latitude logo"
      data-testid={testId}
    >
      <path
        css={pathResponsiveCSS}
        d="M142.6 91.2C142.6 98 137 103.6 130.2 103.6C123.4 103.6 117.8 98 117.8 91.2C117.8 84.4 123.4 78.8 130.2 78.8C137 78.8 142.6 84.4 142.6 91.2ZM130.2 0.899994C123.4 0.899994 117.8 6.5 117.8 13.3C117.8 20.1 123.4 25.7 130.2 25.7C137 25.7 142.6 20.1 142.6 13.3C142.6 6.4 137 0.899994 130.2 0.899994ZM130.2 39.8C123.4 39.8 117.8 45.4 117.8 52.2C117.8 59 123.4 64.6 130.2 64.6C137 64.6 142.6 59 142.6 52.2C142.6 45.4 137 39.8 130.2 39.8ZM25.7 0.899994H0.900024V142.6H142.6V117.8H25.7V0.899994ZM91.2 25.7C98 25.7 103.6 20.1 103.6 13.3C103.6 6.5 98 0.899994 91.2 0.899994C84.4 0.899994 78.8 6.5 78.8 13.3C78.8 20.1 84.4 25.7 91.2 25.7ZM52.2 25.7C59 25.7 64.6 20.1 64.6 13.3C64.6 6.5 59 0.899994 52.2 0.899994C45.4 0.899994 39.8 6.5 39.8 13.3C39.8 20.1 45.4 25.7 52.2 25.7ZM212 39.8H199.2V103.6H245.5V90.8H212V39.8ZM636 71.7C636 83.9 630.5 91.3 625.9 95.3C619.7 100.8 611.7 103.6 602.2 103.6H577.5V39.8H602.2C611.7 39.8 619.7 42.6 625.9 48.1C630.5 52.2 636 59.6 636 71.7ZM623.3 71.7C623.3 65.7 621.4 61 617.5 57.6C613.6 54.2 608.6 52.5 602.2 52.5H590.3V90.8H602.2C608.6 90.8 613.7 89.1 617.5 85.7C621.3 82.4 623.3 77.7 623.3 71.7ZM699.9 52.6V39.8H651.7V103.6H699.9V90.8H664.5V77.8H692.1V65.6H664.5V52.6H699.9ZM297 39.8L325.9 103.6H311.9L306.1 90.8H276.1L270.3 103.6H256.3L285.2 39.8H297ZM300.3 78.1L291.1 57.7L281.9 78.1H300.3ZM545.9 75.8C545.9 81.9 544.6 86.4 542.1 89.1C540.7 90.7 538 92.7 531.5 92.7C525 92.7 522.3 90.6 520.9 89.1C518.4 86.4 517.1 81.9 517.1 75.8V39.9H504.3V75.8C504.3 85.3 506.7 92.6 511.4 97.8C516.2 103 522.8 105.5 531.4 105.5C540 105.5 546.6 102.9 551.4 97.8C556.2 92.6 558.5 85.3 558.5 75.8V39.9H545.7V75.8H545.9ZM328.5 52.6H348.6V103.6H361.4V52.6H381.8V39.8H328.5V52.6ZM432.2 52.6H452.3V103.6H465.1V52.6H485.5V39.8H432.2V52.6ZM400.6 103.6H413.4V39.8H400.6V103.6Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

LatitudeLogo.propTypes = {
  color: PropTypes.oneOf(COLORS),
  ...responsiveHeightType,
  ...responsiveMaxWidthType,
  testId: PropTypes.string,
};

export default LatitudeLogo;
