import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, RadioGroup } = allDesignSystem;
const { COLORS, DEFAULT_PROPS } = RadioGroup;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const columnsOptions = getRadioOptions(["Unspecified", 1, 2, 3]);
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function RadioGroupPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [columns, setColumns] = useState("Unspecified");
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
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
      const initialValues = {
        hungry: ""
      };
      
      return (
        <Form initialValues={initialValues}>
          <RadioGroup ${nonDefaultProps([
            {
              prop: "name",
              value: "hungry",
            },
            {
              prop: "label",
              value: "Are you hungry?",
            },
            {
              prop: "color",
              value: color,
              defaultValue: DEFAULT_PROPS.color,
            },
            {
              prop: "columns",
              value: columns,
              defaultValue: "Unspecified",
              type: "number",
            },
            {
              prop: "optional",
              value: optional,
              defaultValue: DEFAULT_PROPS.optional,
              type: "boolean",
            },
            {
              prop: "helpText",
              value: hasHelpText
                ? "Be true to yourself."
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
            options={options}
          />
        </Form>
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
          padding: `${theme.space[5]} ${theme.space[6]}`,
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
          heading="Columns"
          options={columnsOptions}
          selectedValue={columns}
          setSelectedValue={setColumns}
          type="number"
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
          selectedValue={disabled}
          setSelectedValue={setIsDisabled}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        noInline
        scope={scope}
        width="md"
        bg={color === "white" ? "grey.t05" : "white"}
      />
    </>
  );
}

export default RadioGroupPage;
