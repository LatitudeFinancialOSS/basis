import { useCallback, useEffect, useRef, useState } from "react";
import { FieldPathValue, FieldPath, FieldValues, useController, useFormContext } from "react-hook-form";
import { ComponentName as ComponentName } from "../../components/ComponentNames";
import { ValidationError, Validator } from "../../types";
import { nameToValidatorMap } from "./nameToValidatorMap";
import { nameToDefaultValueMap } from "./nameToDefaultValueMap";


interface FieldOptions<
  TFieldValues extends FieldValues,
  Name extends FieldPath<TFieldValues>,
  > {
  name: Name;
  componentDisplayName?: string;
  componentProps?: Record<string, any>;
  validate?: Validator<TFieldValues, Name>;
  defaultValue?: FieldPathValue<TFieldValues, Name>;
}

export const useBasisField = <
  TFieldValues extends FieldValues,
  Name extends FieldPath<TFieldValues>,
  >(props: FieldOptions<TFieldValues, Name>) => {
  const {
    name,
    defaultValue,
    componentProps = {},
    validate: customValidation,
    componentDisplayName = "",
  } = props;
  const { trigger } = useFormContext<TFieldValues>();

  // as any is needed due to: https://github.com/microsoft/TypeScript/issues/35186
  const validate = (
    customValidation ?? nameToValidatorMap[componentDisplayName as ComponentName]
  ) as any;

  const [basisErrors, setBasisErrors] = useState<ValidationError>(null)

  const triggerBasisValidation = (value: any) => {
    // as ValidationError is needed due to: https://github.com/microsoft/TypeScript/issues/35186
    const validationErrors = validate(value, componentProps) as ValidationError;

    setBasisErrors(validationErrors);

    // this return is used to tell Rhf that there is an error (see rules in useController)
    // this avoids it calling onSubmit callback and focuses the first invalid field
    return validationErrors === null ? true : false;
  };

  const componentDefaultValue =  nameToDefaultValueMap[componentDisplayName as ComponentName];

  const { field, fieldState } = useController({
    name,
    defaultValue: defaultValue ?? componentDefaultValue,
    rules: {
      validate: {
        __InternalBasisValidation: triggerBasisValidation,
      }
    }
  });

  const [hasBeenInvalid, setHasBeenInvalid] = useState(false);

  useEffect(() => {
    if (fieldState.invalid && !hasBeenInvalid) {
      setHasBeenInvalid(true);
    }
  }, [fieldState.invalid, hasBeenInvalid])

  // trigger in ref to avoid recreating event listeners when these change
  const functionRefs = useRef({
    trigger,
    componentOnChange: componentProps.onChange,
    componentOnBlur: componentProps.onBlur,
    fieldOnChange: field.onChange,
    fieldOnBlur: field.onBlur,
  });

  useEffect(() => {
    functionRefs.current.trigger = trigger;
    functionRefs.current.componentOnChange = componentProps.onChange;
    functionRefs.current.componentOnBlur = componentProps.onBlur;
    functionRefs.current.fieldOnChange =  field.onChange;
    functionRefs.current.fieldOnBlur =  field.onBlur;
  });

  const onChange = useCallback((...args) => {
    functionRefs.current.fieldOnChange(...args);
    functionRefs.current.componentOnChange?.(...args);
    if (hasBeenInvalid) {
      functionRefs.current.trigger(name);
    }
  }, [name, hasBeenInvalid]);

  const onBlur = useCallback((...args) => {
    functionRefs.current.componentOnBlur?.(...args);
    functionRefs.current.fieldOnBlur?.();

    // if the onBlur is called with valid fieldState
    // then stop triggering validation checks on every change
    if (!fieldState.invalid) {
      setHasBeenInvalid(false);
    }
  }, [fieldState.invalid]);

  return {
    ...field,
    onBlur,
    onChange,
    error: basisErrors ?? undefined,
  };
}

