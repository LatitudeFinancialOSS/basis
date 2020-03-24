import * as components from "../../../src/components";

const COMPONENT_NAME_REGEX = /^[A-Z][a-z]/;

function getComponentNames(initialQueue) {
  const queue = initialQueue;
  const result = [];

  while (queue.length > 0) {
    const [componentName, componentFunction] = queue.shift();

    result.push(componentName);

    Object.keys(componentFunction).forEach((key) => {
      if (
        typeof componentFunction[key] === "function" &&
        /*
          We test against this regex because forwardRef, for example,
          adds a "render" function onto the given component.
        */
        COMPONENT_NAME_REGEX.test(key)
      ) {
        queue.push([`${componentName}.${key}`, componentFunction[key]]);
      }
    });
  }

  return result;
}

export const allComponentNames = getComponentNames(Object.entries(components));
