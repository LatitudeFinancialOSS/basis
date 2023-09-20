import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useField from "../hooks/internal/useField";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import OTPInput from "react-otp-input";

const DEFAULT_PROPS = {
  numInputs: 6,
  disabled: false,
  optional: false,
  shouldAutoFocus: true,
};

function OtpInput(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      numInputs: (numInputs) => typeof numInputs === "number",
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
      shouldAutoFocus: (shouldAutoFocus) => typeof shouldAutoFocus === "boolean",
      value: (value) => typeof value === "string",
    }
  );

  const {
    name,
    numInputs,
    disabled,
    optional,
    onChange: onChangeProp,
    label,
    helpText,
    testId,
  } = mergedProps;

  const [otpInputId] = useState(() => `otp-input-${nanoid()}`);
  const [auxId] = useState(() => `otp-input-aux-${nanoid()}`);

  const {
    value,
    errors,
    onChange: fieldOnChange,
  } = useField("OtpInput", {
    name,
    disabled: disabled,
    optional,
  });

  const onChange = useCallback(
    (otpValue) => {
      fieldOnChange({ target: { value: otpValue, name }});
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
        numInputs={numInputs}
        containerStyle={{gap: "4px"}}
        renderInput={(inputProps, _index) => {
        return <input
          {...inputProps}
        />}}
      />
    </Field>
  );
}

OtpInput.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  numInputs: PropTypes.number,
  isDisabled: PropTypes.bool,
  shouldAutoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.node,
  testId: PropTypes.string,
};

export default OtpInput;
