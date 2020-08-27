export function range(n) {
  return Array.from({ length: n }, (_, i) => i);
}

export function formatArray(arr) {
  return `[${arr.map((item) => `"${item}"`).join(", ")}]`;
}
