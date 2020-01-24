export function withConstantsFrom(originalComponent, exportedComponent) {
  const { propTypes, ...constants } = originalComponent;

  for (const key in constants) {
    exportedComponent[key] = constants[key];
  }

  return exportedComponent;
}
