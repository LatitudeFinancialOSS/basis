import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const { useTheme, Icon } = allDesignSystem;
const { NAMES, COLORS, DEFAULT_PROPS } = Icon;
const scope = allDesignSystem;

const nameOptions = getRadioOptions(["all", ...NAMES]);
const colorOptions = getRadioOptions(COLORS);

function IconPage() {
  const theme = useTheme();
  const [name, setName] = useState("all");
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const code = formatCode(
    name === "all"
      ? "<>" +
          NAMES.map((name) => `<Icon name="${name}" color="${color}" />`).join(
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
          padding: `${theme.space[5]} ${theme.space[6]}`,
          maxHeight: "224px",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        <RadioGroupSetting
          heading="Name"
          options={nameOptions}
          selectedValue={name}
          setSelectedValue={setName}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Color"
          options={colorOptions}
          selectedValue={color}
          setSelectedValue={setColor}
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        bg={color === "white" ? "highlight.blue.t100" : "white"}
      />
    </>
  );
}

export default IconPage;
