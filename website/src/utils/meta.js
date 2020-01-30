import * as components from "../../../src/components";

function getComponentNames(initialQueue) {
  const queue = initialQueue;
  const result = [];

  while (queue.length > 0) {
    const [componentName, componentFunction] = queue.shift();

    result.push(componentName);

    Object.keys(componentFunction).forEach(key => {
      if (typeof componentFunction[key] === "function") {
        queue.push([`${componentName}.${key}`, componentFunction[key]]);
      }
    });
  }

  return result;
}

export const allComponentNames = getComponentNames(Object.entries(components));
