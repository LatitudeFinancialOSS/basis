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
