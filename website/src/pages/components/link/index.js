import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens, useTheme, Link } = allDesignSystem;
const { COLORS, DEFAULT_PROPS } = Link;
const scope = allDesignSystem;

const colorOptions = getRadioOptions(COLORS);
const newTabOptions = getCheckboxOptions();

function LinkPage() {
  const theme = useTheme();
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const [newTab, setNewTab] = useState(false);
  const code = formatCode(
    `<Link ${nonDefaultProps([
      {
        prop: "href",
        value: "/terms"
      },
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color
      },
      {
        prop: "newTab",
        value: newTab,
        type: "boolean"
      }
    ])}
>
  Terms and Conditions
</Link>`
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
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="New Tab"
          options={newTabOptions}
          selectedValue={newTab}
          setSelectedValue={setNewTab}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        backgroundColor={
          color === "secondary.turquoise.t60"
            ? theme.colors.primary.blue.t100
            : color === "secondary.lightBlue.t100"
            ? theme.colors.black
            : null
        }
      />
    </>
  );
}

export default LinkPage;
