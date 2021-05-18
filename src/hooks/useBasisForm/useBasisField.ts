import { useCallback, useEffect, useRef, useState } from "react";
import {
  FieldPathValue,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { ComponentNames } from "../../components/componentNames";
import { ValidationError, ValidateFn } from "../../types";
import { nameToValidateMap } from "./nameToValidateMap";
import { nameToDefaultValueMap } from "./nameToDefaultValueMap";
import { rhfErrorConverter } from "./rhfErrorConverter";
interface FieldOptions<
  TFieldValues extends FieldValues,
  Name extends FieldPath<TFieldValues>
> {
  name: Name;
  componentDisplayName?: string;
  componentProps?: Record<string, any>;
  validate?: ValidateFn<FieldPathValue<TFieldValues, Name>>;
  defaultValue?: FieldPathValue<TFieldValues, Name>;
}

export const BASIS_INTERNAL_VALIDATION_KEY = "__internalBasisValidation";

export const useBasisField = <
  TFieldValues extends FieldValues,
  Name extends FieldPath<TFieldValues>
>(
  props: FieldOptions<TFieldValues, Name>
) => {
  const {
    name,
    defaultValue,
    componentProps = {},
    validate: customValidation,
    componentDisplayName = "",
  } = props;
  const { trigger } = useFormContext<TFieldValues>();

  // as any is needed due to: https://github.com/microsoft/TypeScript/issues/35186
  const validate = (customValidation ??
    nameToValidateMap[componentDisplayName as ComponentNames]) as any;

  const internalBasisValidation = (value: any) => {
    // as ValidationError is needed due to: https://github.com/microsoft/TypeScript/issues/35186
    const validationErrors = validate(value, componentProps) as ValidationError;

    return rhfErrorConverter.getRhfError(validationErrors);
  };

  const componentDefaultValue =
    nameToDefaultValueMap[componentDisplayName as ComponentNames];

  const { field, fieldState } = useController({
    name,
    defaultValue: defaultValue ?? componentDefaultValue,
    rules: {
      validate: {
        [BASIS_INTERNAL_VALIDATION_KEY]: internalBasisValidation,
      },
    },
  });

  const [hasBeenInvalid, setHasBeenInvalid] = useState(false);

  useEffect(() => {
    if (fieldState.invalid && !hasBeenInvalid) {
      setHasBeenInvalid(true);
    }
  }, [fieldState.invalid, hasBeenInvalid]);

  // functions in ref to avoid recreating event listeners when these change
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
    functionRefs.current.fieldOnChange = field.onChange;
    functionRefs.current.fieldOnBlur = field.onBlur;
  });

  const onChange = useCallback(
    (...args) => {
      functionRefs.current.fieldOnChange(...args);
      functionRefs.current.componentOnChange?.(...args);
      if (hasBeenInvalid) {
        functionRefs.current.trigger(name);
      }
    },
    [name, hasBeenInvalid]
  );

  const onBlur = useCallback(
    (...args) => {
      functionRefs.current.componentOnBlur?.(...args);
      functionRefs.current.fieldOnBlur();

      // if the onBlur is called with valid fieldState
      // then stop triggering validation checks on every change
      if (!fieldState.invalid) {
        setHasBeenInvalid(false);
      }
    },
    [fieldState.invalid]
  );

  return {
    ...field,
    onBlur,
    onChange,
    error: rhfErrorConverter.getBasisError(fieldState.error) ?? undefined,
  };
};
