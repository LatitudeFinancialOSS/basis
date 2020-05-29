import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, List } = allDesignSystem;
const { TYPES, VARIANTS, TEXT_STYLES, DEFAULT_PROPS } = List;
const scope = allDesignSystem;

const typeOptions = getRadioOptions(TYPES);
const variantOptions = getRadioOptions(VARIANTS);
const textStyleOptions = getRadioOptions(TEXT_STYLES);

function ListPage() {
  const theme = useTheme();
  const [type, setType] = useState(DEFAULT_PROPS.type);
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [textStyle, setTextStyle] = useState(DEFAULT_PROPS.textStyle);
  const code = formatCode(`
  <List ${nonDefaultProps([
    {
      prop: "type",
      value: type,
      defaultValue: DEFAULT_PROPS.type,
    },
    {
      prop: "variant",
      value: variant,
      defaultValue: DEFAULT_PROPS.variant,
    },
    {
      prop: "textStyle",
      value: textStyle,
      defaultValue: DEFAULT_PROPS.textStyle,
    },
  ])}
  >
    <List.Item>
      Short item
    </List.Item>
    <List.Item>
      Very long item with a <Link href="#" newTab={false}>link</Link> and a <b>bold text</b> that 
      demonstrates a multi-line paragraph.
    </List.Item>
    <List.Item>
      Nested list:
      <List>
        <List.Item>First</List.Item>
        <List.Item>Second</List.Item>
        <List.Item>Third</List.Item>
      </List>
    </List.Item>
    <List.Item>
      Last item
    </List.Item>
  </List>
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
          heading="Type"
          options={typeOptions}
          selectedValue={type}
          setSelectedValue={setType}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Variant"
          options={variantOptions}
          selectedValue={variant}
          setSelectedValue={setVariant}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Text Style"
          options={textStyleOptions}
          selectedValue={textStyle}
          setSelectedValue={setTextStyle}
        />
      </div>
      <ComponentContainer code={code} scope={scope} />
    </>
  );
}

export default ListPage;
