export const ERROR_STRINGS = {
  FIELD: {
    NAME_REQUIRED: "Field components require a name",
    NO_INITIAL_VALUE:
      "Field components require a corresponding initial value set on the Form component",
    MISSING_FORM: "Field components need to be used inside a Form component",
    NO_OPTIONS: component =>
      `${component} requires options prop of form options={[{label: '', value: ''}]}`
  }
};
