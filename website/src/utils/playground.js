export function getComponentsAtPoint({ x, y }, componentsLocation) {
  const result = {};

  for (const testId in componentsLocation) {
    const { left, top, right, bottom } = componentsLocation[testId];

    if (x >= left && y >= top && x <= right && y <= bottom) {
      result[testId] = componentsLocation[testId];
    }
  }

  return result;
}
