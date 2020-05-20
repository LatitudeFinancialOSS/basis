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
  const circleResponsiveCSS = useResponsivePropsCSS(
    props,
    {},
    {
      color: (propsAtBreakpoint, theme, bp) => {
        const labelColor = props.color ?? inputColorMap[bp];
        const color =
          labelColor === "grey.t05" || isChecked
            ? "white"
            : "secondary.lightBlue.t25";

        return theme[`radioGroupRadioOuterCircle.${color}`];
      },
    }
  );

  return (
    <svg
      css={theme.radioGroupRadioCircle}
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
    >
      <circle css={circleResponsiveCSS} cx="12" cy="12" r="12" />
      {isChecked && (
        <circle css={theme.radioGroupRadioInnerCircle} cx="12" cy="12" r="6" />
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
  const labelResponsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      const color = props.color ?? inputColorMap[bp];

      return theme[`radioGroupRadioLabel.${color}`];
    },
  });
  const [inputId] = useState(() => `radio-input-${nanoid()}`);

  return (
    <div css={theme.radioGroupRadio} role="radio" aria-checked={isChecked}>
      <VisuallyHidden>
        <input
          css={{
            ...theme.radioGroupRadioInput,
            ":checked + label": theme["radioGroupRadioLabel.checked"],
          }}
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
      <label
        css={{
          ...theme.radioGroupRadioLabel,
          ...labelResponsiveCSS,
          ...(isOneLine &&
            !showCircle &&
            theme["radioGroupRadioLabel.oneLine.withoutCircle"]),
        }}
        htmlFor={inputId}
        onMouseDown={onMouseDown}
      >
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
