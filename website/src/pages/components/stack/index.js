import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import RangeSetting from "../../../components/RangeSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Stack } = allDesignSystem;
const { DIRECTIONS, ALIGNMENTS, DEFAULT_PROPS } = Stack;
const scope = allDesignSystem;

const directionOptions = getRadioOptions(DIRECTIONS);
const alignOptions = getRadioOptions(ALIGNMENTS);

function StackPage() {
  const theme = useTheme();
  const [direction, setDirection] = useState(DEFAULT_PROPS.direction);
  const [align, setAlign] = useState(DEFAULT_PROPS.align);
  const [verticalGap, setVerticalGap] = useState(4);
  const [horizontalGap, setHorizontalGap] = useState(8);
  const code = formatCode(`
    <Container padding="4" bg="secondary.lightBlue.t25">
      <Stack ${nonDefaultProps([
        {
          prop: "direction",
          value: direction,
          defaultValue: DEFAULT_PROPS.direction,
        },
        {
          prop: "align",
          value: align,
          defaultValue: DEFAULT_PROPS.align,
        },
        {
          prop: "gap",
          value:
            direction === "horizontal" && verticalGap !== horizontalGap
              ? `${verticalGap} ${horizontalGap}`
              : `${verticalGap}`,
          defaultValue: DEFAULT_PROPS.gap,
        },
      ])}>
        <Container bg="white">
          <Placeholder label="1" height="40" width="100" />
        </Container>
        <Container bg="white">
          <Placeholder label="2" height="40" width="40" />
        </Container>
        <Container bg="white">
          <Placeholder label="3" height="40" width="140" />
        </Container>
        <Container bg="white">
          <Placeholder label="4" height="40" width="120" />
        </Container>
        <Container bg="white">
          <Placeholder label="5" height="40" width="200" />
        </Container>
        <Container bg="white">
          <Placeholder label="6" height="40" width="80" />
        </Container>
      </Stack>
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
          heading="Direction"
          options={directionOptions}
          selectedValue={direction}
          setSelectedValue={setDirection}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Alignment"
          options={alignOptions}
          selectedValue={align}
          setSelectedValue={setAlign}
        />
        <RangeSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Vertical Gap"
          min={0}
          max={theme.space.length - 1}
          selectedValue={verticalGap}
          setSelectedValue={setVerticalGap}
          selectedValueText={theme.space[verticalGap]}
        />
        {direction === "horizontal" && (
          <RangeSetting
            css={{ marginLeft: theme.space[13] }}
            heading="Horizontal Gap"
            min={0}
            max={theme.space.length - 1}
            selectedValue={horizontalGap}
            setSelectedValue={setHorizontalGap}
            selectedValueText={theme.space[horizontalGap]}
          />
        )}
      </div>
      <ComponentContainer code={code} scope={scope} width="sm" />
    </>
  );
}

export default StackPage;
