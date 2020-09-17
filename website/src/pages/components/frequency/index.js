import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import CheckboxesSetting from "../../../components/CheckboxesSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Frequency } = allDesignSystem;
const { ALL_FREQUENCY_OPTIONS, COLORS, MODES, DEFAULT_PROPS } = Frequency;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const modeOptions = getRadioOptions(MODES);
const frequencyOptions = ALL_FREQUENCY_OPTIONS;
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function FrequencyPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [mode, setMode] = useState(DEFAULT_PROPS.mode);
  const [frequencies, setFrequencies] = useState(() => {
    return ALL_FREQUENCY_OPTIONS.reduce((acc, option) => {
      acc[option.value] = DEFAULT_PROPS[option.value];

      return acc;
    }, {});
  });
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
    function App() {
      const initialValues = {
        salary: {
          amount: "",
          frequency: ""
        }
      };

      return (
        <Form initialValues={initialValues}>
          <Frequency ${nonDefaultProps([
            {
              prop: "name",
              value: "salary",
            },
            {
              prop: "color",
              value: color,
              defaultValue: DEFAULT_PROPS.color,
            },
            {
              prop: "mode",
              value: mode,
              defaultValue: DEFAULT_PROPS.mode,
            },
            {
              prop: "label",
              value: "How much do you earn before tax?",
            },
            {
              prop: "annually",
              value: frequencies.annually,
              defaultValue: DEFAULT_PROPS.annually,
              type: "boolean",
            },
            {
              prop: "quarterly",
              value: frequencies.quarterly,
              defaultValue: DEFAULT_PROPS.quarterly,
              type: "boolean",
            },
            {
              prop: "monthly",
              value: frequencies.monthly,
              defaultValue: DEFAULT_PROPS.monthly,
              type: "boolean",
            },
            {
              prop: "fortnightly",
              value: frequencies.fortnightly,
              defaultValue: DEFAULT_PROPS.fortnightly,
              type: "boolean",
            },
            {
              prop: "weekly",
              value: frequencies.weekly,
              defaultValue: DEFAULT_PROPS.weekly,
              type: "boolean",
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
                ? "Please be as accurate as possible."
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
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Mode"
          options={modeOptions}
          selectedValue={mode}
          setSelectedValue={setMode}
        />
        <CheckboxesSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Frequency"
          options={frequencyOptions}
          selectedValues={frequencies}
          setSelectedValues={setFrequencies}
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
        scope={scope}
        bg={color === "white" ? "grey.t05" : "white"}
      />
    </>
  );
}

export default FrequencyPage;
