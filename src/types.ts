import React from "react";

// see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
export type ComponentWithStaticProperties<
  Props extends {},
  Properties extends {}
> =
  | (React.ForwardRefExoticComponent<Props & React.RefAttributes<any>> &
      Properties)
  | (React.ComponentType<Props> & Properties);

export type ValidationError = string | string[] | Record<string, string> | null;

export type ValidateFn<
  Value = any,
  Props extends Record<string, any> = Record<string, any>,
  ErrorType extends ValidationError = ValidationError
> = (value: Value, props: Props) => ErrorType | null;

export type BasisComponent<Props> =
  | React.ComponentType<Props>
  | React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>
  | (React.ForwardRefExoticComponent<Props & React.RefAttributes<any>> &
      Record<string, any>)
  | (React.Component<Props> & Record<string, any>);

type ValidationProps<Value, Error> = {
  value?: Value;
  error?: Error;
};

export type ValidationFunction<
  Comp extends BasisComponent<any>
> = Comp extends BasisComponent<infer Props>
  ? Props extends ValidationProps<infer Value, infer ErrorType>
    ? (value: Value, props: Props) => ErrorType | null
    : never
  : never;

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export type ResponsiveProp<Key extends string, T = number | string> = {
  [key in `${Key}-${Breakpoint}` | Key]?: T;
};

export type SizeValue = `${number}px` | `${number}` | `${number}%`;

// See: https://stackoverflow.com/a/66234597/247243
export type OptionsValues<T extends { [key: number]: { value: string } }> =
  | T[number]["value"]
  | "";

export type OneOf<T extends readonly any[]> = T[number];
