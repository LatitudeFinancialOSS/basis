export function getPath(obj, path) {
  let result = obj;
  const keys = path.split(".");

  for (let i = 0; i < keys.length; i++) {
    result = result[keys[i]];

    if (typeof result === "undefined") {
      return;
    }
  }

  return result;
}

export function setPath(obj, path, value) {
  const keys = path.split(".");
  let result = value;

  for (let i = keys.length - 1; i > 0; i--) {
    const subPath = keys.slice(0, i).join(".");
    const value = getPath(obj, subPath);
    const valueType = typeof value;

    if (valueType !== "object" && valueType !== "undefined") {
      throw new Error(
        `Values along the path "${path}" must be objects. Found "${valueType}" at path "${subPath}".`
      );
    }

    result = {
      ...value,
      [keys[i]]: result
    };
  }

  return {
    ...obj,
    [keys[0]]: result
  };
}

export function deletePath(obj, path) {
  const lastDotIndex = path.lastIndexOf(".");

  if (lastDotIndex === -1) {
    const result = { ...obj };

    delete result[path];

    return result;
  }

  const pathExceptLast = path.substring(0, lastDotIndex);
  const lastKey = path.substring(lastDotIndex + 1);
  const objToDeleteFrom = getPath(obj, pathExceptLast);

  if (typeof objToDeleteFrom === "undefined") {
    return obj;
  }

  const objWithDeletedKey = { ...objToDeleteFrom };

  delete objWithDeletedKey[lastKey];

  return setPath(obj, pathExceptLast, objWithDeletedKey);
}
