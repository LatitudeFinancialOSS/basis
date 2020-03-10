import { notStringOrEmpty } from "./string";

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
    ...filterValidProps(props, validations)
  };
}

export function areOptionsValid(options) {
  var isValid = true;
  options.forEach(option => {
    if (notStringOrEmpty(option.label) || notStringOrEmpty(option.value)) {
      isValid = false;
      return;
    }
  });

  return isValid;
}
