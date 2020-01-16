/*
  ESLint complains about:
    obj.hasOwnProperty(key)
  
  See: https://eslint.org/docs/rules/no-prototype-builtins
*/
export function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
