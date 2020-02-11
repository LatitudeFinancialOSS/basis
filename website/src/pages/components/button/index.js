import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Button } = allDesignSystem;
const { VARIANTS, COLORS, TYPES, DEFAULT_PROPS } = Button;
const scope = allDesignSystem;

const variantOptions = getRadioOptions(VARIANTS);
const colorOptions = getRadioOptions(COLORS);
const fullWidthOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();
const typeOptions = getRadioOptions(TYPES);

function ButtonPage() {
  const theme = useTheme();
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [fullWidth, setFullWidth] = useState(DEFAULT_PROPS.fullWidth);
  const [isDisabled, setIsDisabled] = useState(DEFAULT_PROPS.isDisabled);
  const [type, setType] = useState(DEFAULT_PROPS.type);
  const code = formatCode(`<Button ${nonDefaultProps([
    {
      prop: "variant",
      value: variant,
      defaultValue: DEFAULT_PROPS.variant
    },
    {
      prop: "color",
      value: color,
      defaultValue: DEFAULT_PROPS.color
    },
    {
      prop: "fullWidth",
      value: fullWidth,
      defaultValue: DEFAULT_PROPS.fullWidth,
      type: "boolean"
    },
    {
      prop: "isDisabled",
      value: isDisabled,
      defaultValue: DEFAULT_PROPS.isDisabled,
      type: "boolean"
    },
    {
      prop: "type",
      value: type,
      defaultValue: DEFAULT_PROPS.type
    }
  ])}
>
  Button
</Button>`);

  return (
    <>
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${theme.space[5]} ${theme.space[6]}`
        }}
      >
        <RadioGroupSetting
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
          heading="Full Width"
          options={fullWidthOptions}
          selectedValue={fullWidth}
          setSelectedValue={setFullWidth}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Disabled"
          options={isDisabledOptions}
          selectedValue={isDisabled}
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
        backgroundColor={
          color === "white"
            ? theme.colors.primary.blue.t100
            : theme.colors.white
        }
      />
    </>
  );
}

export default ButtonPage;
