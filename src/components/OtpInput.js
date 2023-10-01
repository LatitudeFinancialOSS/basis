import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useField from "../hooks/internal/useField";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import OTPInput from "react-otp-input";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";

const DEFAULT_PROPS = {
  codeLength: 6,
  disabled: false,
  optional: false,
  color: "grey.t05",
  shouldAutoFocus: true,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Required";
    }

    if (value.length !== 6) {
      return "Must be 6 digits";
    }

    return null;
  },
};

export default function OtpInput(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      codeLength: (codeLength) => typeof codeLength === "number",
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
      shouldAutoFocus: (shouldAutoFocus) =>
        typeof shouldAutoFocus === "boolean",
      value: (value) => typeof value === "string",
    }
  );

  const {
    name,
    codeLength,
    disabled,
    optional,
    onChange: onChangeProp,
    label,
    helpText,
    testId,
    validate,
    validateData,
  } = mergedProps;
  const isEmpty = useCallback((value) => value.trim() === "", []);
  const validationData = useMemo(
    () => ({
      isEmpty,
      ...(validateData && { data: validateData }),
    }),
    [isEmpty, validateData]
  );

  const [otpInputId] = useState(() => `otp-input-${nanoid()}`);
  const [auxId] = useState(() => `otp-input-aux-${nanoid()}`);

  const {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange: fieldOnChange,
  } = useField("OtpInput", {
    name,
    disabled,
    optional,
    validate,
    data: validationData,
  });

  const onChange = useCallback(
    (otpValue) => {
      fieldOnChange({ target: { value: otpValue, name } });
      onChangeProp && onChangeProp(otpValue);
    },
    [fieldOnChange, onChangeProp, name]
  );

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={otpInputId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <OTPInput
        id={otpInputId}
        value={value}
        onChange={onChange}
        numInputs={codeLength}
        containerStyle={{ gap: "4px" }}
        renderInput={(inputProps, index) => {
          return (
            <InternalInput
              name={name}
              inputProps={inputProps}
              hasErrors={hasErrors}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              index={index}
            />
          );
        }}
      />
    </Field>
  );
}

OtpInput.DEFAULT_PROPS = DEFAULT_PROPS;

OtpInput.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  codeLength: PropTypes.number,
  isDisabled: PropTypes.bool,
  shouldAutoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.node,
  testId: PropTypes.string,
};

function InternalInput(props) {
  const {
    hasErrors,
    onFocus,
    onBlur,
    index,
    name,
    disabled,
    inputProps: { style, ...otpInputProps },
  } = props;
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const inputCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      const color = props.color ?? inputColorMap[bp];

      return theme.otpInput.getCSS({
        targetElement: "input",
        color,
      });
    },
  });

  const internalOnFocus = useCallback(
    (event) => {
      otpInputProps.onFocus(event);
      onFocus(event);
    },
    [otpInputProps, onFocus]
  );

  const internalOnBlur = useCallback(
    (event) => {
      otpInputProps.onBlur(event);
      onBlur(event);
    },
    [otpInputProps, onBlur]
  );

  return (
    <div
      css={theme.input.getCSS({
        targetElement: "inputContainer",
      })}
    >
      <input
        aria-invalid={hasErrors ? "true" : null}
        {...otpInputProps}
        css={inputCSS}
        disabled={disabled}
        name={name}
        onFocus={internalOnFocus}
        onBlur={internalOnBlur}
        index={index}
      />
    </div>
  );
}

InternalInput.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  hasErrors: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  inputProps: PropTypes.object.isRequired,
};
