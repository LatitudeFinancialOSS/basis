import { isObjectEmpty } from "./core";

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
      [keys[i]]: result,
    };
  }

  return {
    ...obj,
    [keys[0]]: result,
  };
}

export function deletePath(obj, path, { deleteEmptyObjects = false } = {}) {
  const keys = path.split(".");
  const pathsArr = [obj];
  let subPath = "";
  let value = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];

    subPath = `${subPath}${i === 0 ? "" : "."}${key}`;
    value = value[key];

    if (typeof value !== "object") {
      return obj;
    }

    pathsArr.push(value);
  }

  let result = { ...pathsArr[pathsArr.length - 1] };

  delete result[keys[keys.length - 1]];

  for (let i = pathsArr.length - 2; i >= 0; i--) {
    const key = keys[i];
    const shouldDeleteKey =
      deleteEmptyObjects === true ||
      (Array.isArray(deleteEmptyObjects) &&
        deleteEmptyObjects.includes(key) === false);

    if (shouldDeleteKey && isObjectEmpty(result)) {
      result = {
        ...pathsArr[i],
      };

      delete result[key];
    } else {
      result = {
        ...pathsArr[i],
        [key]: result,
      };
    }
  }

  return result;
}
