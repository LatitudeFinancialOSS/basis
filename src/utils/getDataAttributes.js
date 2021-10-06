export const getDataAttributes = (data) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [`data-${key}`, value])
  );
