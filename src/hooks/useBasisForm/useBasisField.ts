import { RefCallback, useCallback, useEffect, useRef, useState } from "react";
import {
  FieldPathValue,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";
import { ComponentNames } from "../../components/componentNames";
import { ValidateFn } from "../../types";
import { nameToValidateMap } from "./nameToValidateMap";
import { nameToGetDefaultValueMap } from "./nameToDefaultValueMap";
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
  options: FieldOptions<TFieldValues, Name>
) => {
  const {
    name,
    defaultValue,
    componentProps = {},
    validate: customValidation,
    componentDisplayName = "",
  } = options;
  const { trigger } = useFormContext<TFieldValues>();

  const validate =
    customValidation ??
    nameToValidateMap[componentDisplayName as ComponentNames];

  const internalBasisValidation = (value: any) => {
    const validationErrors = validate(value, componentProps);

    return rhfErrorConverter.getRhfError(validationErrors);
  };

  const getDefaultValue =
    nameToGetDefaultValueMap[componentDisplayName as ComponentNames];
  const componentDefaultValue = getDefaultValue?.(componentProps) ?? undefined;

  const { field, fieldState } = useController({
    name,
    defaultValue: defaultValue ?? componentDefaultValue,
    rules: {
      validate: {
        [BASIS_INTERNAL_VALIDATION_KEY]: internalBasisValidation,
      },
    },
  });

  const { ref: rhfRef } = field;

  // https://github.com/react-hook-form/react-hook-form/discussions/5548#discussioncomment-849081
  const ref: RefCallback<HTMLElement> = useCallback(
    (e) => {
      e &&
        rhfRef({
          focus: () => {
            const tabIndex = e.tabIndex;
            e.tabIndex = 1;
            e.focus();
            e.tabIndex = tabIndex;
          },
        });
    },
    [rhfRef]
  );

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
    ref,
    onBlur,
    onChange,
    error: rhfErrorConverter.getBasisError(fieldState.error) ?? undefined,
  };
};
