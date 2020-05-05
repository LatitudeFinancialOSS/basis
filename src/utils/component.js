import { notStringOrEmpty } from "./string";
import { DEFAULT_BREAKPOINT } from "./css";

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
    if (notStringOrEmpty(option.label) || notStringOrEmpty(option.value)) {
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
    if (typeof option.data !== "object" || notStringOrEmpty(option.value)) {
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
