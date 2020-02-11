import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import Grid from "./Grid";
import VisuallyHidden from "./VisuallyHidden";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  showCircles: true,
  optional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ optional }) => !optional,
      validator: (value, { isTouched, props }) => {
        if (!isTouched) {
          return null;
        }

        const selectedOption = props.options.find(
          option => option.value === value
        );

        if (!selectedOption) {
          return "Please make a selection.";
        }

        return null;
      }
    }
  ]
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
  isDisabled,
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
          disabled={isDisabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => {
            onChange(e.target.value);
          }}
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
  isDisabled: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

RadioGroup.COLORS = COLORS;
RadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

function RadioGroup(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    showCircles: showCircles => typeof showCircles === "boolean",
    optional: optional => typeof optional === "boolean",
    isDisabled: isDisabled => typeof isDisabled === "boolean"
  });
  const {
    label,
    options,
    columns,
    color,
    showCircles,
    optional,
    helpText,
    isDisabled,
    onFocus,
    onBlur,
    data,
    onChange,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [auxId] = useState(() => `radio-group-aux-${nanoid()}`);
  const [radioName] = useState(() => `radio-name-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value: checkedValue, errors } = data;
  const validate = useValidation({
    props: mergedProps,
    extraData: {
      isTouched,
      props: mergedProps
    }
  });
  const onRadioFocus = () => {
    setIsTouched(true);
    onFocus && onFocus();
  };
  const onRadioBlur = () => {
    validate();
    onBlur && onBlur();
  };
  const cols = columns === undefined ? options.length : columns;

  return (
    <Field
      optional={optional}
      isDisabled={isDisabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <div
        role="radiogroup"
        aria-invalid={errors ? "true" : null}
        aria-labelledby={labelId}
        aria-describedby={helpText || errors ? auxId : null}
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
                name={radioName}
                label={label}
                value={value}
                isChecked={value === checkedValue}
                isDisabled={isDisabled}
                onFocus={onRadioFocus}
                onBlur={onRadioBlur}
                onChange={value => {
                  onChange({
                    ...data,
                    value
                  });
                }}
              />
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </Field>
  );
}

RadioGroup.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  columns: PropTypes.number,
  color: PropTypes.oneOf(COLORS),
  showCircles: PropTypes.bool,
  optional: PropTypes.bool,
  helpText: PropTypes.string,
  isDisabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.func,
      validator: PropTypes.func.isRequired
    })
  ),
  data: PropTypes.shape({
    value: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string
};

export default RadioGroup;
