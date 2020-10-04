import React, { useState, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useSelect } from "downshift";
import useField from "../hooks/internal/useField";
import useWindow from "../hooks/useWindow";
import { responsiveMaxHeightType } from "../hooks/useResponsiveProp";
import useAllResponsiveProps from "../hooks/useAllResponsiveProps";
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
  placeholderComponent: InternalDropdown.DEFAULT_PROPS.placeholderComponent,
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
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      hideLabel: (hideLabel) => typeof hideLabel === "boolean",
      color: (color) => COLORS.includes(color),
      placeholderComponent: (placeholderComponent) =>
        typeof placeholderComponent === "function",
      optionToString: (optionToString) => typeof optionToString === "function",
      optionComponent: (optionComponent) =>
        typeof optionComponent === "function",
      helpText: (helpText) => typeof helpText === "string",
      disabled: (disabled) => typeof disabled === "boolean",
      options: (options) => areDropdownOptionsValid(options),
      onChange: (onChange) => typeof onChange === "function",
    }
  );
  const {
    name,
    label,
    hideLabel,
    placeholderComponent,
    optionToString,
    optionComponent,
    options,
    helpText,
    disabled,
    validate,
    validateData,
    onChange: propsOnChange,
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
  const {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange: fieldOnChange,
  } = useField("Dropdown", {
    name,
    disabled,
    optional: false,
    validate,
    data,
  });
  const windowFromContext = useWindow();
  const buttonRef = useRef();
  const itemToString = useCallback(
    (option) => {
      return option ? optionToString(option) : "";
    },
    [optionToString]
  );
  const initialSelectedItem = options.find((option) => option.value === value);
  const {
    isOpen,
    selectedItem: selectedOption,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString,
    initialSelectedItem,
    onSelectedItemChange: ({ selectedItem: selectedOption }) => {
      fieldOnChange({
        target: buttonRef.current,
        value: selectedOption.value,
      });

      propsOnChange && propsOnChange({ selectedOption });
    },
    environment: windowFromContext,
  });
  const isValid = !hasErrors;
  const describedBy = helpText || hasErrors ? auxId : null;
  const toggleButtonProps = useMemo(
    () =>
      getToggleButtonProps({
        onFocus,
        onBlur,
        disabled,
        "aria-invalid": isValid ? null : "true",
        "aria-describedby": describedBy,
        ref: buttonRef,
      }),
    [getToggleButtonProps, onFocus, onBlur, disabled, isValid, describedBy]
  );
  const maxHeightProps = useAllResponsiveProps(props, "maxHeight");

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
        color={props.color}
        placeholderComponent={placeholderComponent}
        optionComponent={optionComponent}
        options={options}
        selectedOption={selectedOption}
        isOpen={isOpen}
        toggleButtonProps={toggleButtonProps}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        highlightedIndex={highlightedIndex}
        onFocus={onFocus}
        {...maxHeightProps}
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
  placeholderComponent: PropTypes.func,
  optionToString: PropTypes.func.isRequired,
  optionComponent: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  ...responsiveMaxHeightType,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool,
  __internal__open: PropTypes.bool,
  __internal__highlightedIndex: PropTypes.number,
};

export default Dropdown;
