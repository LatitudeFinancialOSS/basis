import React, { useCallback } from "react";
import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { mergeProps } from "../../utils/component";

const VARIANTS = ["text", "numeric"];
const COLORS = ["grey.t05", "white"];

const NUMERIC_REGEX = /^\d*$/;

const DEFAULT_PROPS = {
  variant: "text",
  color: "grey.t05",
  disabled: false,
  autoComplete: "off",
  pasteAllowed: true,
  isValid: true,
  __internal__focus: false,
};

InternalInput.VARIANTS = VARIANTS;
InternalInput.COLORS = COLORS;
InternalInput.NUMERIC_REGEX = NUMERIC_REGEX;
InternalInput.DEFAULT_PROPS = DEFAULT_PROPS;

function InternalInput(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      variant: (variant) => VARIANTS.includes(variant),
      numericPrefix: (numericPrefix) =>
        typeof numericPrefix === "string" && numericPrefix.length > 0,
      numericSuffix: (numericSuffix) =>
        typeof numericSuffix === "string" && numericSuffix.length > 0,
      maxLength: (maxLength) =>
        typeof maxLength === "string" || typeof maxLength === "number",
      autoComplete: (autoComplete) => typeof autoComplete === "string",
      color: (color) => COLORS.includes(color),
      disabled: (disabled) => typeof disabled === "boolean",
      pasteAllowed: (pasteAllowed) => typeof pasteAllowed === "boolean",
    }
  );
  const {
    name,
    parentName,
    id,
    placeholder,
    variant,
    numericPrefix,
    numericSuffix,
    maxLength,
    autoComplete,
    disabled,
    pasteAllowed,
    isValid,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    __internal__focus,
  } = mergedProps;
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const inputCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      const color = props.color ?? inputColorMap[bp];

      return theme.input.getCSS({
        targetElement: "input",
        variant,
        numericPrefix,
        numericSuffix,
        color,
        __internal__focus,
      });
    },
  });
  const onPaste = useCallback(
    (event) => {
      if (!pasteAllowed) {
        event.preventDefault();
      }
    },
    [pasteAllowed]
  );

  return (
    <div
      css={theme.input.getCSS({
        targetElement: "inputContainer",
        variant,
        numericPrefix,
        numericSuffix,
      })}
    >
      <input
        css={inputCSS}
        id={id}
        name={name}
        data-parent-name={parentName}
        placeholder={placeholder}
        type="text"
        {...(variant === "numeric" && {
          // See: https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers
          inputMode: "numeric",
          pattern: "[0-9]*",
        })}
        maxLength={maxLength}
        disabled={disabled}
        onPaste={onPaste}
        autoComplete={autoComplete}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid={isValid ? null : "true"}
        aria-describedby={describedBy}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

InternalInput.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(VARIANTS),
  numericPrefix: PropTypes.string,
  numericSuffix: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoComplete: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  pasteAllowed: PropTypes.bool,
  isValid: PropTypes.bool,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  __internal__focus: PropTypes.bool,
};

export default InternalInput;
