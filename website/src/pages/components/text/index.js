import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Text } = allDesignSystem;
const { AS, TEXT_STYLES, ALIGNS, DEFAULT_PROPS, allowedColors } = Text;
const scope = allDesignSystem;

const asOptions = getRadioOptions(AS);
const textStyleOptions = getRadioOptions(TEXT_STYLES);
const alignOptions = getRadioOptions(ALIGNS);
const wrapOptions = getCheckboxOptions();

function getAllowedColorsForTextStyle(textStyle) {
  const item = allowedColors.find(({ textStyles }) =>
    textStyles.includes(textStyle)
  );

  return item?.allowedColors ?? [];
}

function TextPage() {
  const theme = useTheme();
  const [as, setAs] = useState(DEFAULT_PROPS.as);
  const [textStyle, setTextStyle] = useState(DEFAULT_PROPS.textStyle);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [align, setAlign] = useState(DEFAULT_PROPS.align);
  const colorOptions = getRadioOptions(getAllowedColorsForTextStyle(textStyle));
  const [wrap, setWrap] = useState(DEFAULT_PROPS.wrap);
  const setTextStyleAndResetValues = (textStyle) => {
    setTextStyle(textStyle);

    if (!getAllowedColorsForTextStyle(textStyle).includes(color)) {
      setColor(DEFAULT_PROPS.color);
    }
  };
  const code = formatCode(
    `<Text ${nonDefaultProps([
      {
        prop: "as",
        value: as,
        defaultValue: DEFAULT_PROPS.as,
      },
      {
        prop: "textStyle",
        value: textStyle,
        defaultValue: DEFAULT_PROPS.textStyle,
      },
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color,
      },
      {
        prop: "align",
        value: align,
        defaultValue: DEFAULT_PROPS.align,
      },
      {
        prop: "wrap",
        value: wrap,
        defaultValue: DEFAULT_PROPS.wrap,
        type: "boolean",
      },
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
          padding: `${theme.space[5]} ${theme.space[6]}`,
        }}
      >
        <RadioGroupSetting
          heading="As"
          options={asOptions}
          selectedValue={as}
          setSelectedValue={setAs}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Text Style"
          options={textStyleOptions}
          selectedValue={textStyle}
          setSelectedValue={setTextStyleAndResetValues}
        />
        {colorOptions.length > 1 && (
          <RadioGroupSetting
            css={{ marginLeft: theme.space[13] }}
            heading="Color"
            options={colorOptions}
            selectedValue={color}
            setSelectedValue={setColor}
          />
        )}
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Align"
          options={alignOptions}
          selectedValue={align}
          setSelectedValue={setAlign}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
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
        bg={color === "white" ? "primary.blue.t100" : "white"}
      />
    </>
  );
}

export default TextPage;
