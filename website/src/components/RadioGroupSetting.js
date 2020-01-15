import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import { Text, designTokens } from "basis";

export const getRadioOptions = (values, { emptyLabel } = {}) =>
  values.map(value => ({
    value,
    label: value === "" ? emptyLabel : String(value)
  }));

export const getCheckboxOptions = () => [
  { value: false, label: "no" },
  { value: true, label: "yes" }
];

function Option({ value, name, checked, label, onChange }) {
  const [id] = useState(`radio-${nanoid()}`);

  return (
    <div
      css={{
        paddingTop: designTokens.space[1],
        paddingBottom: designTokens.space[1],
        whiteSpace: "nowrap"
      }}
    >
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label
        css={{ marginLeft: designTokens.space[2], verticalAlign: "middle" }}
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
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

function RadioGroupSetting({
  className,
  heading,
  options,
  selectedValue,
  setSelectedValue,
  type = "string"
}) {
  const onChange = e => {
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
      <Text weight="bold" color="grey.t75" margin="0 0 2 0">
        {heading.toUpperCase()}
      </Text>
      {options.map(({ value, label }) => (
        <Option
          value={String(value)}
          name={heading}
          checked={value === selectedValue}
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
        PropTypes.bool
      ]).isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["string", "number", "boolean"])
};

export default RadioGroupSetting;
