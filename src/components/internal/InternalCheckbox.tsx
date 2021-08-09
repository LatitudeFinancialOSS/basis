import React, { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useTheme from "../../hooks/useTheme";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import VisuallyHidden from "../VisuallyHidden";

const COLORS = ["grey.t05", "white"] as const;

const DEFAULT_PROPS = {
  color: "grey.t05",
  disabled: false,
  __internal__keyboardFocus: false,
} as const;

InternalCheckbox.COLORS = COLORS;
InternalCheckbox.DEFAULT_PROPS = DEFAULT_PROPS;

type CheckboxColor = "grey.t05" | "white";

interface CheckboxIconProps {
  color: CheckboxColor;
  isChecked?: boolean;
}

function CheckboxIcon({ color, isChecked = false }: CheckboxIconProps) {
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const rectCSS = useResponsivePropsCSS(
    {},
    {},
    {
      color: (propsAtBreakpoint, theme, bp) => {
        return theme.checkbox.getCSS({
          targetElement: "svgRect",
          color: color ?? inputColorMap[bp],
          isChecked,
        });
      },
    }
  );

  return (
    <svg
      css={theme.checkbox.getCSS({ targetElement: "svg" })}
      viewBox="0 0 100 100"
      focusable="false"
      aria-hidden="true"
    >
      <rect css={rectCSS} width="100" height="100" rx="16" />
      {isChecked && (
        <path
          css={theme.checkbox.getCSS({ targetElement: "svgPath" })}
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
  color: PropTypes.oneOf(COLORS),
  isChecked: PropTypes.bool.isRequired,
};

interface InternalCheckboxProps {
  name?: string;
  innerRef?: React.Ref<HTMLInputElement>;
  parentName?: string;
  inputId?: string;
  color?: CheckboxColor;
  testId?: string;
  disabled?: boolean;
  isValid: boolean;
  labelledBy?: string;
  describedBy?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  children: React.ReactNode;
  __internal__keyboardFocus?: boolean;
}

function InternalCheckbox(_props: InternalCheckboxProps) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
    parentName,
    color,
    disabled,
    isValid,
    innerRef,
    testId,
    labelledBy,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    onMouseDown,
    children,
    __internal__keyboardFocus,
  } = props;
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const [inputId] = useState(() => props.inputId ?? `checkbox-${nanoid()}`);
  const labelCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      return theme.checkbox.getCSS({
        targetElement: "label",
        color: _props.color ?? inputColorMap[bp],
        __internal__keyboardFocus,
      });
    },
  });

  return (
    <div css={theme.checkbox.getCSS({ targetElement: "container" })}>
      <VisuallyHidden>
        <input
          css={theme.checkbox.getCSS({ targetElement: "input" })}
          ref={innerRef}
          aria-invalid={isValid ? "false" : "true"}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          type="checkbox"
          data-testid={testId}
          id={inputId}
          name={name}
          data-parent-name={parentName}
          checked={value}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </VisuallyHidden>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label css={labelCSS} htmlFor={inputId} onMouseDown={onMouseDown}>
        <CheckboxIcon color={color} isChecked={value} />
        <span /* This span is needed so that we could mix text and <Link>. Without it, the white space between them would be ignored. */
        >
          {children}
        </span>
      </label>
    </div>
  );
}

export default InternalCheckbox;
