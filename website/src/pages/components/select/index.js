import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Select } = allDesignSystem;
const { COLORS, DEFAULT_PROPS } = Select;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const fullWidthOptions = getCheckboxOptions();
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function SelectPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [fullWidth, setFullWidth] = useState(DEFAULT_PROPS.fullWidth);
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
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
          prop: "fullWidth",
          value: fullWidth,
          defaultValue: DEFAULT_PROPS.fullWidth,
          type: "boolean"
        },
        {
          prop: "optional",
          value: optional,
          defaultValue: DEFAULT_PROPS.optional,
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
          padding: `${theme.space[5]} ${theme.space[6]}`
        }}
      >
        <RadioGroupSetting
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
          heading="Optional"
          options={isOptionalOptions}
          selectedValue={optional}
          setSelectedValue={setIsOptional}
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
          color === "white" ? theme.colors.grey.t05 : theme.colors.white
        }
      />
    </>
  );
}

export default SelectPage;
