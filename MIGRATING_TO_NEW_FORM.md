# Migration to New Form

## Background

The form has been updated to add TypeScript supporting by wrapping [`react-hook-form`](https://react-hook-form.com).

This is a non breaking change as the previous implementation of Form is still supported for the foreseable future. The new pattern is opt in see Form section below.

**NOTE**: It is strongly recommended to go through react hook form docs and familiarize with patterns using the doc.

## Form

### Using new form

To use the new form pattern, provide the `Form` component with `methods=` prop, which expects the return value from `useBasisForm` hook (see below).

```jsx
import { useBasisForm, Form } from "basis";

const App = () => {
  const { methods, ...other } = useBasisForm();

  return (
    <Form methods={methods} onSubmit={console.log}>
      {/* Implementation of form*/}
    </Form>
  );
};
```

### Default values behaviour

The new form no longer needs `initialValues`. It will default the components provided to the relavent empty state. If non empty state is required, they must be passed into `useBasisForm`.

_Note: this will only defalut the feilds provided leaving all others empty._

```jsx
import { useBasisForm, Form } from "basis";

const App = () => {
  const { methods, ...other } = useBasisForm({
    defaultValues: {
      field1: "non-empty",
    },
  });
  /* rest of form */
};
```

### Using with TypeScript

To use the Form with TypeScript provide the types expected by the return value into the `useBasisForm<Types>` generic.

```tsx
import { useBasisForm, Form } from "basis";

interface FormState {
  field1: string;
  field2: string;
  fieldDate: {
    day: string;
    month: string;
    year: string;
  };
}

const App = () => {
  const { methods, ...other } = useBasisForm<FormState>();

  return (
    <Form methods={methods} onSubmit={console.log}>
      {/* Implementation of form*/}
    </Form>
  );
};
```

### `onSubmit` changes

onSubmit will only be called with values and will only be called when a successful submission takes place. i.e. after all user validation has passed.

## Field

A new `Field` component has been added as a return value from `useBasisForm`. This component acts as a wrapper for other Form components handling their validation and Form state.

_Note: defaultValue can also be defined on Field_

A basic Form would look like the following:

```jsx
import { useBasisForm, Form, Input, DateInput } from "basis";

const App = () => {
  const { methods, Field } = useBasisForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field name="firstName" label="First name" as={Input} />
      <Field name="lastName" label="Last name" as={Input} />
      <Field name="birthDay" label="Birth day" as={DateInput} />
    </Form>
  );
};
```

### Custom validation functions

Custom validation functions will no longer work in the `<Field />`, validation functions no longer provide `isEmpty` in the callback argument. Instead all component props will be provided as part of the second argument.

```jsx
import { useBasisForm, Form, Input } from "basis";

const App = () => {
  const { methods, Field } = useBasisForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field
        name="firstName"
        label="First name"
        as={Input}
        validate={(value, inputProps) => (value === "wrong" ? "Error" : null)}
      />
    </Form>
  );
};
```

The default validation functions provided by `Component.DEFAULT_PROPS.validate` are incompatible with the new Form. Instead the default validation functions are individually exported from within basis.

```jsx
import { useBasisForm, Form, Input, validateInput } from "basis";

const App = () => {
  const { methods, Field } = useBasisForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field
        name="email"
        label="Email"
        as={Input}
        validate={(value, inputProps) => {
          const error = validateInput(value, inputProps);
          if (error) {
            return error;
          }

          if (!isValidEmail(value)) {
            return "Require valid email";
          }

          return null;
        }}
      />
    </Form>
  );
};
```

The validation prop will no longer accept boolean to disable the default validation. If no validation is required then the validation function will need to be provided with a `null` return.

```jsx
import { useBasisForm, Form, Input } from "basis";

const App = () => {
  const { methods, Field } = useBasisForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Field
        name="firstName"
        label="First name"
        as={Input}
        validate={() => null}
      />
    </Form>
  );
};
```

For TypeScript consumers the validation functions will need to be typed with `ValidationFunction` to provide the correct types for the props.

```tsx
import { Input, validateInput, ValidationFunction } from 'basis'

// value will automatically get type of string
// props will automatically get type of InputProps
const validateEmail: ValidationFunction<typeof Input> = (value, props) => {
  const errors = validateInput(value, props);

  if (errors) {
    return errors;
  }

  if (!isValidEmail(value)) {
    return "Invalid email".
  }

  return null;
}
```

## Input

Has the following changes:

- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on `<input />` component instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onBlur`, `onFocus` and `ref` props.
- No longer accepts `name` and `validate`, these are now props of `Field` component

## Select

Has the following changes:

- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on `<select />` component instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onBlur`, `onFocus` and `ref` props.
- `onChange` is no longer called with option, instead is called with input change event.
- No longer accepts `name` and `validate`, these are now props of `Field` component

## DatePicker -> DateInput

Has the following changes:

- Has been renamed to DateInput
- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on inner `<div />` with `aria` labels component instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onBlur`, `onFocus`, `onChange` and `ref` props.
- No longer accepts `name` and `validate`, these are now props of `Field` component

## RadioGroup

Has the following changes:

- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on `<div role="radiogroup" />` component instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onBlur`, `onFocus` and `ref` props.
- No longer accepts `name` and `validate`, these are now props of `Field` component

## Textarea

Has the following changes:

- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on `<textarea />` component instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onBlur`, `onFocus` and `ref` props.
- No longer accepts `name` and `validate`, these are now props of `Field` component

## Frequency

Has the following changes:

- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on `<div />` component with `aria` attributes instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onChange`, `onBlur`, `onFocus` and `ref` props.
- No longer accepts `name` and `validate`, these are now props of `Field` component

## Checkbox

Has the following changes:

- When used outside the old Form will not throw an Error. Will instead behave as a dumb component.
- `testId` will be placed on `<input />` instead of the wrapping `<div />` if the `testId` was being used to test children then they may break.
- Now accepts `error`, `value`, `onBlur`, `onFocus` and `ref` props.
- No longer accepts `name` and `validate`, these are now props of `Field` component
- `onChange` no longer called with `{ isChecked: boolean }` instead directly called with `boolean`