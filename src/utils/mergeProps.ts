// see: https://stackoverflow.com/a/49683575
type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type Spread<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

export function mergeProps<T extends Record<string, any>, U extends Partial<T>>(
  props: T,
  defaultProps: U
): Spread<U, T> {
  const overridenProps = Object.fromEntries(
    Object.entries(props).map(([key, value]) => [
      key,
      value === undefined ? defaultProps[key] : value,
    ])
  );

  return ({ ...defaultProps, ...overridenProps } as any) as Spread<U, T>;
}
