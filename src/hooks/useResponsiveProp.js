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
    [propName]: propType
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

export const responsiveHeightType = responsivePropType(
  "height",
  PropTypes.oneOfType([PropTypes.number, PropTypes.string])
);

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
