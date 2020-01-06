import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { DEFAULT_GRID_PROPS } from "basis/components/Grid";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import DemoBlock from "../../../components/DemoBlock";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = {
  ...allDesignSystem,
  DemoBlock
};

const showGridOptions = getCheckboxOptions();

function GridPage() {
  const [debug, setShowGrid] = useState(true);
  const gridProps = nonDefaultProps([
    {
      prop: "cols",
      value: 4,
      type: "number"
    },
    {
      prop: "cols-md",
      value: 12,
      type: "number"
    },
    {
      prop: "rowsGutter",
      value: 4,
      type: "number"
    },
    {
      prop: "colsGutter",
      value: "30px"
    },
    {
      prop: "debug",
      value: debug,
      defaultValue: DEFAULT_GRID_PROPS.debug,
      type: "boolean"
    }
  ]);
  const code = formatCode(`
    <Grid ${gridProps}>
      <Grid.Item colSpan="all" colSpan-md="0-3">
        <DemoBlock color="red" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-md="4-7">
        <DemoBlock color="green" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-md="8-11">
        <DemoBlock color="blue" />
      </Grid.Item>
    </Grid>
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
          heading="Show Grid"
          options={showGridOptions}
          selectedValue={debug}
          setSelectedValue={setShowGrid}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        width="sm"
        hasBodyMargin={false}
      />
    </>
  );
}

export default GridPage;
