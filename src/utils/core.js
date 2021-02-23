import { nanoid } from "nanoid";

export function isObjectEmpty(obj) {
  for (const _key in obj) {
    return false;
  }

  return true;
}

/*
  ESLint complains about:
    obj.hasOwnProperty(key)
  
  See: https://eslint.org/docs/rules/no-prototype-builtins
*/
export function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export const getUniqueId = nanoid;
