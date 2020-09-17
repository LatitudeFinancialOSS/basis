import React from "react";
import PropTypes from "prop-types";
import { keyframes } from "@emotion/core";
import { responsivePropType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";

const SIZES = ["small", "medium", "large"];
const COLORS = ["highlight.blue.t100", "white", "black"];

const DEFAULT_PROPS = {
  size: "small",
  color: "highlight.blue.t100",
};

const circleRadiusMap = {
  small: 4,
  medium: 8,
  large: 12,
};

LoadingIcon.SIZES = SIZES;
LoadingIcon.COLORS = COLORS;
LoadingIcon.DEFAULT_PROPS = DEFAULT_PROPS;

function LoadingIcon(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { size, testId } = props;
  const radius = circleRadiusMap[size] ?? 4;
  const stepPx = `${3 * radius}px`;
  const frames = 12; // 3 circles * 4 steps each
  const percantagePerFrame = 100 / frames;
  const duration = 3; // sec

  /*
    circle diameter + space between circles + circle diameter
      (2 * radius)  +        radius         +   (2 * radius)
  */
  const svgSize = 5 * radius;

  const start = {
    transform: `translate3d(0, 0, 0)`,
  };
  const right = {
    transform: `translate3d(${stepPx}, 0, 0)`,
  };
  const bottom = {
    transform: `translate3d(0, ${stepPx}, 0)`,
  };
  const left = {
    transform: `translate3d(-${stepPx}, 0, 0)`,
  };
  const up = {
    transform: `translate3d(0, -${stepPx}, 0)`,
  };
  const rightAndBottom = {
    transform: `translate3d(${stepPx}, ${stepPx}, 0)`,
  };
  const upAndRight = {
    transform: `translate3d(${stepPx}, -${stepPx}, 0)`,
  };
  const leftAndUp = {
    transform: `translate3d(-${stepPx}, -${stepPx}, 0)`,
  };

  const getKeyframes = (steps) =>
    keyframes(
      steps.reduce((acc, step, index) => {
        acc[`${index * percantagePerFrame}%`] = step;
        return acc;
      }, {})
    );

  const svgCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: ({ color }, theme) => {
      return {
        fill: theme.getColor(color) ?? theme.colors.black,
      };
    },
  });
  const circleCSS = [
    getKeyframes([
      start,
      right,
      right,
      right,
      rightAndBottom,
      rightAndBottom,
      rightAndBottom,
      bottom,
      bottom,
      bottom,
      start,
      start,
    ]),
    getKeyframes([
      start,
      start,
      up,
      up,
      up,
      upAndRight,
      upAndRight,
      upAndRight,
      right,
      right,
      right,
      start,
    ]),
    getKeyframes([
      start,
      start,
      start,
      left,
      left,
      left,
      leftAndUp,
      leftAndUp,
      leftAndUp,
      up,
      up,
      up,
    ]),
  ].map((animation) => ({
    animation: `${animation} ${duration}s ease infinite`,
  }));

  return (
    <svg
      css={svgCSS}
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      focusable="false"
      role="img"
      aria-label="Loading icon"
      data-testid={testId}
    >
      <circle cx={radius} cy={radius} r={radius} css={circleCSS[0]} />
      <circle cx={radius} cy={4 * radius} r={radius} css={circleCSS[1]} />
      <circle cx={4 * radius} cy={4 * radius} r={radius} css={circleCSS[2]} />
    </svg>
  );
}

LoadingIcon.propTypes = {
  ...responsivePropType("color", PropTypes.oneOf(COLORS)),
  size: PropTypes.oneOf(SIZES),
  testId: PropTypes.string,
};

export default LoadingIcon;
