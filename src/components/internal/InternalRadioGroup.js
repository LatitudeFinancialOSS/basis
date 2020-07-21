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
  showCircles: true,
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
    isOneLine,
    showCircle,
    label,
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
        isOneLine,
        showCircle,
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
        {showCircle && (
          <RadioCircle color={props.color} isChecked={isChecked} />
        )}
        {label}
      </label>
    </div>
  );
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  isOneLine: PropTypes.bool.isRequired,
  showCircle: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
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
    showCircles,
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

  return (
    <div
      role="radiogroup"
      aria-invalid={isValid ? null : "true"}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
    >
      <Grid cols={cols} colsGap={1} rowsGap={1}>
        {options.map(({ label, value }, index) => (
          <Grid.Item
            colSpan={index % cols}
            rowSpan={Math.floor(index / cols)}
            key={value}
          >
            <Radio
              name={name}
              parentName={parentName}
              color={color}
              isOneLine={cols === options.length}
              showCircle={showCircles}
              label={label}
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
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.number,
  color: PropTypes.oneOf(COLORS),
  showCircles: PropTypes.bool,
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
