import React from "react";
import PropTypes from "prop-types";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";

const COLORS = ["grey.t05", "white"] as const;

const DEFAULT_PROPS = {
  color: "grey.t05",
  placeholder: "Please select",
  fullWidth: true,
  disabled: false,
  isValid: true,
  __internal__focus: false,
} as const;

InternalSelect.COLORS = COLORS;
InternalSelect.DEFAULT_PROPS = DEFAULT_PROPS;

export type SelectColors = "grey.t05" | "white";

type Option = {
  label: string;
  value: string;
};

export type SelectOption = Option | Readonly<Option>;

export type SelectOptions = Option[] | Readonly<Option>[];

interface InternalSelectProps {
  name?: string;
  innerRef?: React.Ref<HTMLSelectElement>;
  parentName?: string;
  id?: string;
  color?: SelectColors;
  testId?: string;
  placeholder?: string;
  options: SelectOptions;
  fullWidth?: boolean;
  optional: boolean;
  disabled?: boolean;
  isValid?: boolean;
  describedBy?: string;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  __internal__focus?: boolean;
}

function InternalSelect(props: InternalSelectProps) {
  const {
    name,
    testId,
    parentName,
    id,
    placeholder = DEFAULT_PROPS.placeholder,
    options,
    fullWidth = DEFAULT_PROPS.fullWidth,
    optional,
    disabled = DEFAULT_PROPS.disabled,
    isValid = DEFAULT_PROPS.isValid,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    color,
    __internal__focus = DEFAULT_PROPS.__internal__focus,
  } = props;

  const { inputColorMap } = useBackground();
  const css = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    // @ts-ignore
    color: (propsAtBreakpoint, theme, bp) =>
      theme.select.getCSS({
        // @ts-ignore
        color: color ?? inputColorMap[bp],
        fullWidth,
        __internal__focus,
      }),
  });

  return (
    <select
      ref={null}
      css={css}
      id={id}
      name={name}
      data-parent-name={parentName}
      data-testid={testId}
      aria-invalid={isValid ? "false" : "true"}
      aria-describedby={describedBy}
      disabled={disabled}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    >
      {placeholder && (
        <option value="" disabled={!optional}>
          {placeholder}
        </option>
      )}
      {options.map((option: Option) => (
        /*
          Note: We use `option.label` as the key here because users shouldn't have
                multiple options with the same label.
                They can have multiple options with the same value though!
                For example:
                  <option value="us">USA</option>
                  <option value="us">United States</option>
        */
        <option value={option.value} key={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

InternalSelect.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
  optional: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  __internal__focus: PropTypes.bool,
};

export default InternalSelect;
