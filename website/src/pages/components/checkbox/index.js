import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { COLORS, DEFAULT_PROPS } from "basis/components/Checkbox";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const hasLabelOptions = getCheckboxOptions();
const colorOptions = getRadioOptions(COLORS);
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function CheckboxPage() {
  const [hasLabel, setHasLabel] = useState(true);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [isOptional, setIsOptional] = useState(DEFAULT_PROPS.isOptional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [isDisabled, setIsDisabled] = useState(DEFAULT_PROPS.isDisabled);
  const code = formatCode(`
  function App() {
    const [agreedToTerms, setAgreedToTerms] = React.useState({
      value: false
    });

    return (
      <Checkbox ${nonDefaultProps([
        {
          prop: "label",
          value: hasLabel ? "Accept terms and conditions" : DEFAULT_PROPS.label,
          defaultValue: DEFAULT_PROPS.label
        },
        {
          prop: "color",
          value: color,
          defaultValue: DEFAULT_PROPS.color
        },
        {
          prop: "isOptional",
          value: isOptional,
          defaultValue: DEFAULT_PROPS.isOptional,
          type: "boolean"
        },
        {
          prop: "helpText",
          value: hasHelpText ? "Help text" : DEFAULT_PROPS.helpText,
          defaultValue: DEFAULT_PROPS.helpText
        },
        {
          prop: "isDisabled",
          value: isDisabled,
          defaultValue: DEFAULT_PROPS.isDisabled,
          type: "boolean"
        }
      ])}
        data={agreedToTerms}
        onChange={setAgreedToTerms}
      >
        I agree
      </Checkbox>
    );
  }
`);

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
          heading="Label"
          options={hasLabelOptions}
          selectedValue={hasLabel}
          setSelectedValue={setHasLabel}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Optional"
          options={isOptionalOptions}
          selectedValue={isOptional}
          setSelectedValue={setIsOptional}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Help Text"
          options={hasHelpTextOptions}
          selectedValue={hasHelpText}
          setSelectedValue={setHasHelpText}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Disabled"
          options={isDisabledOptions}
          selectedValue={isDisabled}
          setSelectedValue={setIsDisabled}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        backgroundColor={
          color === "white"
            ? designTokens.colors.grey.t05
            : designTokens.colors.white
        }
      />
    </>
  );
}

export default CheckboxPage;
