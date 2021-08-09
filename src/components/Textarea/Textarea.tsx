import React, { useState } from "react";
import { nanoid } from "nanoid";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { responsiveSize } from "../../utils/css";

import Field from "../internal/Field";
import { InternalTextareaProps } from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";
import { defaultTextareaProps } from "./defaultTextareaProps";

const DEFAULT_PROPS = {
  ...defaultTextareaProps,
  color: "grey.t05",
  validate: (value: any, { isEmpty }: any) => {
    if (isEmpty(value)) {
      return "Required";
    }

    return null;
  },
} as const;

function Textarea(props: InternalTextareaProps) {
  const mergedProps = useMergedProps(props, defaultTextareaProps);
  const {
    innerRef,
    value,
    maxLength,
    label,
    placeholder,
    helpText,
    disabled,
    optional,
    error,
    onChange,
    onFocus,
    onBlur,
    testId,
    __internal__focus,
  } = mergedProps;
  const [textareaId] = useState(() => `textarea-${nanoid()}`);
  const [auxId] = useState(() => `textarea-aux-${nanoid()}`);

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

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={textareaId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
    >
      <textarea
        ref={innerRef}
        css={textareaCSS}
        id={textareaId}
        placeholder={placeholder}
        maxLength={
          typeof maxLength === "string" ? Number(maxLength) : maxLength
        }
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid={hasErrors ? "true" : "false"}
        aria-describedby={helpText || hasErrors ? auxId : undefined}
        data-testid={testId}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}

export default Textarea;
