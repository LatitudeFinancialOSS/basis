import React, { ComponentType, useEffect, useMemo, useState } from "react";
import {  FieldPathValue, FieldPath, FieldValues,  useController, useFormContext } from "react-hook-form";
import { ComponentWithProperties } from "../../types";


export type Component<Props> = ComponentType<Props> | React.ForwardRefExoticComponent<Props & React.RefAttributes<any>> | ComponentWithProperties<Props, any>;

export type ValidationError = string | string[] | Record<string, any>;

export type Validator<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props extends Record<string, any> = Record<string, any>,
  ErrorType extends ValidationError = ValidationError,
  > =(_value: FieldPathValue<TFieldValues, Name>, props: Props) => ErrorType | null

type ErrorProps<ErrorType extends ValidationError> = {
  error?: ErrorType,
}

type ValueProps<Value> = {
  value?: Value,
}

type ValidProps<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props = ValueProps<FieldPathValue<TFieldValues, Name>>,
  > =
  Props extends ValueProps<FieldPathValue<TFieldValues, Name>> ?
  Props extends ErrorProps<infer ErrorType> ?
  {
    name: Name;
    optional?: boolean;
    validate?: Validator<TFieldValues, Name, Props, ErrorType>;
    defaultValue?: any;
    as: Component<Props>;
  } & Props
  : never
  : never;

type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props = ValueProps<FieldPathValue<TFieldValues, Name>>,
  > =
  Props extends ValueProps<FieldPathValue<TFieldValues, Name>> ?
  Props extends ErrorProps<infer ErrorType> ?
  {
    name: Name;
    optional?: boolean;
    // validate?: (value: FieldPathValue<TFieldValues, Name>) => ErrorType;
    validate?: Validator<TFieldValues, Name, Props, ErrorType>;
    defaultValue?: any;
    as: Component<Props>;
  } & Props
  : never
  : "Component in `as=` expects a different value than the one provided by `name=`";

export type FieldComponent<TFieldValues extends FieldValues = FieldValues> = <Name extends FieldPath<TFieldValues>, P = ValueProps<FieldPathValue<TFieldValues, Name>>>(props: FieldProps<TFieldValues, Name, P>) => any;


// export type SuperField<> = Field<

export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props extends ValueProps<FieldPathValue<TFieldValues, Name>> = ValueProps<FieldPathValue<TFieldValues, Name>>,
  >(props: ValidProps<TFieldValues, Name, Props>) => {
  const {
    name,
    defaultValue = "",
    as: Component,
  } = props;
  const { trigger } = useFormContext<TFieldValues>();

  const { field, fieldState } = useController({
    name,
    defaultValue,
  });

  const [hasBeenInvalid, setHasBeenInvalid] = useState(false);

  useEffect(() => {
    if (fieldState.invalid && !hasBeenInvalid) {
      setHasBeenInvalid(true);
    }
  }, [fieldState.invalid, hasBeenInvalid])

  const childProps = useMemo(() => ({
    ...field,
    onChange: (...args: any) => {
      field.onChange(...args);

      if (hasBeenInvalid) {
        trigger(name);
      }
    },
    error: fieldState.error?.types,
  }), [field, trigger, fieldState.error, hasBeenInvalid, name]);

  if (Component) {
    // @ts-ignore
    return <Component {...props} {...childProps} />
  }
}
