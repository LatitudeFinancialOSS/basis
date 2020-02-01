import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { designTokens, Container } = allDesignSystem;
const { BACKGROUNDS, DEFAULT_PROPS } = Container;
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
      <Flex direction="column" gutter="4">
        <Text as="h3" textStyle="heading3">Here goes anything you want.</Text>
        <Text>Here are some links:
          <Link href="https://google.com" newTab={true}>Google</Link>{" "}
          <Link href="https://facebook.com" newTab={true}>Facebook</Link>
        </Text>
        <Text>
          Here are some buttons:<br />
          <Button>Submit</Button>
          <Button variant="secondary" margin="0 0 0 2">Cancel</Button>
        </Text>
        <Text>Here is a nested container:</Text>
        <Container bg="primary.blue.t100" padding="6" textAlign-md="center">
          <Text>Text color is white here. Magic!</Text>
        </Container>
      </Flex>
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
