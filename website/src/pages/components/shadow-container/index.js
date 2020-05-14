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
  DEFAULT_PROPS,
} = ShadowContainer;
const scope = allDesignSystem;

const BACKGROUNDS = ["white", "grey.t03", "grey.t05"];

const backgroundOptions = getRadioOptions(BACKGROUNDS);
const shadowSizeOptions = getRadioOptions(SHADOW_SIZES);
const shadowDirectionOptions = getRadioOptions(SHADOW_DIRECTIONS);
const shadowColorOptions = getRadioOptions(SHADOW_COLORS);

function ShadowContainerPage() {
  const theme = useTheme();
  const [background, setBackground] = useState("white");
  const [shadowSize, setShadowSize] = useState(DEFAULT_PROPS.shadowSize);
  const [shadowDirection, setShadowDirection] = useState(
    DEFAULT_PROPS.shadowDirection
  );
  const [shadowColor, setShadowColor] = useState(DEFAULT_PROPS.shadowColor);
  const code = formatCode(`
    <Container ${nonDefaultProps([
      {
        prop: "bg",
        value: background,
      },
      {
        prop: "padding",
        value: "14",
      },
    ])}>
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
          prop: "padding",
          value: "4",
        },
      ])}
      >
        <Text>Hello World</Text>
      </ShadowContainer>
    </Container>
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
          heading="Background"
          options={backgroundOptions}
          selectedValue={background}
          setSelectedValue={setBackground}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
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
      </div>
      <ComponentContainer code={code} scope={scope} />
    </>
  );
}

export default ShadowContainerPage;
