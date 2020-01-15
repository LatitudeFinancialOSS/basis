import React, { useState } from "react";
import * as allDesignSystem from "basis";
import {
  VARIANTS,
  COLORS,
  TYPES,
  DEFAULT_PROPS
} from "basis/components/Button";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const variantOptions = getRadioOptions(VARIANTS);
const colorOptions = getRadioOptions(COLORS);
const isFullWidthOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();
const typeOptions = getRadioOptions(TYPES);

function ButtonPage() {
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [isFullWidth, setIsFullWidth] = useState(DEFAULT_PROPS.isFullWidth);
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
      prop: "isFullWidth",
      value: isFullWidth,
      defaultValue: DEFAULT_PROPS.isFullWidth,
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
          padding: `${designTokens.space[5]} ${designTokens.space[6]}`
        }}
      >
        <RadioGroupSetting
          heading="Variant"
          options={variantOptions}
          selectedValue={variant}
          setSelectedValue={setVariant}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[12] }}
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[12] }}
          heading="Full Width"
          options={isFullWidthOptions}
          selectedValue={isFullWidth}
          setSelectedValue={setIsFullWidth}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[12] }}
          heading="Disabled"
          options={isDisabledOptions}
          selectedValue={isDisabled}
          setSelectedValue={setIsDisabled}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[12] }}
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
            ? designTokens.colors.highlight.blue.t100
            : designTokens.colors.white
        }
      />
    </>
  );
}

export default ButtonPage;
