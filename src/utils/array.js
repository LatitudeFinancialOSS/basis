export function formatArray(arr) {
  return `[${arr.map((item) => `"${item}"`).join(", ")}]`;
}
