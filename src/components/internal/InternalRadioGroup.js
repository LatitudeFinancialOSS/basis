import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useTheme from "../../hooks/useTheme";
import Grid from "../Grid";
import VisuallyHidden from "../VisuallyHidden";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  showCircles: true,
  disabled: false,
  isValid: true
};

function RadioCircle({ color, isChecked }) {
  const theme = useTheme();

  return (
    <svg
      css={theme.radioGroupRadioCircle}
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
    >
      <circle
        css={theme[`radioGroupRadioOuterCircle.${color}`]}
        cx="12"
        cy="12"
        r="12"
      />
      {isChecked && (
        <circle css={theme.radioGroupRadioInnerCircle} cx="12" cy="12" r="6" />
      )}
    </svg>
  );
}

RadioCircle.propTypes = {
  color: PropTypes.oneOf(["white", "secondary.lightBlue.t30"]).isRequired,
  isChecked: PropTypes.bool.isRequired
};

function Radio({
  color,
  isOneLine,
  showCircle,
  name,
  label,
  isChecked,
  disabled,
  onFocus,
  onBlur,
  value,
  onChange
}) {
  const theme = useTheme();
  const [inputId] = useState(() => `radio-input-${nanoid()}`);

  return (
    <div css={theme.radioGroupRadio} role="radio" aria-checked={isChecked}>
      <VisuallyHidden>
        <input
          css={{
            ":focus-visible + label":
              theme["radioGroupRadioLabel.focus-visible"],
            ":checked + label": theme["radioGroupRadioLabel.checked"]
          }}
          type="radio"
          id={inputId}
          name={name}
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
          ...theme[`radioGroupRadioLabel.${color}`],
          ...(isOneLine &&
            !showCircle &&
            theme["radioGroupRadioLabel.oneLine.withoutCircle"])
        }}
        htmlFor={inputId}
      >
        {showCircle && (
          <RadioCircle
            color={
              color === "grey.t05" || isChecked
                ? "white"
                : "secondary.lightBlue.t30"
            }
            isChecked={isChecked}
          />
        )}
        {label}
      </label>
    </div>
  );
}

Radio.propTypes = {
  color: PropTypes.oneOf(COLORS).isRequired,
  isOneLine: PropTypes.bool.isRequired,
  showCircle: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

InternalRadioGroup.COLORS = COLORS;
InternalRadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

function InternalRadioGroup(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
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
    value: checkedValue,
    onChange
  } = props;
  const cols = columns === undefined ? options.length : columns;

  return (
    <div
      role="radiogroup"
      aria-invalid={isValid ? null : "true"}
      aria-labelledby={labelId}
      aria-describedby={describedBy}
    >
      <Grid cols={cols} colsGutter={1} rowsGutter={1}>
        {options.map(({ label, value }, index) => (
          <Grid.Item
            colSpan={index % cols}
            rowSpan={Math.floor(index / cols)}
            key={value}
          >
            <Radio
              color={color}
              isOneLine={cols === options.length}
              showCircle={showCircles}
              name={name}
              label={label}
              value={value}
              isChecked={value === checkedValue}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
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
  labelId: PropTypes.string.isRequired,
  auxId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  columns: PropTypes.number,
  color: PropTypes.oneOf(COLORS),
  showCircles: PropTypes.bool,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InternalRadioGroup;
