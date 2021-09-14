import React, { ComponentType } from "react";
import {
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { ValidationError, ValidateFn } from "../../types";

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"]
  ? false
  : true;
type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
type ArrayKey = number;

type PathImpl<K extends string | number, V, C> = V extends C
  ? `${K}`
  : V extends Primitive
  ? never
  : `${K}.${ValidPath<V, C>}`;
export type ValidPath<T, C> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKey<T>]-?: PathImpl<K & string, T[K], C>;
      }[TupleKey<T>]
    : PathImpl<ArrayKey, V, C>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K], C>;
    }[keyof T];

export type Component<Props> =
  | ComponentType<Props>
  | React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>
  | (React.ForwardRefExoticComponent<Props & React.RefAttributes<any>> &
      Record<string, any>)
  | (React.Component<Props> & Record<string, any>)
  | ((props: Props & React.RefAttributes<any>) => React.ReactElement | null);

type ErrorProps<ErrorType extends ValidationError> = {
  error?: ErrorType;
};

export type ValueProps<Value> = {
  value?: Value;
};

type FieldInnerProps<
  TFieldValues = FieldValues,
  Value = any,
  Props = ValueProps<Value>
> = ValidPath<TFieldValues, Value> extends never
  ? "No field exists whose type matches component provided in `as=`"
  : // Infer the type of Error expected by the validate function
  Props extends ErrorProps<infer ErrorType>
  ? {
      name: ValidPath<TFieldValues, Value>;
      validate?: ValidateFn<Value, Props, ErrorType>;
      defaultValue?: Value;
      // Have to use Component<Props> to allow components with custom properties and forward refs
      as: Component<Props>;
    } & Props
  : never;

type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  Props = any
> = Props extends ValueProps<infer Value>
  ? // check if value of prop is compatible with type from Field path
    // Infer the type of Error expected by the validate function
    FieldInnerProps<TFieldValues, Value, Props>
  : // show nicer error message for component mismatch
    "Either you passed a non basis component or you missed name prop";

export type FieldComponent<TFieldValues extends FieldValues = FieldValues> = <
  P = ValueProps<any>
>(
  props: FieldProps<TFieldValues, P>
) => any;

// similar to Field Props but with less typescript inferrance
// the typescript inferrance is not carried over to the useBasisField
// is only required for FieldComponent consumed by the user
export type ValidProps<
  TFieldValues extends FieldValues = FieldValues,
  Props = ValueProps<any>
> = Props extends ValueProps<infer Value>
  ? {
      name: FieldPath<TFieldValues>;
      validate?: ValidateFn<Value, Props, ValidationError>;
      defaultValue?: Value;
      // can't use Component<Props> because typescript doesn't allow dynamic rendering
      // of components with arbitrary properties and refs
      as: ComponentType<Props>;
    } & Props
  : never;

type CustomFieldRenderProp<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = (
  values: ControllerRenderProps<TFieldValues, Name> & {
    value: FieldPathValue<TFieldValues, Name>;
    error?: ValidationError;
  }
) => React.ReactNode;

export type CustomFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: Name;
  validate: ValidateFn<PathValue<TFieldValues, Name>, {}, ValidationError>;
  defaultValue: PathValue<TFieldValues, Name>;
  children: CustomFieldRenderProp<TFieldValues, Name>;
};

export type CustomFieldComponent<
  TFieldValues extends FieldValues = FieldValues
> = <Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: CustomFieldProps<TFieldValues, Name>
) => any;
