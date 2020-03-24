import useTheme from "./useTheme";
import { getPropName } from "./useResponsiveProp";
import { hasOwnProperty } from "../utils/core";

function useAllResponsiveProps(props, propName) {
  const theme = useTheme();
  const breakpoints = Object.keys(theme.breakpoints);
  const result = {};

  if (hasOwnProperty(props, propName)) {
    result[propName] = props[propName];
  }

  breakpoints.forEach((bp) => {
    const prop = getPropName(propName, bp);

    if (hasOwnProperty(props, prop)) {
      result[prop] = props[prop];
    }
  });

  return result;
}

export default useAllResponsiveProps;
