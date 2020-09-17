import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Dropdown } = allDesignSystem;
const { COLORS, DEFAULT_PROPS } = Dropdown;
const scope = allDesignSystem;

const hideLabelOptions = getCheckboxOptions();
const colorOptions = getRadioOptions(COLORS);
const hasHelpTextOptions = getCheckboxOptions();
const isDisabledOptions = getCheckboxOptions();

function DropdownPage() {
  const theme = useTheme();
  const [hideLabel, setHideLabel] = useState(DEFAULT_PROPS.hideLabel);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [hasHelpText, setHasHelpText] = useState(
    Boolean(DEFAULT_PROPS.helpText)
  );
  const [disabled, setIsDisabled] = useState(DEFAULT_PROPS.disabled);
  const code = formatCode(`
    const accountOptions = [
      { 
        data: {
          name: "28 Degrees Platinum Mastercard",
          description: "Shop with less obstacles."
        },
        value: "28-degrees-platinum-mastercard"
      },
      {
        data: {
          name: "Latitude Mastercard",
          description: "Choose what you want, when you want it."
        },
        value: "latitude-mastercard"
      },
      { 
        data: {
          name: "Gem Visa",
          description: "6 months interest free shopping."
        },
        value: "gem-visa"
      },
      { 
        data: {
          name: "GO Mastercard",
          description: "Flexible repayment options to suit your budget."
        },
        value: "go-mastercard"
      }
    ];

    function accountOptionToString({ data }) {
      return data.name;
    }

    function AccountOption({ data }) {
      const { name, description } = data;

      return (
        <Grid cols="100px 1fr" colsGap="5">
          <Grid.Item colSpan="0" rowSpan="0-1">
            <Placeholder label="Image" width="100%" height="100%" />
          </Grid.Item>
          <Grid.Item colSpan="1" rowSpan="0">
            <Text>
              <strong>{name}</strong>
            </Text>
          </Grid.Item>
          <Grid.Item colSpan="1" rowSpan="1">
            <Text textStyle="body2" color="grey.t75">
              {description}
            </Text>
          </Grid.Item>
        </Grid>
      );
    };

    const initialValues = {
      account: ""
    };
    
    function App() {
      return (
        <Form initialValues={initialValues}>
          <Dropdown ${nonDefaultProps([
            {
              prop: "name",
              value: "account",
            },
            {
              prop: "label",
              value: "Account",
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
              prop: "helpText",
              value: hasHelpText
                ? "Direct debit will go into this account."
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
            options={accountOptions}
            optionToString={accountOptionToString}
            optionComponent={AccountOption}
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
        width="sm"
        bg={color === "white" ? "grey.t05" : "white"}
      />
    </>
  );
}

export default DropdownPage;
