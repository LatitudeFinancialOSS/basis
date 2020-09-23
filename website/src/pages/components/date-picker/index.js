import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, DatePicker } = allDesignSystem;
const { COLORS, DAY_MODES, YEAR_MODES, DEFAULT_PROPS } = DatePicker;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const dayModeOptions = getRadioOptions(DAY_MODES);
const yearModeOptions = getRadioOptions(YEAR_MODES);
const isOptionalOptions = getCheckboxOptions();
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function DatePickerPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [dayMode, setDayMode] = useState(DEFAULT_PROPS.dayMode);
  const [yearMode, setYearMode] = useState(DEFAULT_PROPS.yearMode);
  const [optional, setIsOptional] = useState(DEFAULT_PROPS.optional);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
    function App() {
      const initialValues = {
        birthDate: {
          day: "",
          month: "",
          year: ""
        }
      };

      return (
        <Form initialValues={initialValues}>
          <DatePicker ${nonDefaultProps([
            {
              prop: "name",
              value: "birthDate",
            },
            {
              prop: "color",
              value: color,
              defaultValue: DEFAULT_PROPS.color,
            },
            {
              prop: "label",
              value: "Birth date",
            },
            {
              prop: "dayMode",
              value: dayMode,
              defaultValue: DEFAULT_PROPS.dayMode,
            },
            {
              prop: "yearMode",
              value: yearMode,
              defaultValue: DEFAULT_PROPS.yearMode,
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
                ? "Past or future is fine."
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
          heading="Day mode"
          options={dayModeOptions}
          selectedValue={dayMode}
          setSelectedValue={setDayMode}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Year mode"
          options={yearModeOptions}
          selectedValue={yearMode}
          setSelectedValue={setYearMode}
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

export default DatePickerPage;
