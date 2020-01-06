import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import Field from "./internal/Field";
import useContainer from "../hooks/useContainer";
import useTheme from "../hooks/useTheme";
import useValidation from "../hooks/useValidation";

export const COLORS = ["grey.t05", "white"];

export const DEFAULT_PROPS = {
  color: "grey.t05",
  placeholder: "Please select",
  isFullWidth: true,
  isOptional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ isOptional }) => !isOptional,
      validator: (value, { isTouched, props }) => {
        if (!isTouched) {
          return null;
        }

        const selectedOption = props.options.find(
          option => option.value === value
        );

        if (!selectedOption) {
          return "Please make a selection.";
        }

        return null;
      }
    }
  ]
};

function Select(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    label,
    placeholder,
    onFocus,
    onBlur,
    options,
    isFullWidth,
    isOptional,
    helpText,
    isDisabled,
    data,
    onChange
  } = props;
  const theme = useTheme();
  const { inputColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && inputColor ? inputColor : props.color;
  const [selectId] = useState(() => `select-${nanoid()}`);
  const [auxId] = useState(() => `select-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value: selectedValue, errors } = data;
  const validate = useValidation({
    props,
    extraData: {
      isTouched,
      props
    }
  });

  return (
    <Field
      isFullWidth={isFullWidth}
      isOptional={isOptional}
      isDisabled={isDisabled}
      label={label}
      labelFor={selectId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
    >
      <select
        css={{
          ...theme.selectInput,
          ...theme[`selectInput.${color}`],
          ...(isFullWidth && theme["selectInput.fullWidth"]),
          ":focus": {
            ...theme["selectInput:focus"],
            ...theme[`selectInput.${color}:focus`]
          }
        }}
        id={selectId}
        aria-invalid={errors ? "true" : null}
        aria-describedby={helpText || errors ? auxId : null}
        disabled={isDisabled}
        value={selectedValue}
        onFocus={() => {
          setIsTouched(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          validate();
          onBlur && onBlur();
        }}
        onChange={e => {
          onChange({
            ...data,
            value: e.target.value
          });
        }}
      >
        {placeholder && (
          <option value="" disabled={true}>
            {placeholder}
          </option>
        )}
        {options.map(option => (
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
    </Field>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  isFullWidth: PropTypes.bool,
  isOptional: PropTypes.bool,
  helpText: PropTypes.string,
  errorMessage: PropTypes.string,
  isDisabled: PropTypes.bool,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.func,
      validator: PropTypes.func.isRequired
    })
  ),
  data: PropTypes.shape({
    value: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Select;
