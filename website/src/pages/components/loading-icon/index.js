import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, LoadingIcon } = allDesignSystem;
const { SIZES, COLORS, DEFAULT_PROPS } = LoadingIcon;
const scope = allDesignSystem;

const sizeOptions = getRadioOptions(SIZES);
const colorOptions = getRadioOptions(COLORS);

function LoadingIconPage() {
  const theme = useTheme();
  const [size, setSize] = useState(DEFAULT_PROPS.size);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const code = formatCode(`
    <LoadingIcon ${nonDefaultProps([
      {
        prop: "size",
        value: size,
        defaultValue: DEFAULT_PROPS.size,
      },
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color,
      },
    ])} />
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
          heading="Size"
          options={sizeOptions}
          selectedValue={size}
          setSelectedValue={setSize}
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

export default LoadingIconPage;
