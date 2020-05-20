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
        d="M157.39425,25.1795 C157.39425,27.79625 156.3495,29.86475 153.3255,29.86475 C150.30075,29.86475 149.25675,27.79625 149.25675,25.1795 L149.25675,17.2265 L147.18075,17.2265 L147.18075,25.48925 C147.18075,28.2845 148.2975,31.925 153.3255,31.925 C158.3535,31.925 159.471,28.2845 159.471,25.48925 L159.471,17.2265 L157.39425,17.2265 L157.39425,25.1795 Z M180.9465,24.4925 C180.9465,21.15875 178.42575,19.301 175.25325,19.301 L171.495,19.301 L171.495,29.684 L175.25325,29.684 C178.42575,29.684 180.9465,27.827 180.9465,24.4925 L180.9465,24.4925 Z M183.051,24.4925 C183.05025,29.15975 179.62425,31.75925 175.398,31.75925 L169.41825,31.75925 L169.41825,17.2265 L175.398,17.2265 C179.62425,17.2265 183.05025,19.826 183.051,24.4925 L183.051,24.4925 Z M82.40325,25.52975 L79.6725,19.301 L76.9425,25.52975 L82.40325,25.52975 Z M80.71125,17.2265 L87.31275,31.75925 L85.13325,31.75925 L83.313,27.605 L76.03425,27.605 L74.21325,31.75925 L72.075,31.75925 L78.65625,17.2265 L80.71125,17.2265 Z M93.06375,19.301 L98.0355,19.301 L98.0355,31.75925 L100.11225,31.75925 L100.11225,19.301 L105.08475,19.301 L105.08475,17.2265 L93.06375,17.2265 L93.06375,19.301 Z M125.8725,19.301 L130.845,19.301 L130.845,31.75925 L132.92025,31.75925 L132.92025,19.301 L137.89275,19.301 L137.89275,17.2265 L125.8725,17.2265 L125.8725,19.301 Z M114.441,31.75925 L116.517,31.75925 L116.517,17.2265 L114.441,17.2265 L114.441,31.75925 Z M202.69725,19.301 L202.69725,17.2265 L192.15075,17.2265 L192.15075,31.75925 L202.69725,31.75925 L202.69725,29.684 L194.22675,29.684 L194.22675,25.52975 L201.51375,25.52975 L201.51375,23.45525 L194.22675,23.45525 L194.22675,19.301 L202.69725,19.301 Z M56.169,17.2265 L54.09375,17.2265 L54.09375,31.75925 L64.64025,31.75925 L64.64025,29.684 L56.169,29.684 L56.169,17.2265 Z M5.775,8 L1.84741111e-13,8 L1.84741111e-13,41 L33,41 L33,35.225 L5.775,35.225 L5.775,8 Z M21.03675,13.77425 C22.632,13.77425 23.92425,12.482 23.92425,10.88675 C23.92425,9.29225 22.632,8 21.03675,8 C19.44225,8 18.15,9.29225 18.15,10.88675 C18.15,12.482 19.44225,13.77425 21.03675,13.77425 L21.03675,13.77425 Z M30.1125,26.15 C28.518,26.15 27.225,27.443 27.225,29.03825 C27.225,30.63275 28.518,31.925 30.1125,31.925 C31.707,31.925 33,30.63275 33,29.03825 C33,27.443 31.707,26.15 30.1125,26.15 L30.1125,26.15 Z M11.9625,13.77425 C13.557,13.77425 14.84925,12.482 14.84925,10.88675 C14.84925,9.29225 13.557,8 11.9625,8 C10.36725,8 9.07425,9.29225 9.07425,10.88675 C9.07425,12.482 10.36725,13.77425 11.9625,13.77425 L11.9625,13.77425 Z M30.1125,17.075 C28.518,17.075 27.225,18.368 27.225,19.9625 C27.225,21.557 28.518,22.85 30.1125,22.85 C31.707,22.85 33,21.557 33,19.9625 C33,18.368 31.707,17.075 30.1125,17.075 L30.1125,17.075 Z M33,10.88675 C33,12.482 31.707,13.77425 30.1125,13.77425 C28.518,13.77425 27.225,12.482 27.225,10.88675 C27.225,9.29225 28.518,8 30.1125,8 C31.707,8 33,9.29225 33,10.88675 L33,10.88675 Z"
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
