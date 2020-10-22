import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Input } = allDesignSystem;
const { TYPES, VARIANTS, COLORS, DEFAULT_PROPS } = Input;
const scope = allDesignSystem;

const typeOptions = getRadioOptions(TYPES);
const variantOptions = getRadioOptions(VARIANTS);
const colorOptions = getRadioOptions(COLORS);
const isOptionalOptions = getCheckboxOptions();
const hasPlaceholderOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function InputPage() {
  const theme = useTheme();
  const [type, setType] = useState(DEFAULT_PROPS.type);
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
  const [hasPlaceholder, setHasPlaceholder] = useState(
    Boolean(DEFAULT_PROPS.placeholder)
  );
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
    function App() {
      const initialValues = {
        ${
          variant === "numeric"
            ? "newCreditLimit"
            : variant === "decimal"
            ? "amount"
            : "name"
        }: ""
      };
      
      return (
        <Form initialValues={initialValues}>
          <Input ${nonDefaultProps([
            {
              prop: "name",
              value:
                variant === "numeric"
                  ? "newCreditLimit"
                  : variant === "decimal"
                  ? "amount"
                  : "name",
            },
            {
              prop: "type",
              value: type,
              defaultValue: DEFAULT_PROPS.type,
            },
            {
              prop: "variant",
              value: variant,
              defaultValue: DEFAULT_PROPS.variant,
            },
            ...(variant === "numeric" || variant === "decimal"
              ? [
                  {
                    prop: "prefix",
                    value: "$",
                  },
                ]
              : []),
            {
              prop: "color",
              value: color,
              defaultValue: DEFAULT_PROPS.color,
            },
            {
              prop: "label",
              value:
                variant === "numeric"
                  ? "New credit limit"
                  : variant === "decimal"
                  ? "Amount"
                  : "Name",
            },
            {
              prop: "optional",
              value: optional,
              defaultValue: DEFAULT_PROPS.optional,
              type: "boolean",
            },
            {
              prop: "placeholder",
              value: hasPlaceholder
                ? variant === "numeric"
                  ? "e.g. 400"
                  : variant === "decimal"
                  ? "e.g. 400 or 546.50"
                  : "e.g. David Smith"
                : DEFAULT_PROPS.placeholder,
              defaultValue: DEFAULT_PROPS.placeholder,
            },
            {
              prop: "helpText",
              value: hasHelpText
                ? variant === "numeric"
                  ? "Must be a whole amount."
                  : variant === "decimal"
                  ? "Can be a whole number or contain cents."
                  : "Nickname is fine too."
                : DEFAULT_PROPS.helpText,
              defaultValue: DEFAULT_PROPS.helpText,
            },
            {
              prop: "disabled",
              value: disabled,
              defaultValue: DEFAULT_PROPS.disabled,
              type: "boolean",
            },
          ])}
          />
        </Form>
      );
    }
  `);

  return (
    <>
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${theme.space[5]} ${theme.space[6]}`,
        }}
      >
        <RadioGroupSetting
          heading="Type"
          options={typeOptions}
          selectedValue={type}
          setSelectedValue={setType}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Variant"
          options={variantOptions}
          selectedValue={variant}
          setSelectedValue={setVariant}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Optional"
          options={isOptionalOptions}
          selectedValue={optional}
          setSelectedValue={setIsOptional}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Placeholder"
          options={hasPlaceholderOptions}
          selectedValue={hasPlaceholder}
          setSelectedValue={setHasPlaceholder}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Help Text"
          options={hasHelpTextOptions}
          selectedValue={hasHelpText}
          setSelectedValue={setHasHelpText}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Disabled"
          options={isDisabledOptions}
          selectedValue={disabled}
          setSelectedValue={setIsDisabled}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        bg={color === "white" ? "grey.t05" : "white"}
      />
    </>
  );
}

export default InputPage;
