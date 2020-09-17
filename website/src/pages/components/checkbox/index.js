import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Checkbox } = allDesignSystem;
const { COLORS, DEFAULT_PROPS } = Checkbox;
const scope = allDesignSystem;

const hideLabelOptions = getCheckboxOptions();
const colorOptions = getRadioOptions(COLORS);
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function CheckboxPage() {
  const theme = useTheme();
  const [hideLabel, setHideLabel] = useState(DEFAULT_PROPS.hideLabel);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
  function App() {
    const initialValues = {
      agreedToTerms: false
    };

    return (
      <Form initialValues={initialValues}>
        <Checkbox ${nonDefaultProps([
          {
            prop: "name",
            value: "agreedToTerms",
          },
          {
            prop: "label",
            value: "Accept terms and conditions",
          },
          {
            prop: "hideLabel",
            value: hideLabel,
            defaultValue: DEFAULT_PROPS.hideLabel,
            type: "boolean",
          },
          {
            prop: "color",
            value: color,
            defaultValue: DEFAULT_PROPS.color,
          },
          {
            prop: "optional",
            value: optional,
            defaultValue: DEFAULT_PROPS.optional,
            type: "boolean",
          },
          {
            prop: "helpText",
            value: hasHelpText ? "Help text" : DEFAULT_PROPS.helpText,
            defaultValue: DEFAULT_PROPS.helpText,
          },
          {
            prop: "disabled",
            value: disabled,
            defaultValue: DEFAULT_PROPS.disabled,
            type: "boolean",
          },
        ])}
        >
          I agree
        </Checkbox>
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
          heading="Hide Label"
          options={hideLabelOptions}
          selectedValue={hideLabel}
          setSelectedValue={setHideLabel}
          type="boolean"
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

export default CheckboxPage;
