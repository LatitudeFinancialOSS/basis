import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Button } = allDesignSystem;
const { VARIANTS, COLORS, TYPES, DEFAULT_PROPS } = Button;
const scope = allDesignSystem;

const variantOptions = getRadioOptions(VARIANTS);
const colorOptions = getRadioOptions(COLORS);
const loadingOptions = getCheckboxOptions();
const disabledOptions = getCheckboxOptions();
const typeOptions = getRadioOptions(TYPES);

function ButtonPage() {
  const theme = useTheme();
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [loading, setLoading] = useState(DEFAULT_PROPS.loading);
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const [type, setType] = useState(DEFAULT_PROPS.type);
  const code = formatCode(`<Button ${nonDefaultProps([
    {
      prop: "variant",
      value: variant,
      defaultValue: DEFAULT_PROPS.variant,
    },
    {
      prop: "color",
      value: color,
      defaultValue: DEFAULT_PROPS.color,
    },
    {
      prop: "loading",
      value: loading,
      defaultValue: DEFAULT_PROPS.loading,
      type: "boolean",
    },
    {
      prop: "disabled",
      value: disabled,
      defaultValue: DEFAULT_PROPS.disabled,
      type: "boolean",
    },
    {
      prop: "type",
      value: type,
      defaultValue: DEFAULT_PROPS.type,
    },
  ])}
>
  ${
    variant === "icon"
      ? `<Icon name="cross" /><VisuallyHidden>Close</VisuallyHidden>`
      : "Button"
  }
</Button>`);

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
          heading="Variant"
          options={variantOptions.map(({ value, label }) => ({
            value,
            label,
            disabled:
              (color === "green" && value !== "primary") ||
              (color === "black" && value !== "secondary") ||
              (value === "icon" &&
                (color !== "highlight.blue.t100" || loading === true)),
          }))}
          selectedValue={variant}
          setSelectedValue={setVariant}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Color"
          options={colorOptions.map(({ value, label }) => ({
            value,
            label,
            disabled:
              (value === "green" &&
                (variant !== "primary" || loading === true)) ||
              (value === "black" && variant !== "secondary") ||
              (variant === "icon" && value !== "highlight.blue.t100"),
          }))}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Loading"
          options={loadingOptions.map(({ value, label }) => ({
            value,
            label,
            disabled:
              value === true && (variant === "icon" || color === "green"),
          }))}
          selectedValue={loading}
          setSelectedValue={setLoading}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Disabled"
          options={disabledOptions}
          selectedValue={disabled}
          setSelectedValue={setIsDisabled}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Type"
          options={typeOptions}
          selectedValue={type}
          setSelectedValue={setType}
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        bg={
          color === "black"
            ? "grey.t07"
            : color === "white"
            ? "primary.blue.t100"
            : "white"
        }
      />
    </>
  );
}

export default ButtonPage;
