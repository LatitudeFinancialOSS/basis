import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import { Container, Text, designTokens } from "basis";

function Checkbox({ value, checked, label, onChange }) {
  const [id] = useState(`checkbox-${nanoid()}`);

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
        type="checkbox"
        value={value}
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

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

function CheckboxesSetting({
  className,
  heading,
  options,
  selectedValues,
  setSelectedValues
}) {
  const onChange = e => {
    setSelectedValues({
      ...selectedValues,
      [e.target.value]: !selectedValues[e.target.value]
    });
  };

  return (
    <div className={className}>
      <Container margin="0 0 2 0">
        <Text weight="bold" color="grey.t75">
          {heading.toUpperCase()}
        </Text>
      </Container>
      {options.map(({ value, label }) => (
        <Checkbox
          value={value}
          checked={selectedValues[value]}
          label={label}
          onChange={onChange}
          key={value}
        />
      ))}
    </div>
  );
}

CheckboxesSetting.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedValues: PropTypes.objectOf(PropTypes.bool).isRequired,
  setSelectedValues: PropTypes.func.isRequired
};

export default CheckboxesSetting;
