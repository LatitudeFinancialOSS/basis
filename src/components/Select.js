import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  placeholder: "Please select",
  fullWidth: true,
  optional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ optional }) => !optional,
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

Select.COLORS = COLORS;
Select.DEFAULT_PROPS = DEFAULT_PROPS;

function Select(props) {
  const theme = useTheme();
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    fullWidth: fullWidth => typeof fullWidth === "boolean",
    optional: optional => typeof optional === "boolean",
    isDisabled: isDisabled => typeof isDisabled === "boolean"
  });
  const {
    color,
    label,
    placeholder,
    onFocus,
    onBlur,
    options,
    fullWidth,
    optional,
    helpText,
    isDisabled,
    data,
    onChange,
    testId,
    __internal__focus
  } = mergedProps;
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const [selectId] = useState(() => `select-${nanoid()}`);
  const [auxId] = useState(() => `select-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value: selectedValue, errors } = data;
  const validate = useValidation({
    props: mergedProps,
    extraData: {
      isTouched,
      props: mergedProps
    }
  });

  return (
    <Field
      fullWidth={fullWidth}
      optional={optional}
      isDisabled={isDisabled}
      label={label}
      labelFor={selectId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <select
        css={{
          ...theme.selectInput,
          ...theme[`selectInput.${colorStr}`],
          ...(fullWidth && theme["selectInput.fullWidth"]),
          ":focus": {
            ...theme["selectInput:focus"],
            ...theme[`selectInput.${colorStr}:focus`]
          },
          ...(__internal__focus && {
            ...theme["selectInput:focus"],
            ...theme[`selectInput.${colorStr}:focus`]
          }),
          ":active": {
            ...(!isDisabled && theme[`selectInput.${colorStr}:active`])
          },
          ":hover": {
            ...(!isDisabled && theme[`selectInput.${colorStr}:hover`])
          },
          // See: https://stackoverflow.com/a/19451423/247243
          ":-moz-focusring": {
            color: "transparent",
            textShadow: "0 0 0 #000"
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
          <option value="" disabled={!optional} hidden={!optional}>
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
  fullWidth: PropTypes.bool,
  optional: PropTypes.bool,
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
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool
};

export default Select;
