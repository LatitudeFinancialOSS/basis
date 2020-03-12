export function pluralize(count, word) {
  return count === 1 ? `1 ${word}` : `${count} ${word}s`;
}

export function notStringOrEmpty(string) {
  return typeof string !== "string" || string.trim() === "";
}
