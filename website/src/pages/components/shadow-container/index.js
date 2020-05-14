import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { ShadowContainer, useTheme } = allDesignSystem;
const {
  SHADOW_SIZES,
  SHADOW_DIRECTIONS,
  SHADOW_COLORS,
  SHADOW_CONTRASTS,
  DEFAULT_PROPS,
} = ShadowContainer;
const scope = allDesignSystem;

const shadowSizeOptions = getRadioOptions(SHADOW_SIZES);
const shadowDirectionOptions = getRadioOptions(SHADOW_DIRECTIONS);
const shadowColorOptions = getRadioOptions(SHADOW_COLORS);
const shadowContrastOptions = getRadioOptions(SHADOW_CONTRASTS);

function ShadowContainerPage() {
  const theme = useTheme();
  const [shadowSize, setShadowSize] = useState(DEFAULT_PROPS.shadowSize);
  const [shadowDirection, setShadowDirection] = useState(
    DEFAULT_PROPS.shadowDirection
  );
  const [shadowColor, setShadowColor] = useState(DEFAULT_PROPS.shadowColor);
  const [shadowContrast, setShadowContrast] = useState(
    DEFAULT_PROPS.shadowContrast
  );
  const code = formatCode(`
    <ShadowContainer ${nonDefaultProps([
      {
        prop: "shadowSize",
        value: shadowSize,
        defaultValue: DEFAULT_PROPS.shadowSize,
      },
      {
        prop: "shadowDirection",
        value: shadowDirection,
        defaultValue: DEFAULT_PROPS.shadowDirection,
      },
      {
        prop: "shadowColor",
        value: shadowColor,
        defaultValue: DEFAULT_PROPS.shadowColor,
      },
      {
        prop: "shadowContrast",
        value: shadowContrast,
        defaultValue: DEFAULT_PROPS.shadowContrast,
      },
      {
        prop: "margin",
        value: "14",
      },
      {
        prop: "padding",
        value: "4",
      },
    ])}
    >
      <Text>Hello World</Text>
    </ShadowContainer>
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
          heading="Shadow Size"
          options={shadowSizeOptions}
          selectedValue={shadowSize}
          setSelectedValue={setShadowSize}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Shadow Direction"
          options={shadowDirectionOptions}
          selectedValue={shadowDirection}
          setSelectedValue={setShadowDirection}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Shadow Color"
          options={shadowColorOptions}
          selectedValue={shadowColor}
          setSelectedValue={setShadowColor}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Shadow Contrast"
          options={shadowContrastOptions}
          selectedValue={shadowContrast}
          setSelectedValue={setShadowContrast}
        />
      </div>
      <ComponentContainer code={code} scope={scope} />
    </>
  );
}

export default ShadowContainerPage;
