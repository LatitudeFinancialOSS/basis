import React, { useState, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useSelect } from "downshift";
import useBackground from "../hooks/useBackground";
import useField from "../hooks/internal/useField";
import useWindow from "../hooks/useWindow";
import { mergeProps, areDropdownOptionsValid } from "../utils/component";
import Field from "./internal/Field";
import InternalDropdown from "./internal/InternalDropdown";

const { COLORS } = InternalDropdown;

function isOptionSelected(options, value) {
  return options.findIndex((option) => option.value === value) > -1;
}

const DEFAULT_PROPS = {
  hideLabel: false,
  color: InternalDropdown.DEFAULT_PROPS.color,
  renderPlaceholder: InternalDropdown.DEFAULT_PROPS.renderPlaceholder,
  disabled: false,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  },
};

Dropdown.COLORS = COLORS;
Dropdown.DEFAULT_PROPS = DEFAULT_PROPS;

function Dropdown(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor,
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    hideLabel: (hideLabel) => typeof hideLabel === "boolean",
    color: (color) => COLORS.includes(color),
    renderPlaceholder: (renderPlaceholder) =>
      typeof renderPlaceholder === "function",
    renderOption: (renderOption) => typeof renderOption === "function",
    optionToString: (optionToString) => typeof optionToString === "function",
    helpText: (helpText) => typeof helpText === "string",
    disabled: (disabled) => typeof disabled === "boolean",
    options: (options) => areDropdownOptionsValid(options),
  });
  const {
    name,
    color,
    label,
    hideLabel,
    renderPlaceholder,
    renderOption,
    optionToString,
    options,
    helpText,
    disabled,
    validate,
    validateData,
    testId,
    __internal__focus,
    __internal__open,
    __internal__highlightedIndex,
  } = mergedProps;

  if (!options) {
    throw new Error(
      `Dropdown options should have the following format: [{ data: { ... }, value: "option-value" }, ...]`
    );
  }

  const [auxId] = useState(() => `dropdown-aux-${nanoid()}`);
  const isEmpty = useCallback(
    (value) => isOptionSelected(options, value) === false,
    [options]
  );
  const data = useMemo(
    () => ({
      isEmpty,
      ...(validateData && { data: validateData }),
    }),
    [isEmpty, validateData]
  );
  const { errors, hasErrors, onFocus, onBlur, onChange } = useField(
    "Dropdown",
    {
      name,
      disabled,
      optional: false,
      validate,
      data,
    }
  );
  const windowFromContext = useWindow();
  const buttonRef = useRef();
  const itemToString = useCallback(
    (option) => {
      return option ? optionToString(option) : "";
    },
    [optionToString]
  );
  const {
    isOpen,
    selectedItem: selectedOption,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString,
    onSelectedItemChange: ({ selectedItem: selectedOption }) => {
      onChange({
        target: buttonRef.current,
        value: selectedOption.value,
      });
    },
    environment: windowFromContext,
  });
  const isValid = !hasErrors;
  const describedBy = helpText || hasErrors ? auxId : null;
  const toggleButtonProps = getToggleButtonProps({
    onFocus,
    onBlur,
    onChange,
    disabled,
    "aria-invalid": isValid ? null : "true",
    "aria-describedby": describedBy,
    ref: buttonRef,
  });

  return (
    <Field
      optional={false}
      disabled={disabled}
      label={label}
      hideLabel={hideLabel}
      labelFor={toggleButtonProps.id}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalDropdown
        name={name}
        color={color}
        renderPlaceholder={renderPlaceholder}
        renderOption={renderOption}
        options={options}
        selectedOption={selectedOption}
        isOpen={isOpen}
        toggleButtonProps={toggleButtonProps}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        highlightedIndex={highlightedIndex}
        onFocus={onFocus}
        __internal__focus={__internal__focus}
        __internal__open={__internal__open}
        __internal__highlightedIndex={__internal__highlightedIndex}
      />
    </Field>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  renderPlaceholder: PropTypes.func,
  renderOption: PropTypes.func.isRequired,
  optionToString: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool,
  __internal__open: PropTypes.bool,
  __internal__highlightedIndex: PropTypes.number,
};

export default Dropdown;
