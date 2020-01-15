import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { SIZES, COLORS, DEFAULT_PROPS } from "basis/components/LoadingIcon";
import RadioGroupSetting, {
  getRadioOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const sizeOptions = getRadioOptions(SIZES);
const colorOptions = getRadioOptions(COLORS);

function LoadingIconPage() {
  const [size, setSize] = useState(DEFAULT_PROPS.size);
  const [color, setColor] = useState(DEFAULT_PROPS.color);
  const code = formatCode(`
    <LoadingIcon ${nonDefaultProps([
      {
        prop: "size",
        value: size,
        defaultValue: DEFAULT_PROPS.size
      },
      {
        prop: "color",
        value: color,
        defaultValue: DEFAULT_PROPS.color
      }
    ])} />
  `);

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
          heading="Size"
          options={sizeOptions}
          selectedValue={size}
          setSelectedValue={setSize}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[12] }}
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

export default LoadingIconPage;
