import {
  SelectOption,
  SelectOptions,
} from "../../../components/internal/InternalSelect";
import { InternalSelectProps } from "../../../components/Select/types";

const isSelectEmpty = (value: string, options: SelectOptions) =>
  options.findIndex((option: SelectOption) => option.value === value) === -1;

export const validateSelect = (value: string, props: InternalSelectProps) => {
  const { options } = props;

  if (isSelectEmpty(value, options)) {
    return "Please make a selection.";
  }

  return null;
};
