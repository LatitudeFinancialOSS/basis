import { notStringOrEmpty } from "./string";
import { DEFAULT_BREAKPOINT } from "./css";
import { hasOwnProperty } from "./core";

function filterValidProps(props, validations = {}) {
  const result = {};

  for (const propName in props) {
    const validationFn = validations[propName];
    const propValue = props[propName];

    if (validationFn?.(propValue) === false) {
      continue;
    }

    // validationFn doesn't exist or returned true
    result[propName] = propValue;
  }

  return result;
}

export function mergeProps(props, defaultProps, inheritedProps, validations) {
  return {
    ...defaultProps,
    ...filterValidProps(inheritedProps, validations),
    ...filterValidProps(props, validations),
  };
}

export function areOptionsValid(options) {
  if (!Array.isArray(options) || options.length === 0) {
    return false;
  }

  for (const option of options) {
    if (notStringOrEmpty(option.label) || typeof option.value !== "string") {
      return false;
    }
  }

  return true;
}

export function areDropdownOptionsValid(options) {
  if (!Array.isArray(options) || options.length === 0) {
    return false;
  }

  for (const option of options) {
    if (typeof option.data !== "object" || typeof option.value !== "string") {
      return false;
    }
  }

  return true;
}

export function getPropsFromMap(prop, map) {
  const result = {};

  for (const bp in map) {
    const propName = bp === DEFAULT_BREAKPOINT ? prop : `${prop}-${bp}`;

    result[propName] = String(map[bp]);
  }

  return result;
}

export function getResponsivePropMap(props, defaultProps, prop, theme) {
  let lastValue = hasOwnProperty(props, prop)
    ? props[prop]
    : defaultProps[prop];
  const result = {
    [DEFAULT_BREAKPOINT]: lastValue,
  };

  for (const bp in theme.breakpoints) {
    const responsiveProp = `${prop}-${bp}`;

    result[bp] = hasOwnProperty(props, responsiveProp)
      ? props[responsiveProp]
      : lastValue;

    lastValue = result[bp];
  }

  return result;
}

export function mergeResponsivePropMaps(parentMap, childMap, theme) {
  if (!parentMap) {
    return childMap;
  }

  const result = {
    [DEFAULT_BREAKPOINT]:
      childMap[DEFAULT_BREAKPOINT] === "transparent"
        ? parentMap[DEFAULT_BREAKPOINT]
        : childMap[DEFAULT_BREAKPOINT],
  };

  for (const bp in theme.breakpoints) {
    result[bp] = childMap[bp] === "transparent" ? parentMap[bp] : childMap[bp];
  }

  return result;
}
