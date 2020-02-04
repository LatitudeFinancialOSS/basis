import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import VisuallyHidden from "./VisuallyHidden";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  isOptional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ isOptional }) => !isOptional,
      validator: (value, { isTouched }) => {
        if (!isTouched) {
          return null;
        }

        if (value === false) {
          return "Must be checked";
        }

        return null;
      }
    }
  ]
};

Checkbox.COLORS = COLORS;
Checkbox.DEFAULT_PROPS = DEFAULT_PROPS;

function CheckboxIcon({ color, isChecked }) {
  const theme = useTheme();

  return (
    <svg
      css={theme.checkboxIcon}
      viewBox="0 0 100 100"
      focusable="false"
      aria-hidden="true"
    >
      <rect
        css={theme[`checkboxIcon.${color}`]}
        width="100"
        height="100"
        rx="16"
      />
      {isChecked && (
        <path
          css={theme.checkboxIconMark}
          d="M21 51 l22 18 l35 -39"
          fill="transparent"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

CheckboxIcon.propTypes = {
  color: PropTypes.oneOf(["white", "secondary.lightBlue.t30"]).isRequired,
  isChecked: PropTypes.bool.isRequired
};

function Checkbox(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    isOptional: isOptional => typeof isOptional === "boolean",
    isDisabled: isDisabled => typeof isDisabled === "boolean"
  });
  const {
    label,
    color,
    isOptional,
    helpText,
    isDisabled,
    data,
    onChange,
    children,
    testId,
    __internal__keyboardFocus
  } = mergedProps;
  const theme = useTheme();
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [inputId] = useState(() => `checkbox-${nanoid()}`);
  const [auxId] = useState(() => `checkbox-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value: isChecked, errors } = data;
  const validate = useValidation({
    props: mergedProps,
    extraData: {
      isTouched
    }
  });

  return (
    <Field
      isOptional={isOptional}
      isDisabled={isDisabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <div
        css={theme.checkboxLabelContainer}
        role="checkbox"
        aria-invalid={errors ? "true" : null}
        aria-checked={isChecked}
        aria-labelledby={label ? labelId : null}
        aria-describedby={helpText || errors ? auxId : null}
      >
        <VisuallyHidden>
          <input
            css={{
              ":focus-visible + label": theme["checkboxLabel.focus-visible"],
              ":checked + label": theme["checkboxLabel.checked"]
            }}
            type="checkbox"
            id={inputId}
            checked={isChecked}
            disabled={isDisabled}
            onFocus={() => {
              setIsTouched(true);
            }}
            onBlur={validate}
            onChange={e => {
              onChange({
                ...data,
                value: e.target.checked
              });
            }}
          />
        </VisuallyHidden>
        <label
          css={{
            ...theme.checkboxLabel,
            ...theme[`checkboxLabel.${color}`],
            ...(__internal__keyboardFocus &&
              theme["checkboxLabel.focus-visible"])
          }}
          htmlFor={inputId}
        >
          <CheckboxIcon
            color={
              color === "grey.t05" || isChecked
                ? "white"
                : "secondary.lightBlue.t30"
            }
            isChecked={isChecked}
          />
          <span /* This span is needed so that we could mix text and <Link>. Without it, the white space between them would be ignored. */
          >
            {children}
          </span>
        </label>
      </div>
    </Field>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  isOptional: PropTypes.bool,
  helpText: PropTypes.string,
  isDisabled: PropTypes.bool,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.func,
      validator: PropTypes.func.isRequired
    })
  ),
  data: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool
};

export default Checkbox;
