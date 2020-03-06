import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RangeSetting from "../../../components/RangeSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Stack } = allDesignSystem;
const { DEFAULT_PROPS } = Stack;
const scope = allDesignSystem;

function StackPage() {
  const theme = useTheme();
  const [gap, setGap] = useState("4");
  const code = formatCode(`
    <Stack ${nonDefaultProps([
      {
        prop: "gap",
        value: gap,
        defaultValue: DEFAULT_PROPS.gap
      }
    ])}>
      <Placeholder label="First" width="160" />
      <Placeholder label="Second" width="80" />
      <Placeholder label="Third" width="120" />
    </Stack>
  `);

  return (
    <>
      <div
        css={{
          display: "flex",
          flexShrink: 0,
          padding: `${theme.space[5]} ${theme.space[6]}`
        }}
      >
        <RangeSetting
          heading="Gap"
          min={0}
          max={theme.space.length - 1}
          selectedValue={gap}
          setSelectedValue={setGap}
          selectedValueText={theme.space[gap]}
        />
      </div>
      <ComponentContainer code={code} scope={scope} width="sm" />
    </>
  );
}

export default StackPage;
