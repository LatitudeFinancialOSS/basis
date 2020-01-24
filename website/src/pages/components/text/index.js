import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens, Text } = allDesignSystem;
const { INTENTS, ALIGNS, DEFAULT_PROPS, allowedColors, allowedWeights } = Text;
const scope = allDesignSystem;

const intentOptions = getRadioOptions(INTENTS);
const sizeOptions = getRadioOptions(["1", "2", "3", "4", "5", "6"]);
const alignOptions = getRadioOptions(ALIGNS);
const wrapOptions = getCheckboxOptions();

function getAllowedWeightsForIntent(intent) {
  const item = allowedWeights.find(item => item.intent.includes(intent));

  return item ? item.allowedWeights : [];
}

function getAllowedColorsForIntent(intent) {
  const item = allowedColors.find(item => item.intent.includes(intent));

  return item ? item.allowedColors : [];
}

function TextPage() {
  const [intent, setIntent] = useState(DEFAULT_PROPS.intent);
  const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(intent);
  const [size, setSize] = useState(isHeading ? intent[1] : null);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [align, setAlign] = useState(DEFAULT_PROPS.align);
  const [weight, setWeight] = useState(DEFAULT_PROPS.weight);
  const colorOptions = getRadioOptions(getAllowedColorsForIntent(intent));
  const weightOptions = getRadioOptions(getAllowedWeightsForIntent(intent));
  const [wrap, setWrap] = useState(DEFAULT_PROPS.wrap);
  const setIntentAndResetValues = intent => {
    setIntent(intent);

    if (!getAllowedColorsForIntent(intent).includes(color)) {
      setColor(DEFAULT_PROPS.color);
    }

    if (!getAllowedWeightsForIntent(intent).includes(weight)) {
      setWeight(DEFAULT_PROPS.weight);
    }

    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(intent)) {
      setSize(intent[1]);
    }
  };
  const code = formatCode(
    `<Text ${nonDefaultProps([
      {
        prop: "intent",
        value: intent,
        defaultValue: DEFAULT_PROPS.intent
      },
      {
        prop: "size",
        value: size,
        defaultValue: isHeading ? intent[1] : null
      },
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color
      },
      {
        prop: "align",
        value: align,
        defaultValue: DEFAULT_PROPS.align
      },
      {
        prop: "weight",
        value: weight,
        defaultValue: DEFAULT_PROPS.weight
      },
      {
        prop: "wrap",
        value: wrap,
        defaultValue: DEFAULT_PROPS.wrap,
        type: "boolean"
      }
    ])}
>
  The <strong>quick</strong> brown fox jumps over the lazy dog.
  The quick brown fox jumps over the lazy dog.
</Text>`
  );

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
          heading="Intent"
          options={intentOptions}
          selectedValue={intent}
          setSelectedValue={setIntentAndResetValues}
        />
        {isHeading && (
          <RadioGroupSetting
            css={{ marginLeft: designTokens.space[13] }}
            heading="Size"
            options={sizeOptions}
            selectedValue={size}
            setSelectedValue={setSize}
          />
        )}
        {colorOptions.length > 1 && (
          <RadioGroupSetting
            css={{ marginLeft: designTokens.space[13] }}
            heading="Color"
            options={colorOptions}
            selectedValue={color}
            setSelectedValue={setColor}
          />
        )}
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Align"
          options={alignOptions}
          selectedValue={align}
          setSelectedValue={setAlign}
        />
        {weightOptions.length > 1 && (
          <RadioGroupSetting
            css={{ marginLeft: designTokens.space[13] }}
            heading="Weight"
            options={weightOptions}
            selectedValue={weight}
            setSelectedValue={setWeight}
          />
        )}
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Wrap"
          options={wrapOptions}
          selectedValue={wrap}
          setSelectedValue={setWrap}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        width="sm"
        backgroundColor={
          color === "white"
            ? designTokens.colors.primary.blue.t100
            : designTokens.colors.white
        }
      />
    </>
  );
}

export default TextPage;
