function getPath(obj, path) {
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
