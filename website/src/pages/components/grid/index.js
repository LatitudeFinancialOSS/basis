import React, { useState } from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import RadioGroupSetting, {
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Grid } = allDesignSystem;
const { DEFAULT_PROPS } = Grid;
const scope = allDesignSystem;

const debugOptions = getCheckboxOptions();

function GridPage() {
  const theme = useTheme();
  const [debug, setDebug] = useState(DEFAULT_PROPS.debug);
  const gridProps = nonDefaultProps([
    {
      prop: "preset",
      value: "page"
    },
    {
      prop: "rowsGutter",
      value: 4,
      type: "number"
    },
    {
      prop: "debug",
      value: debug,
      defaultValue: DEFAULT_PROPS.debug,
      type: "boolean"
    }
  ]);
  const code = formatCode(`
    <Grid ${gridProps}>
      <Grid.Item colSpan="all">
        <Placeholder label="Header" height="8" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-lg="0-1" rowSpan-lg="1-2">
        <Placeholder label="Navigation" height="13" height-sm="8" height-lg="100%" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-sm="2-7" rowSpan-sm="2" colSpan-lg="2-9" rowSpan-lg="1-2">
        <Placeholder label="Main article area" height="18" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-sm="0-1" rowSpan-sm="2" colSpan-lg="10-11" rowSpan-lg="1">
        <Placeholder label="Sidebar" height="8" height-sm="100%" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-sm="0-1" rowSpan-sm="3" colSpan-lg="10-11" rowSpan-lg="2">
        <Placeholder label="Advertising" height="8" height-lg="100%" />
      </Grid.Item>
      <Grid.Item colSpan="all" colSpan-sm="2-7" rowSpan-sm="3" colSpan-lg="all">
        <Placeholder label="Footer" height="8" />
      </Grid.Item>
    </Grid>
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
        <RadioGroupSetting
          heading="Debug"
          options={debugOptions}
          selectedValue={debug}
          setSelectedValue={setDebug}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        width="md"
        hasBodyMargin={false}
      />
    </>
  );
}

export default GridPage;
