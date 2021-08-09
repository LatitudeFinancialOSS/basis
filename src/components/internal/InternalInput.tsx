import React, { useCallback } from "react";
import useTheme from "../../hooks/useTheme";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { Interpolation } from "@emotion/react";

const TYPES = ["text", "password", "email", "tel"];
const VARIANTS = ["text", "numeric", "decimal"];
const COLORS = ["grey.t05", "white"];

const NUMERIC_REGEX = /^\d*$/;
const DECIMAL_REGEX = /^\d*(\.\d{2})?$/;

export const DEFAULT_PROPS = {
  type: "text",
  variant: "text",
  color: "grey.t05",
  disabled: false,
  autoComplete: "off",
  isLoading: false,
  hasSuffixButton: false,
  pasteAllowed: true,
  isValid: true,
  __internal__focus: false,
} as const;

export type InternalInputTypes = "text" | "password" | "email" | "tel";

export type InternalInputVariants = "text" | "numeric" | "decimal";

export type InternalInputColors = "grey.t05" | "white";

interface InternalInputProps {
  name?: string;
  parentName?: string;
  innerRef?: React.Ref<HTMLInputElement>;
  id?: string;
  testId?: string;
  type?: InternalInputTypes;
  placeholder?: string;
  variant: InternalInputVariants;
  prefix?: string;
  suffix?: string;
  isLoading?: boolean;
  hasSuffixButton?: boolean;
  maxLength?: string | number;
  autoComplete?: string;
  color?: InternalInputColors;
  disabled?: boolean;
  pasteAllowed?: boolean;
  isValid?: boolean;
  describedBy?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  value?: string;
  "aria-label"?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  __internal__focus?: boolean;
}

const InternalInput = (props: InternalInputProps) => {
  const {
    name,
    parentName,
    innerRef,
    id,
    testId,
    type = DEFAULT_PROPS.type,
    placeholder,
    variant = DEFAULT_PROPS.variant,
    prefix,
    suffix,
    isLoading,
    hasSuffixButton,
    maxLength,
    autoComplete = DEFAULT_PROPS.autoComplete,
    disabled = DEFAULT_PROPS.disabled,
    pasteAllowed,
    isValid = DEFAULT_PROPS.isValid,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    onKeyDown,
    "aria-label": ariaLabel,
    __internal__focus = DEFAULT_PROPS.__internal__focus,
  } = props;
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const inputCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      const color = props.color ?? inputColorMap[bp];

      return theme.input.getCSS({
        targetElement: "input",
        variant,
        prefix,
        suffix,
        color,
        isLoading,
        hasSuffixButton,
        __internal__focus,
      });
    },
  }) as Interpolation<any>;
  const onPaste = useCallback(
    (event) => {
      if (!pasteAllowed) {
        event.preventDefault();
      }
    },
    [pasteAllowed]
  );
  const variantProps =
    variant === "numeric"
      ? ({
          // See: https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers
          inputMode: "numeric",
          pattern: "[0-9]*",
        } as const)
      : variant === "decimal"
      ? ({
          inputMode: "decimal",
        } as const)
      : {};

  return (
    <div
      css={theme.input.getCSS({
        targetElement: "inputContainer",
        variant,
        prefix,
        suffix,
      })}
    >
      <input
        css={inputCSS}
        aria-label={ariaLabel}
        name={name}
        ref={innerRef}
        id={id}
        data-testid={testId}
        data-parent-name={parentName}
        placeholder={placeholder}
        type={type}
        {...variantProps}
        maxLength={
          typeof maxLength === "string" ? parseInt(maxLength, 10) : maxLength
        }
        disabled={disabled}
        onPaste={onPaste}
        autoComplete={autoComplete}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid={isValid ? "false" : "true"}
        aria-describedby={describedBy}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

InternalInput.displayName = "BasisInternalInput";
InternalInput.TYPES = TYPES;
InternalInput.VARIANTS = VARIANTS;
InternalInput.COLORS = COLORS;
InternalInput.NUMERIC_REGEX = NUMERIC_REGEX;
InternalInput.DECIMAL_REGEX = DECIMAL_REGEX;
InternalInput.DEFAULT_PROPS = DEFAULT_PROPS;

export default InternalInput;
