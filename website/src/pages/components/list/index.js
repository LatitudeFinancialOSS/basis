import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens, List } = allDesignSystem;
const { TYPES, TEXT_STYLES, DEFAULT_PROPS } = List;
const scope = allDesignSystem;

const typeOptions = getRadioOptions(TYPES);
const textStyleOptions = getRadioOptions(TEXT_STYLES);

function ListPage() {
  const [type, setType] = useState(DEFAULT_PROPS.type);
  const [textStyle, setTextStyle] = useState(DEFAULT_PROPS.textStyle);
  const code = formatCode(
    `<List ${nonDefaultProps([
      {
        prop: "type",
        value: type,
        defaultValue: DEFAULT_PROPS.type
      },
      {
        prop: "textStyle",
        value: textStyle,
        defaultValue: DEFAULT_PROPS.textStyle
      }
    ])}
>
  <List.Item>
    <Text>Short item</Text>
  </List.Item>
  <List.Item>
    <Text>Very long item with a <Link href="#" newTab={false}>link</Link> and a <b>bold text</b> that demonstrates a multi-line paragraph.</Text>
    <Text textStyle="legal" margin="4 0 0 0">Note that you can override List's textStyle.</Text>
  </List.Item>
  <List.Item>
    <Text>
      <strong>Nested list</strong>
    </Text>
    <List margin="3 0 0 0">
      <List.Item>First</List.Item>
      <List.Item>Second</List.Item>
      <List.Item>Third</List.Item>
    </List>
  </List.Item>
</List>`
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
          heading="Type"
          options={typeOptions}
          selectedValue={type}
          setSelectedValue={setType}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
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
