import PropTypes from "prop-types";
import useTheme from "./useTheme";
import useBreakpoint from "./useBreakpoint";
import defaultTheme from "../themes/default";
import { DEFAULT_BREAKPOINT } from "../utils/css";
import { hasOwnProperty } from "../utils/core";

export function getPropName(name, breakpoint) {
  return `${name}-${breakpoint}`;
}

export function responsivePropType(propName, propType) {
  const result = {
    [propName]: propType,
  };

  /*
    Note: 
    Here, as opposed to useResponsiveProp, we use defaultTheme.breakpoints, not theme.breakpoints.
    Ideally, we want to use theme.breakpoints, but the theme is not accessible when
    responsivePropType is called.
  */
  for (const bp in defaultTheme.breakpoints) {
    const prop = getPropName(propName, bp);

    result[prop] = propType;
  }

  return result;
}

export const responsiveMarginType = responsivePropType(
  "margin",
  PropTypes.oneOfType([PropTypes.number, PropTypes.string])
);

export const responsivePaddingType = responsivePropType(
  "padding",
  PropTypes.oneOfType([PropTypes.number, PropTypes.string])
);

const SIZE_PX_REGEX = /^\s*(\d+)(px)?\s*$/;

const responsiveSizeType = (prop) =>
  responsivePropType(prop, (props, propName, componentName) => {
    if (!hasOwnProperty(props, propName)) {
      return;
    }

    if (typeof props[propName] !== "string") {
      return new Error(
        `${componentName}: ${propName} is expected to be a string. Found: ${typeof props[
          propName
        ]}.`
      );
    }

    if (props[propName].trim() === "") {
      return new Error(`${componentName}: ${propName} can't be empty.`);
    }

    if (props[propName].trim()[0] === "-") {
      return new Error(`${componentName}: ${propName} can't be negative.`);
    }

    const match = props[propName].match(SIZE_PX_REGEX);

    if (match === null) {
      return;
    }

    const intValue = parseInt(match[1], 10);
    const px = match[2] ?? "";

    if (intValue % 4 !== 0) {
      const n = Math.floor(intValue / 4);

      return new Error(
        `${componentName}: ${propName}="${
          props[propName]
        }". Please use a multiple of 4${px} (e.g. "${n * 4}${px}" or "${
          (n + 1) * 4
        }${px}").`
      );
    }
  });

export const responsiveWidthType = responsiveSizeType("width");
export const responsiveHeightType = responsiveSizeType("height");
export const responsiveMaxWidthType = responsiveSizeType("maxWidth");
export const responsiveMaxHeightType = responsiveSizeType("maxHeight");

function useResponsiveProp(props, propName) {
  const theme = useTheme();
  const breakpoint = useBreakpoint();
  let result = props[propName] || null;

  if (breakpoint === null || breakpoint === DEFAULT_BREAKPOINT) {
    return result;
  }

  const breakpoints = Object.keys(theme.breakpoints);

  for (let i = 0, len = breakpoints.length; i < len; i++) {
    const bp = breakpoints[i];
    const prop = getPropName(propName, bp);

    if (hasOwnProperty(props, prop)) {
      result = props[prop];
    }

    if (bp === breakpoint) {
      break;
    }
  }

  return result;
}

export default useResponsiveProp;
