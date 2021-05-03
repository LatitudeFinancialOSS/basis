import React from "react";
import { FieldPath, FieldPathValue, FieldValues } from "react-hook-form";

type CommonProperties = {
  TYPES?: string[];
  VARIANTS?: string[];
  COLORS: string[];
  displayName: string;
  [key: string]: any;
};

// see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
export type ComponentWithProperties<
  Props extends {},
  Properties extends {} = CommonProperties
> =
  | (React.ForwardRefExoticComponent<Props & React.RefAttributes<any>> &
      Properties)
  | (React.Component<Props> & Properties);

export type ValidationError = string | string[] | Record<string, string> | null;

export type ValidateFn<
  TFieldValues extends FieldValues = FieldValues,
  Name extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  Props extends Record<string, any> = Record<string, any>,
  ErrorType extends ValidationError = ValidationError
> = (
  value: FieldPathValue<TFieldValues, Name>,
  props: Props
) => ErrorType | null;
