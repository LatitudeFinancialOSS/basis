import React, { useCallback, useRef, useState } from "react";
import { nanoid } from "nanoid";
import useTheme from "../../hooks/useTheme";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import Grid from "../Grid";
import VisuallyHidden from "../VisuallyHidden";
import mergeRefs from "../../utils/mergeRefs";
import { RadioOption, RadioOptions } from "../RadioGroup/types";

const COLORS = ["grey.t05", "white"] as const;

const DEFAULT_PROPS = {
  color: "grey.t05",
  disabled: false,
  isValid: true,
} as const;

InternalRadioGroup.COLORS = COLORS;
InternalRadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

export type RadioGroupColor = "grey.t05" | "white";

type RadioCircleColor = "white" | "secondary.lightBlue.t25";

interface RadioCirlcleProps {
  color: RadioCircleColor;
  isChecked: boolean;
}

function RadioCircle(props: RadioCirlcleProps) {
  const { isChecked } = props;
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const outerCircleCSS = useResponsivePropsCSS(
    props,
    {},
    {
      color: (propsAtBreakpoint, theme, bp) => {
        return theme.radioGroup.getCSS({
          targetElement: "outerCircle",
          color: props.color ?? inputColorMap[bp],
          isChecked,
        });
      },
    }
  );

  return (
    <svg
      css={theme.radioGroup.getCSS({ targetElement: "circleSvg" })}
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
    >
      <circle css={outerCircleCSS} cx="12" cy="12" r="12" />
      {isChecked && (
        <circle
          css={theme.radioGroup.getCSS({ targetElement: "innerCircle" })}
          cx="12"
          cy="12"
          r="6"
        />
      )}
    </svg>
  );
}

interface RadioProps {
  innerRef?: React.Ref<HTMLInputElement>;
  color?: RadioGroupColor;
  label: string | React.ReactNode;
  isLabelBold: boolean;
  name?: string;
  parentName?: string;
  value?: string;
  description?: React.ReactNode;
  isChecked: boolean;
  disabled: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function Radio(props: RadioProps) {
  const {
    name,
    innerRef,
    parentName,
    label,
    isLabelBold,
    description,
    isChecked,
    disabled,
    onFocus,
    onBlur,
    onMouseDown,
    value,
    onChange,
  } = props;

  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const labelCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      return theme.radioGroup.getCSS({
        targetElement: "radioLabel",
        color: props.color ?? inputColorMap[bp],
      });
    },
  });
  const [inputId] = useState(() => `radio-input-${nanoid()}`);

  return (
    <div
      css={theme.radioGroup.getCSS({ targetElement: "radio" })}
      role="radio"
      aria-checked={isChecked}
    >
      <VisuallyHidden>
        <input
          css={theme.radioGroup.getCSS({ targetElement: "radioInput" })}
          ref={innerRef}
          type="radio"
          id={inputId}
          name={name}
          data-parent-name={parentName}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </VisuallyHidden>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label css={labelCSS} htmlFor={inputId} onMouseDown={onMouseDown}>
        {
          // @ts-ignore TODO: find out why there the colors are different
          <RadioCircle color={props.color} isChecked={isChecked} />
        }
        <div>
          {isLabelBold ? <strong>{label}</strong> : label}
          {description ? (
            <div
              css={theme.radioGroup.getCSS({ targetElement: "description" })}
            >
              {description}
            </div>
          ) : null}
        </div>
      </label>
    </div>
  );
}

export interface InternalRadioGroupProps {
  name?: string;
  value?: string;
  innerRef?: React.Ref<HTMLDivElement>;
  parentName?: string;
  labelId?: string;
  "aria-label"?: string;
  options: RadioOptions;
  columns?: number;
  color?: RadioGroupColor;
  disabled?: boolean;
  isValid?: boolean;
  describedBy?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  testId?: string;
}

function InternalRadioGroup(props: InternalRadioGroupProps) {
  const {
    name,
    innerRef,
    parentName,
    labelId,
    options,
    columns,
    color,
    disabled = DEFAULT_PROPS.disabled,
    isValid,
    "aria-label": ariaLabel,
    describedBy,
    onFocus,
    testId,
    onBlur,
    onMouseDown,
    value: checkedValue,
    onChange,
  } = props;
  const cols = columns === undefined ? options.length : columns;
  const areLabelsBold = options.some(
    (option: RadioOption) => "description" in option
  );

  const radioGroupRef = useRef<HTMLDivElement>(null);

  const onRadioBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (
        !radioGroupRef.current?.contains(
          event.relatedTarget as HTMLInputElement
        )
      ) {
        onBlur?.(event);
      }
    },
    [onBlur]
  );

  return (
    <div
      role="radiogroup"
      ref={mergeRefs([radioGroupRef, innerRef ?? null])}
      data-testid={testId}
      aria-invalid={isValid ? "false" : "true"}
      aria-labelledby={labelId}
      aria-label={ariaLabel}
      aria-describedby={describedBy}
    >
      <Grid cols={cols} colsGap={1} rowsGap={1}>
        {options.map(
          ({ label, value, description }: RadioOption, index: number) => (
            <Grid.Item
              colSpan={index % cols}
              rowSpan={Math.floor(index / cols)}
              key={value}
            >
              <Radio
                name={name}
                parentName={parentName}
                color={color}
                label={label}
                isLabelBold={areLabelsBold}
                description={description}
                value={value}
                isChecked={value === checkedValue}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onRadioBlur}
                onMouseDown={onMouseDown}
                onChange={onChange}
              />
            </Grid.Item>
          )
        )}
      </Grid>
    </div>
  );
}

export default InternalRadioGroup;
