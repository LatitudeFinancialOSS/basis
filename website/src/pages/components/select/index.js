import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { COLORS, DEFAULT_PROPS } from "basis/components/Select";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const isFullWidthOptions = getCheckboxOptions();
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function SelectPage() {
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [isFullWidth, setIsFullWidth] = useState(DEFAULT_PROPS.isFullWidth);
  const [isOptional, setIsOptional] = useState(DEFAULT_PROPS.isOptional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [isDisabled, setIsDisabled] = useState(DEFAULT_PROPS.isDisabled);
  const code = formatCode(`
  const options = [
    { 
      label: 'Single',
      value: 'single'
    },
    { 
      label: 'Married',
      value: 'married'
    },
    { 
      label: 'Other',
      value: 'other'
    },
  ];
  
  function App() {
    const [relationshipStatus, setRelationshipStatus] = React.useState({
      value: ""
    });

    return (
      <Select ${nonDefaultProps([
        {
          prop: "label",
          value: "Relationship status"
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
          prop: "isOptional",
          value: isOptional,
          defaultValue: DEFAULT_PROPS.isOptional,
          type: "boolean"
        },
        {
          prop: "helpText",
          value: hasHelpText
            ? "We use this to recommend more relevant deals."
            : DEFAULT_PROPS.helpText,
          defaultValue: DEFAULT_PROPS.helpText
        },
        {
          prop: "isDisabled",
          value: isDisabled,
          defaultValue: DEFAULT_PROPS.isDisabled,
          type: "boolean"
        }
      ])}
        placeholder="Please select"
        options={options}
        data={relationshipStatus}
        onChange={setRelationshipStatus}
      />
    );
  }

  render(<App />);
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
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Full Width"
          options={isFullWidthOptions}
          selectedValue={isFullWidth}
          setSelectedValue={setIsFullWidth}
          type="boolean"
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
        noInline={true}
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

export default SelectPage;
