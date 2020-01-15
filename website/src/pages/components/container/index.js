import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { BACKGROUNDS, DEFAULT_PROPS } from "basis/components/Container";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens } = allDesignSystem;
const scope = allDesignSystem;

const bgOptions = getRadioOptions(["", ...BACKGROUNDS], {
  emptyLabel: "No background"
});
const hasBreakpointWidthOptions = getCheckboxOptions();

function ContainerPage() {
  const [bg, setBg] = useState("grey.t05");
  const [hasBreakpointWidth, setHasBreakpointWidth] = useState(
    DEFAULT_PROPS.hasBreakpointWidth
  );
  const code = formatCode(`
    <Container ${nonDefaultProps([
      {
        prop: "bg",
        value: bg,
        defaultValue: DEFAULT_PROPS.bg
      },
      {
        prop: "padding",
        value: "6 8"
      },
      {
        prop: "hasBreakpointWidth",
        value: hasBreakpointWidth,
        defaultValue: DEFAULT_PROPS.hasBreakpointWidth,
        type: "boolean"
      }
    ])}
    >
      <Grid rowsGutter={4}>
        <Text intent="h3">Here goes anything you want.</Text>
        <Text>Here are some links:
          <Link href="https://google.com" newTab={true}>Google</Link>{" "}
          <Link href="https://facebook.com" newTab={true}>Facebook</Link>
        </Text>
        <Text>Here are some buttons:<br />
          <Button isFullWidth={false}>Submit</Button>{" "}
          <Button variant="secondary" isFullWidth={false}>Cancel</Button>
        </Text>
        <Text>Here is a nested container with margin and padding:</Text>
        <Container bg="primary.blue.t100" margin="4" padding="6">
          <Text>Text color is white here. Magic!</Text>
        </Container>
      </Grid>
    </Container>
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
          heading="Background"
          options={bgOptions}
          selectedValue={bg}
          setSelectedValue={setBg}
        />
        <RadioGroupSetting
          css={{ marginLeft: designTokens.space[13] }}
          heading="Has Breakpoint Width"
          options={hasBreakpointWidthOptions}
          selectedValue={hasBreakpointWidth}
          setSelectedValue={setHasBreakpointWidth}
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

export default ContainerPage;
