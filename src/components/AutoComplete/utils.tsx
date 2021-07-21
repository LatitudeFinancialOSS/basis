export const getFieldErrors = (
  error: string | string[] | undefined
): { fieldErrors: string[] | undefined; hasErrors: boolean } => {
  if (error === undefined) {
    return { fieldErrors: undefined, hasErrors: false };
  }

  const fieldErrors = Array.isArray(error) ? error : [error];

  return { fieldErrors, hasErrors: true };
};
