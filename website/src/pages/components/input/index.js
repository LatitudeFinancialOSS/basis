import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { COLORS, DEFAULT_PROPS } from "basis/components/Input";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const isOptionalOptions = getCheckboxOptions();
const hasPlaceholderOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function InputPage() {
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [isOptional, setIsOptional] = useState(DEFAULT_PROPS.isOptional);
  const [hasPlaceholder, setHasPlaceholder] = useState(
    Boolean(DEFAULT_PROPS.placeholder)
  );
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [isDisabled, setIsDisabled] = useState(DEFAULT_PROPS.isDisabled);
  const code = formatCode(`function App() {
  const [name, setName] = React.useState({
    value: ""
  });

  return (
    <Input ${nonDefaultProps([
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color
      },
      {
        prop: "label",
        value: "Name"
      },
      {
        prop: "isOptional",
        value: isOptional,
        defaultValue: DEFAULT_PROPS.isOptional,
        type: "boolean"
      },
      {
        prop: "placeholder",
        value: hasPlaceholder ? "e.g. David Smith" : DEFAULT_PROPS.placeholder,
        defaultValue: DEFAULT_PROPS.placeholder
      },
      {
        prop: "helpText",
        value: hasHelpText ? "Nickname is fine too." : DEFAULT_PROPS.helpText,
        defaultValue: DEFAULT_PROPS.helpText
      },
      {
        prop: "isDisabled",
        value: isDisabled,
        defaultValue: DEFAULT_PROPS.isDisabled,
        type: "boolean"
      }
    ])}
      data={name}
      onChange={setName}
    />
  );
}`);

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
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[11] }}
          heading="Optional"
          options={isOptionalOptions}
          selectedValue={isOptional}
          setSelectedValue={setIsOptional}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[11] }}
          heading="Placeholder"
          options={hasPlaceholderOptions}
          selectedValue={hasPlaceholder}
          setSelectedValue={setHasPlaceholder}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[11] }}
          heading="Help Text"
          options={hasHelpTextOptions}
          selectedValue={hasHelpText}
          setSelectedValue={setHasHelpText}
          type="boolean"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[11] }}
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

export default InputPage;
