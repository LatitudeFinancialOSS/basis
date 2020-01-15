import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { COLORS, DEFAULT_PROPS } from "basis/components/RadioGroup";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const columnsOptions = getRadioOptions(["Unspecified", 1, 2, 3]);
const showCirclesOptions = getCheckboxOptions();
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function RadioGroupPage() {
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [columns, setColumns] = useState("Unspecified");
  const [showCircles, setShowCircles] = useState(DEFAULT_PROPS.showCircles);
  const [isOptional, setIsOptional] = useState(DEFAULT_PROPS.isOptional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [isDisabled, setIsDisabled] = useState(DEFAULT_PROPS.isDisabled);
  const code = formatCode(`
  const options = [
    { 
      label: 'Yes',
      value: 'yes'
    },
    { 
      label: 'No',
      value: 'no'
    },
    { 
      label: 'Maybe',
      value: 'maybe'
    },
    { 
      label: 'Not sure',
      value: 'not-sure'
    },
    { 
      label: 'Can\\'t tell',
      value: 'cant-tell'
    }
  ];
  
  function App() {
    const [hungry, setHungry] = React.useState({
      value: ""
    });

    return (
      <RadioGroup ${nonDefaultProps([
        {
          prop: "label",
          value: "Are you hungry?"
        },
        {
          prop: "color",
          value: color,
          defaultValue: DEFAULT_PROPS.color
        },
        {
          prop: "columns",
          value: columns,
          defaultValue: "Unspecified",
          type: "number"
        },
        {
          prop: "showCircles",
          value: showCircles,
          defaultValue: DEFAULT_PROPS.showCircles,
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
          value: hasHelpText ? "Be true to yourself." : DEFAULT_PROPS.helpText,
          defaultValue: DEFAULT_PROPS.helpText
        },
        {
          prop: "isDisabled",
          value: isDisabled,
          defaultValue: DEFAULT_PROPS.isDisabled,
          type: "boolean"
        }
      ])}
        options={options}
        data={hungry}
        onChange={setHungry}
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
          heading="Columns"
          options={columnsOptions}
          selectedValue={columns}
          setSelectedValue={setColumns}
          type="number"
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Show Circles"
          options={showCirclesOptions}
          selectedValue={showCircles}
          setSelectedValue={setShowCircles}
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
        width="md"
        backgroundColor={
          color === "white"
            ? designTokens.colors.grey.t05
            : designTokens.colors.white
        }
      />
    </>
  );
}

export default RadioGroupPage;
