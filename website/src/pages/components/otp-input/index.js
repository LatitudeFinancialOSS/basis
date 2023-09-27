import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, OtpInput } = allDesignSystem;
const { DEFAULT_PROPS } = OtpInput;
const scope = allDesignSystem;

const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function OtpInputPage() {
  const theme = useTheme();
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);

  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
    function App() {
      const initialValues = {
        otp: ""
      };

      return (
        <Form initialValues={initialValues}>
          <OtpInput
            name="otp"
            ${nonDefaultProps([
              {
                prop: "optional",
                value: optional,
                defaultValue: DEFAULT_PROPS.optional,
                type: "boolean",
              },
              {
                prop: "helpText",
                value: "This is a beautiful help text",
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
      <ComponentContainer code={code} scope={scope} bg="white" />
    </>
  );
}

export default OtpInputPage;
