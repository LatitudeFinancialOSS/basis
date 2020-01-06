function useValidation({ props, extraData }) {
  const { validation, data, onChange } = props;

  return () => {
    const errors = validation.reduce((acc, item) => {
      const shouldValidate = item.condition
        ? item.condition(props, { previousErrors: acc })
        : true;
      const error = shouldValidate
        ? item.validator(data.value, extraData)
        : null;

      if (error) {
        acc.push(error);
      }

      return acc;
    }, []);

    onChange({
      ...data,
      errors: errors.length === 0 ? null : errors
    });
  };
}

export default useValidation;
