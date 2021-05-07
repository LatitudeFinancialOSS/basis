import React, { useState, useMemo, useCallback, ReactNode } from "react";
import { nanoid } from "nanoid";
import useField from "../hooks/internal/useField";
import { mergeProps, areOptionsValid } from "../utils/component";
import Field from "./internal/Field";
import InternalRadioGroup from "./internal/InternalRadioGroup";

const { COLORS } = InternalRadioGroup;

// @ts-ignore
function isOptionSelected(options, value) {
  // @ts-ignore
  return options.findIndex((option) => option.value === value) > -1;
}

const DEFAULT_PROPS = {
  color: InternalRadioGroup.DEFAULT_PROPS.color,
  disabled: false,
  optional: false,
  // @ts-ignore
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  },
};

RadioGroup.COLORS = COLORS;
RadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

type Options =
  | {
      label: string;
      description?: ReactNode;
      value: string;
    }[]
  | {
      label: ReactNode;
      value: string;
    }[]
  | Readonly<
      {
        label: string;
        description?: ReactNode;
        value: string;
      }[]
    >
  | Readonly<
      {
        label: ReactNode;
        value: string;
      }[]
    >;

interface Props {
  // TODO color needs to be typed based on COLORS
  color?: string;
  // options: Option[] | Readonly<Option[]>;
  options: Options;
  // TODO Let's type it properly later!
  [key: string]: any;
}

function RadioGroup(props: Props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      // @ts-ignore
      color: (color) => COLORS.includes(color),
      // @ts-ignore
      disabled: (disabled) => typeof disabled === "boolean",
      // @ts-ignore
      optional: (optional) => typeof optional === "boolean",
      // @ts-ignore
      options: (options) => areOptionsValid(options),
    }
  );
  const {
    name,
    label,
    options,
    columns,
    helpText,
    disabled,
    optional,
    validate,
    validateData,
    onChange: onChangeProp,
    testId,
  } = mergedProps;

  if (!options) {
    throw new Error("RadioGroup options are invalid");
  }

  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [auxId] = useState(() => `radio-group-aux-${nanoid()}`);
  // @ts-ignore
  const cols = options.some((option) => option.description)
    ? 1
    : columns === undefined
    ? options.length
    : columns;
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
    onMouseDown,
  } = useField("RadioGroup", {
    name,
    disabled,
    optional,
    validate,
    data,
  });
  const onChange = useCallback(
    (event) => {
      fieldOnChange(event);

      const selectedValue = event.target.value;
      const selectedOption = options.find(
        // @ts-ignore
        (option) => option.value === selectedValue
      );

      onChangeProp && onChangeProp({ selectedOption });
    },
    [fieldOnChange, onChangeProp, options]
  );

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalRadioGroup
        name={name}
        labelId={labelId}
        options={options}
        columns={cols}
        color={props.color}
        disabled={disabled}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : null}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}

// RadioGroup.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   options: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.string.isRequired,
//         description: PropTypes.node,
//         value: PropTypes.string.isRequired,
//       })
//     ),
//     PropTypes.arrayOf(
//       PropTypes.shape({
//         label: PropTypes.node.isRequired,
//         value: PropTypes.string.isRequired,
//       })
//     ),
//   ]).isRequired,
//   columns: (props) => {
//     if (props.columns !== undefined) {
//       if (typeof props.columns !== "number") {
//         return new Error(
//           `RadioGroup: columns must be a number (${typeof props.columns} found)`
//         );
//       }

//       if (
//         props.columns !== 1 &&
//         props.options.some((option) => option.description)
//       ) {
//         return new Error(
//           `RadioGroup: option's description can only be used when columns={1}`
//         );
//       }
//     }
//   },
//   color: PropTypes.oneOf(COLORS),
//   helpText: PropTypes.string,
//   disabled: PropTypes.bool,
//   optional: PropTypes.bool,
//   validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
//   validateData: PropTypes.any,
//   onChange: PropTypes.func,
//   testId: PropTypes.string,
// };

export default RadioGroup;
