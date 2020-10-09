import React from "react";
import PropTypes from "prop-types";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  placeholder: "Please select",
  fullWidth: true,
  disabled: false,
  isValid: true,
  __internal__focus: false,
};

InternalSelect.COLORS = COLORS;
InternalSelect.DEFAULT_PROPS = DEFAULT_PROPS;

function InternalSelect(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
    parentName,
    id,
    placeholder,
    options,
    fullWidth,
    optional,
    disabled,
    isValid,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    __internal__focus,
  } = props;
  const { inputColorMap } = useBackground();
  const css = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      const color = _props.color ?? inputColorMap[bp];

      return theme.select.getCSS({
        color,
        fullWidth,
        __internal__focus,
      });
    },
  });

  return (
    <select
      css={css}
      id={id}
      name={name}
      data-parent-name={parentName}
      aria-invalid={isValid ? null : "true"}
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
      {options.map((option) => (
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
