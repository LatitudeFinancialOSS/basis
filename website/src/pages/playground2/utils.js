export const MIN_SCREEN_WIDTH = 300;
export const MAX_SCREEN_WIDTH = 2048;

export function isScreenNameValid(name, screenId, screens) {
  const trimmedName = name.trim();

  if (trimmedName === "") {
    return false;
  }

  for (let i = 0, len = screens.length; i < len; i++) {
    const screen = screens[i];

    if (screen.id !== screenId && screen.name === trimmedName) {
      return false;
    }
  }

  return true;
}

const INTEGER_REGEX = /^\d*$/;

export function isScreenWidthValid(width) {
  if (INTEGER_REGEX.test(width) === false) {
    return false;
  }

  const widthInt = Number(width);

  return widthInt >= MIN_SCREEN_WIDTH && widthInt <= MAX_SCREEN_WIDTH;
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function updateItemWithId(arr, id, update) {
  const index = arr.findIndex((item) => item.id === id);

  return index === -1
    ? arr
    : replaceItemAtIndex(arr, index, {
        ...arr[index],
        ...update,
      });
}

export function removeItemWithId(arr, id) {
  const index = arr.findIndex((item) => item.id === id);

  return index === -1 ? arr : removeItemAtIndex(arr, index);
}
