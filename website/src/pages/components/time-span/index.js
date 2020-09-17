import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, TimeSpan } = allDesignSystem;
const { COLORS, DEFAULT_PROPS } = TimeSpan;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function TimeSpanPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
    function App() {
      const initialValues = {
        liveInCurrentAddress: {
          years: "",
          months: ""
        }
      };

      return (
        <Form initialValues={initialValues}>
          <TimeSpan ${nonDefaultProps([
            {
              prop: "name",
              value: "liveInCurrentAddress",
            },
            {
              prop: "color",
              value: color,
              defaultValue: DEFAULT_PROPS.color,
            },
            {
              prop: "label",
              value: "How long do you live in the current address?",
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

export default TimeSpanPage;
