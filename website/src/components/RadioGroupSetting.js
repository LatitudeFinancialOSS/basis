import React, { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useTheme, Text } from "basis";

export const getRadioOptions = (values) =>
  values.map((value) => ({
    value,
    label: String(value),
  }));

export const getCheckboxOptions = () => [
  { value: false, label: "no" },
  { value: true, label: "yes" },
];

function Option({ value, name, checked, disabled = false, label, onChange }) {
  const theme = useTheme();
  const [id] = useState(`radio-${nanoid()}`);

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        paddingTop: theme.space[1],
        paddingBottom: theme.space[1],
        whiteSpace: "nowrap",
      }}
    >
      <input
        css={{
          margin: 0,
        }}
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label
        css={{
          marginLeft: theme.space[2],
          ...(disabled && {
            color: theme.colors.grey.t65,
            cursor: "not-allowed",
          }),
        }}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function RadioGroupSetting({
  className,
  heading,
  options,
  selectedValue,
  setSelectedValue,
  type = "string",
}) {
  const onChange = (e) => {
    if (type === "boolean") {
      setSelectedValue(e.target.value === "true");
    } else if (type === "number") {
      setSelectedValue(
        e.target.value === "Unspecified"
          ? "Unspecified"
          : Number(e.target.value)
      );
    } else {
      setSelectedValue(e.target.value);
    }
  };

  return (
    <div className={className}>
      <Text color="grey.t75" margin="0 0 2 0">
        <strong>{heading.toUpperCase()}</strong>
      </Text>
      {options.map(({ value, label, disabled }) => (
        <Option
          value={String(value)}
          name={heading}
          checked={value === selectedValue}
          disabled={disabled}
          label={label}
          onChange={onChange}
          key={value}
        />
      ))}
    </div>
  );
}

RadioGroupSetting.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["string", "number", "boolean"]),
};

export default RadioGroupSetting;
