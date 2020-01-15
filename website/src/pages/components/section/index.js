import React, { useState } from "react";
import * as allDesignSystem from "basis";
import { BACKGROUNDS, DEFAULT_PROPS } from "basis/components/Section";
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
const debugOptions = getCheckboxOptions();

function SectionPage() {
  const [bg, setBg] = useState("grey.t05");
  const [debug, setDebug] = useState(DEFAULT_PROPS.debug);
  const code = formatCode(`
    <Section ${nonDefaultProps([
      {
        prop: "bg",
        value: bg,
        defaultValue: DEFAULT_PROPS.bg
      },
      {
        prop: "debug",
        value: debug,
        defaultValue: DEFAULT_PROPS.debug,
        type: "boolean"
      }
    ])}
    >
      <Grid.Item colSpan="0-1" colSpan-sm="0-2" colSpan-lg="0-4">
        <Container bg="secondary.lightBlue.t30" margin="5 0 0 0" padding="5">
          <Container bg="white" padding="6">
            <Text>Some content goes here.</Text>
          </Container>
        </Container>
      </Grid.Item>
      <Grid.Item colSpan="2-3" colSpan-sm="3-7" colSpan-lg="5-11">
        <Container bg="secondary.lightBlue.t30" padding="5" margin="10 0 7 0">
          <Container bg="white" padding="6">
            <Text>
              More content<br />
              that spans multiple lines<br />
              goes here.
            </Text>
          </Container>
        </Container>
      </Grid.Item>
    </Section>
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

export default SectionPage;
