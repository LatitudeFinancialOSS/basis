import { FieldPath, FieldValues } from "react-hook-form";
import { useBasisField } from "../../hooks/useBasisForm/useBasisField";
import { CustomFieldComponent, CustomFieldProps } from "./types";

export const CustomField = (<
  TFieldValues extends FieldValues,
  Name extends FieldPath<TFieldValues>
>(
  props: CustomFieldProps<TFieldValues, Name>
) => {
  const { name, defaultValue, validate, children } = props;
  const childProps = useBasisField({ name, defaultValue, validate });
  return children(childProps);
}) as CustomFieldComponent;
