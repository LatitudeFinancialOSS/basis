import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import Field from "./internal/Field";
import Grid from "./Grid";
import VisuallyHidden from "./VisuallyHidden";
import useContainer from "../hooks/useContainer";
import useTheme from "../hooks/useTheme";
import useValidation from "../hooks/useValidation";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  showCircles: true,
  isOptional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ isOptional }) => !isOptional,
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

function RadioGroup(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    label,
    options,
    columns,
    showCircles,
    isOptional,
    helpText,
    isDisabled,
    onFocus,
    onBlur,
    data,
    onChange,
    testId
  } = props;
  const { inputColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && inputColor ? inputColor : props.color;
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [auxId] = useState(() => `radio-group-aux-${nanoid()}`);
  const [radioName] = useState(() => `radio-name-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value: checkedValue, errors } = data;
  const validate = useValidation({
    props,
    extraData: {
      isTouched,
      props
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
      isOptional={isOptional}
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
  isOptional: PropTypes.bool,
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
