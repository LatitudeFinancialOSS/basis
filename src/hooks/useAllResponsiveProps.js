import useTheme from "./useTheme";
import { getPropName } from "./useResponsiveProp";

function useAllResponsiveProps(props, propName) {
  const theme = useTheme();
  const breakpoints = Object.keys(theme.breakpoints);
  const result = {};

  /*
    ESLint complains about:
      props.hasOwnProperty[prop]
    
    See: https://eslint.org/docs/rules/no-prototype-builtins
  */
  if (Object.prototype.hasOwnProperty.call(props, propName)) {
    result[propName] = props[propName];
  }

  breakpoints.forEach(bp => {
    const prop = getPropName(propName, bp);

    /*
        ESLint complains about:
          props.hasOwnProperty[prop]
        
        See: https://eslint.org/docs/rules/no-prototype-builtins
      */
    if (Object.prototype.hasOwnProperty.call(props, prop)) {
      result[prop] = props[prop];
    }
  });

  return result;
}

export default useAllResponsiveProps;
