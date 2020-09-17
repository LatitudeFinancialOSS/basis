import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Accordion } = allDesignSystem;
const {
  COLORS,
  TEXT_COLORS,
  ITEM_GAP,
  ITEM_HEADER_AS,
  DEFAULT_PROPS,
} = Accordion;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const textColorOptions = getRadioOptions(TEXT_COLORS);
const itemGapOptions = getRadioOptions(ITEM_GAP);
const itemHeaderAsOptions = getRadioOptions(ITEM_HEADER_AS);

function AccordionPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [textColor, setTextColor] = useState(DEFAULT_PROPS.textColor);
  const [itemGap, setItemGap] = useState(DEFAULT_PROPS.itemGap);
  const [itemHeaderAs, setItemHeaderAs] = useState(DEFAULT_PROPS.itemHeaderAs);
  const code = formatCode(`
    <Accordion ${nonDefaultProps([
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color,
      },
      {
        prop: "textColor",
        value: textColor,
        defaultValue: DEFAULT_PROPS.textColor,
      },
      {
        prop: "itemGap",
        value: itemGap,
        defaultValue: DEFAULT_PROPS.itemGap,
      },
      {
        prop: "itemHeaderAs",
        value: itemHeaderAs,
        defaultValue: DEFAULT_PROPS.itemHeaderAs,
      },
    ])}>
      <Accordion.Item>
        <Accordion.Item.Header>
          No icon
        </Accordion.Item.Header>
        <Accordion.Item.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. 
            Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. 
            Fusce nec tellus sed augue semper porta. Mauris massa.
          </Text>
        </Accordion.Item.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Item.Header>
          <Accordion.Item.Header.Icon name="calculator" />
          With icon
        </Accordion.Item.Header>
        <Accordion.Item.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. 
            Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. 
            Fusce nec tellus sed augue semper porta. Mauris massa.
          </Text>
        </Accordion.Item.Content>
      </Accordion.Item>
      <Accordion.Item initiallyOpen>
        <Accordion.Item.Header>
          Initially open
        </Accordion.Item.Header>
        <Accordion.Item.Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
            Praesent libero. Sed cursus ante dapibus diam. Sed nisi. 
            Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. 
            Fusce nec tellus sed augue semper porta. Mauris massa.
          </Text>
        </Accordion.Item.Content>
      </Accordion.Item>
    </Accordion>
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
          heading="Text Color"
          options={textColorOptions}
          selectedValue={textColor}
          setSelectedValue={setTextColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Item Gap"
          options={itemGapOptions}
          selectedValue={itemGap}
          setSelectedValue={setItemGap}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Item Header As"
          options={itemHeaderAsOptions}
          selectedValue={itemHeaderAs}
          setSelectedValue={setItemHeaderAs}
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        bg={color === "white" ? "grey.t07" : "white"}
      />
    </>
  );
}

export default AccordionPage;
