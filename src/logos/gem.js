import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useBackground, { mapResponsiveValues } from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveHeightType } from "../hooks/useResponsiveProp";
import { responsiveSize } from "../utils/css";
import { mergeProps } from "../utils/component";

const COLORS = ["primary.blue.t100", "black", "white"];

const DEFAULT_PROPS = {
  color: "primary.blue.t100",
  height: "40px",
};

function GemLogo(props) {
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
      viewBox="0 0 113 48"
      focusable="false"
      role="img"
      aria-label="Gem by Latitude logo"
      data-testid={testId}
    >
      <path
        css={pathResponsiveCSS}
        d="M96.1,44.2c0,1-0.4,1.7-1.5,1.7c-1.1,0-1.5-0.8-1.5-1.7v-2.9h-0.8v3    c0,1,0.4,2.4,2.2,2.4c1.8,0,2.2-1.3,2.2-2.4v-3h-0.8V44.2z M104.7,43.9c0-1.2-0.9-1.9-2.1-1.9h-1.4v3.8h1.4    C103.7,45.8,104.7,45.2,104.7,43.9L104.7,43.9z M105.4,43.9c0,1.7-1.3,2.7-2.8,2.7h-2.2v-5.3h2.2    C104.2,41.3,105.4,42.2,105.4,43.9L105.4,43.9z M68.6,44.3l-1-2.3l-1,2.3H68.6z M68,41.3l2.4,5.3h-0.8L69,45.1h-2.7l-0.7,1.5h-0.8    l2.4-5.3H68z M72.5,42h1.8v4.6h0.8V42h1.8v-0.8h-4.4V42z M84.5,42h1.8v4.6h0.8V42h1.8v-0.8h-4.4V42z M80.3,46.6h0.8v-5.3h-0.8    V46.6z M112.6,42v-0.8h-3.9v5.3h3.9v-0.8h-3.1v-1.5h2.7v-0.8h-2.7V42H112.6z M59,41.3h-0.8v5.3h3.9v-0.8H59V41.3z M44.8,45.9    L44.8,45.9h-2v-1.3h2c0.4,0,0.7,0.3,0.7,0.7C45.4,45.7,45.1,45.9,44.8,45.9L44.8,45.9z M42.8,42.7h1.7c0.4,0,0.7,0.3,0.7,0.7    S44.9,44,44.5,44h-1.7V42.7z M45.5,44.2c0.2-0.2,0.3-0.5,0.3-0.9c0-0.7-0.6-1.3-1.3-1.3h-2.4v4.6c0,0,2.6,0,2.7,0    c0.7,0,1.3-0.6,1.3-1.3C46.1,44.8,45.8,44.4,45.5,44.2L45.5,44.2z M50.8,46.8l-0.1,0.2c-0.1,0.3-0.3,0.5-0.5,0.7    c-0.2,0.2-0.5,0.3-0.8,0.3c-0.3,0-0.6-0.1-0.9-0.3l0.3-0.6c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.3,0,0.4-0.1c0.1-0.1,0.2-0.2,0.3-0.4    l0.1-0.1l-1.5-3.5h0.7l1.2,2.7l1.2-2.7h0.7L50.8,46.8z M41.3,17.1c0-3.3,1.1-6,3.4-8.3C47,6.6,49.8,5.4,53,5.4    c2.3,0,4.2,0.5,5.7,1.4l-16,16C41.8,21.4,41.3,19.4,41.3,17.1L41.3,17.1z M106.1,7.5c1.3,1.1,1.3,2.8,1.3,2.8v23.1h5.3V10.7    c0-2.6-0.8-4.8-2.7-6.8c-1.9-2-4.8-3-7.5-3c-2.6,0-6,0.9-8,2.8c0,0-0.1,0.1-0.2,0.2c-0.1-0.1-0.1-0.1-0.2-0.2    c-1.8-1.8-4.5-2.8-7.4-2.8c-2.3,0-5.4,0.7-7.4,2.3c-1.3-1.8-2.8-1.9-3.7-1.9c-1,0-2.3,0.2-3.5,1.4c-2.1,2-3.6,3.9-5.1,10.7l0,0.1    c-1.1,6.9-5.3,11.6-5.6,11.9c-2.4,2.3-5.1,3.4-8.3,3.4c-2.7,0-5-0.7-6.7-2L66.5,6.5L65.1,5C61.4,1.2,57,0,53,0    c-4.7,0-8.8,1.7-12.1,5c-3.3,3.3-5,7.4-5,12.1c0,4.7,1.7,8.8,5,12.1c3.3,3.3,7.4,5,12.1,5c4.9,0,9-1.7,12.2-5    c5.1-5.4,6.6-13.8,6.9-15.4l0,0c0.5-2.6,1.8-6.1,2.9-6.1c0.2,0,0.9,0,0.8,1.9l0,23.9H81V10.7c0-1.3,0.4-2.4,1.3-3.3    c0.8-0.8,2.9-1.3,4.3-1.3c1.2,0,2.8,0.4,3.7,1.3c0.8,0.8,1.3,1.7,1.3,2.7v23.3h5.3V10.6c0-1.3,0.5-2.3,1.3-3.1    c0.8-0.8,2.8-1.3,4.3-1.3C104.7,6.2,106.1,7.5,106.1,7.5L106.1,7.5z M17.1,28.9c-6.5,0-11.7-5.3-11.7-11.7S10.6,5.4,17.1,5.4    s11.7,5.3,11.7,11.7S23.6,28.9,17.1,28.9L17.1,28.9z M28.6,4.3C25.2,1.5,21.4,0,17.1,0C12.4,0,8.3,1.7,5,5c-3.3,3.3-5,7.4-5,12.1    c0,4.7,1.7,8.8,5,12.1c3.3,3.3,7.4,5,12.1,5c4.1,0,7.7-1.3,10.7-3.8c-0.5,1.2-1.4,2.6-2.7,3.9c-2.3,2.3-5,3.4-8.2,3.4    c-3.3,0-6-1.1-8.3-3.4c-0.3-0.3-1.4-1.6-1.4-1.6l-5.3,1.9c0,0,1.9,2.7,2.9,3.6c3.3,3.3,7.4,5,12.1,5c4.7,0,8.8-1.7,12.1-5    c3.1-3.1,4.9-7.7,4.9-12.5V2.6h-5.3V4.3z"
      />
    </svg>
  );
}

GemLogo.propTypes = {
  color: PropTypes.oneOf(COLORS),
  ...responsiveHeightType,
  testId: PropTypes.string,
};

export default GemLogo;
