import React, { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useTheme from "../../hooks/useTheme";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import Grid from "../Grid";
import VisuallyHidden from "../VisuallyHidden";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  disabled: false,
  isValid: true,
};

InternalRadioGroup.COLORS = COLORS;
InternalRadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

function RadioCircle(props) {
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

RadioCircle.propTypes = {
  color: PropTypes.oneOf(["white", "secondary.lightBlue.t25"]),
  isChecked: PropTypes.bool.isRequired,
};

function Radio(props) {
  const {
    name,
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
        <RadioCircle color={props.color} isChecked={isChecked} />
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

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  label: PropTypes.string.isRequired,
  isLabelBold: PropTypes.bool.isRequired,
  description: PropTypes.node,
  isChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function InternalRadioGroup(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
    parentName,
    labelId,
    options,
    columns,
    color,
    disabled,
    isValid,
    describedBy,
    onFocus,
    onBlur,
    onMouseDown,
    value: checkedValue,
    onChange,
  } = props;
  const cols = columns === undefined ? options.length : columns;
  const areLabelsBold = options.some((option) => option.description);

  return (
    <div
      role="radiogroup"
      aria-invalid={isValid ? null : "true"}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
    >
      <Grid cols={cols} colsGap={1} rowsGap={1}>
        {options.map(({ label, description, value }, index) => (
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
              onBlur={onBlur}
              onMouseDown={onMouseDown}
              onChange={onChange}
            />
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
}

InternalRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  labelId: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.node,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.number,
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InternalRadioGroup;
