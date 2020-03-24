import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Section } = allDesignSystem;
const { BACKGROUNDS } = Section;
const scope = allDesignSystem;

const bgOptions = getRadioOptions(["", ...BACKGROUNDS], {
  emptyLabel: "No background",
});

function SectionPage() {
  const theme = useTheme();
  const [bg, setBg] = useState("grey.t05");
  const code = formatCode(`
    <Section ${nonDefaultProps([
      {
        prop: "bg",
        value: bg,
      },
    ])}
    >
      <Grid preset="page">
        <Grid.Item colSpan="0-1" colSpan-sm="0-2" colSpan-lg="0-4">
          <Container bg="secondary.lightBlue.t25" margin="5 0 0 0" padding="5">
            <Container bg="white" padding="6">
              <Text>Some content goes here.</Text>
            </Container>
          </Container>
        </Grid.Item>
        <Grid.Item colSpan="2-3" colSpan-sm="3-7" colSpan-lg="5-11">
          <Container bg="secondary.lightBlue.t25" padding="5" margin="10 0 7 0">
            <Container bg="white" padding="6">
              <Text>
                More content<br />
                that spans multiple lines<br />
                goes here.
              </Text>
            </Container>
          </Container>
        </Grid.Item>
      </Grid>
    </Section>
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
          options={bgOptions}
          selectedValue={bg}
          setSelectedValue={setBg}
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
