import { useMemo } from "react";
import { mergeProps } from "../utils/mergeProps";

export const useMergedProps = <
  T extends Record<string, any>,
  U extends Partial<T>
>(
  props: T,
  defaultProps: U
) => {
  return useMemo(() => mergeProps(props, defaultProps), [props, defaultProps]);
};
