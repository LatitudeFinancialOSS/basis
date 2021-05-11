import React, { ComponentType, forwardRef } from "react";
import { FieldPathValue, FieldPath, FieldValues } from "react-hook-form";
import { useBasisField } from "../../hooks/useBasisForm/useBasisField";
import mergeRefs from "../../utils/mergeRefs";
import { ValidationError, ValidateFn } from "../../types";

export type Component<Props> =
  | ComponentType<Props>
  | React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>
  | (React.ForwardRefExoticComponent<Props & React.RefAttributes<any>> &
      Record<string, any>)
  | (React.Component<Props> & Record<string, any>);

type ErrorProps<ErrorType extends ValidationError> = {
  error?: ErrorType;
};

type ValueProps<Value> = {
  value?: Value;
};

type FieldProps<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props = ValueProps<FieldPathValue<TFieldValues, Name>>
> =
  // infer the value prop from the component
  Props extends ValueProps<infer Value>
    ? // check if value of prop is compatible with type from Field path
      FieldPathValue<TFieldValues, Name> extends Value
      ? // Infer the type of Error expected by the validate function
        Props extends ErrorProps<infer ErrorType>
        ? {
            name: Name;
            validate?: ValidateFn<TFieldValues, Name, Props, ErrorType>;
            defaultValue?: FieldPathValue<TFieldValues, Name>;
            // Have to use Component<Props> to allow components with custom properties and forward refs
            as: Component<Props>;
          } & Props
        : never
      : // show nicer error message for component mismatch
        "Component in `as=` expects a different value than the one provided by `name=`"
    : never;

export type FieldComponent<TFieldValues extends FieldValues = FieldValues> = <
  Name extends FieldPath<TFieldValues>,
  P = ValueProps<FieldPathValue<TFieldValues, Name>>
>(
  props: FieldProps<TFieldValues, Name, P>
) => any;

// similar to Field Props but with less typescript inferrance
// the typescript inferrance is not carried over to the useBasisField
// is only required for FieldComponent consumed by the user
type ValidProps<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props = ValueProps<FieldPathValue<TFieldValues, Name>>
> = Props extends ValueProps<FieldPathValue<TFieldValues, Name>>
  ? {
      name: Name;
      validate?: ValidateFn<
        TFieldValues,
        Name,
        Record<string, any>,
        ValidationError
      >;
      defaultValue?: FieldPathValue<TFieldValues, Name>;
      // can't use Component<Props> because typescript doesn't allow dynamic rendering
      // of components with arbitrary properties and refs
      as: ComponentType<Props>;
    } & Props
  : "Component in `as=` expects a different value than the one provided by `name=`";

export const Field = forwardRef(
  <
    TFieldValues extends FieldValues,
    Name extends FieldPath<TFieldValues>,
    Props extends ValueProps<FieldPathValue<TFieldValues, Name>>
  >(
    props: ValidProps<TFieldValues, Name, Props>,
    ref: any
  ) => {
    const {
      name,
      defaultValue,
      validate,
      as: Component,
      ...componentProps
    } = props;

    const {
      onChange,
      onBlur,
      ref: formComponentRef,
      error,
      ...childProps
    } = useBasisField<TFieldValues, Name>({
      name,
      componentDisplayName: Component.displayName,
      componentProps: componentProps,
      validate,
      defaultValue,
    });

    const mergedProps = {
      ...props,
      ...childProps,
      error,
      onChange,
      onBlur,
      ref: mergeRefs([ref, formComponentRef]),
    };

    return <Component {...mergedProps} />;
  }
) as FieldComponent;
