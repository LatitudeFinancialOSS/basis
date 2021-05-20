import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useField from "../../hooks/internal/useField";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { responsiveHeightType } from "../../hooks/useResponsiveProp";
import { responsiveSize } from "../../utils/css";

import { mergeProps } from "../../utils/component";
import Field from "../internal/Field";
import { defaultTextareaProps } from "./defaultTextareaProps";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  ...defaultTextareaProps,
  color: "grey.t05",
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Required";
    }

    return null;
  },
};

Textarea.COLORS = COLORS;
Textarea.DEFAULT_PROPS = DEFAULT_PROPS;

function Textarea(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      maxLength: (maxLength) =>
        typeof maxLength === "string" || typeof maxLength === "number",
      color: (color) => COLORS.includes(color),
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
    }
  );
  const {
    name,
    maxLength,
    label,
    placeholder,
    helpText,
    disabled,
    optional,
    validate,
    validateData,
    onChange: onChangeProp,
    testId,
    __internal__focus,
  } = mergedProps;
  const [textareaId] = useState(() => `textarea-${nanoid()}`);
  const [auxId] = useState(() => `textarea-aux-${nanoid()}`);
  const isEmpty = useCallback((value) => value.trim() === "", []);
  const data = useMemo(
    () => ({
      isEmpty,
      ...(validateData && { data: validateData }),
    }),
    [isEmpty, validateData]
  );
  const {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange: fieldOnChange,
  } = useField("Textarea", {
    name,
    disabled,
    optional,
    validate,
    data,
  });
  const onChange = useCallback(
    (event) => {
      fieldOnChange(event);
      onChangeProp && onChangeProp({ value: event.target.value });
    },
    [fieldOnChange, onChangeProp]
  );
  const { inputColorMap } = useBackground();
  const textareaCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      const color = props.color ?? inputColorMap[bp];

      return theme.textarea.getCSS({
        color,
        __internal__focus,
      });
    },
    height: responsiveSize("height"),
  });

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={textareaId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <textarea
        css={textareaCSS}
        id={textareaId}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid={hasErrors ? "true" : null}
        aria-describedby={helpText || hasErrors ? auxId : null}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOf(COLORS),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helpText: PropTypes.node,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  ...responsiveHeightType,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool,
};

export default Textarea;
