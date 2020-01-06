import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { NAMES, COLORS, DEFAULT_PROPS } from "basis/components/Icon";
import RadioGroupSetting, {
  getRadioOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const nameOptions = getRadioOptions(["all", ...NAMES]);
const colorOptions = getRadioOptions(COLORS);

function IconPage() {
  const [name, setName] = useState("all");
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const code = formatCode(
    name === "all"
      ? "<>" +
          NAMES.map(name => `<Icon name="${name}" color="${color}" />`).join(
            ""
          ) +
          "</>"
      : `<Icon name="${name}" color="${color}" />`
  );

  return (
    <>
      <div
        css={{
          display: "flex",
          padding: `${designTokens.space[5]} ${designTokens.space[6]}`,
          maxHeight: designTokens.sizes[15],
          flexShrink: 0,
          overflowY: "auto"
        }}
      >
        <RadioGroupSetting
          heading="Name"
          options={nameOptions}
          selectedValue={name}
          setSelectedValue={setName}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[11] }}
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        backgroundColor={
          color === "white"
            ? designTokens.colors.highlight.blue.t100
            : designTokens.colors.white
        }
      />
    </>
  );
}

export default IconPage;
