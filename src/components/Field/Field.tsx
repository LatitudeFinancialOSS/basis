import React, { forwardRef, useMemo } from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useBasisField } from "../../hooks/useBasisForm/useBasisField";
import mergeRefs from "../../utils/mergeRefs";
import { FieldComponent, ValidProps, ValueProps } from "./types";

export const Field = forwardRef(
  <TFieldValues extends FieldValues, Props extends ValueProps<any>>(
    props: ValidProps<TFieldValues, Props>,
    ref: any
  ) => {
    const { name, defaultValue, validate, as: Component, ...rest } = props;

    const componentProps = useMemo(
      () => ({
        ...Component.defaultProps,
        ...rest,
      }),
      [Component.defaultProps, rest]
    );

    const {
      onChange,
      onBlur,
      ref: formComponentRef,
      error,
      ...childProps
    } = useBasisField<TFieldValues, FieldPath<TFieldValues>>({
      name,
      componentDisplayName: Component.displayName,
      componentProps,
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
