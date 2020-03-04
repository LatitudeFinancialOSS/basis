import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme } = allDesignSystem;
const scope = allDesignSystem;

const newTabOptions = getCheckboxOptions();

function LinkPage() {
  const theme = useTheme();
  const [newTab, setNewTab] = useState(false);
  const linkProps = nonDefaultProps([
    {
      prop: "href",
      value: "/terms"
    },
    {
      prop: "newTab",
      value: newTab,
      type: "boolean"
    }
  ]);
  const code = formatCode(`
    <>
      <Container padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
      <Container bg="grey.t03" padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
      <Container bg="grey.t05" padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
      <Container bg="grey.t07" padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
      <Container bg="secondary.lightBlue.t15" padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
      <Container bg="secondary.lightBlue.t25" padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
      <Container bg="primary.blue.t100" padding="4">
        <Link ${linkProps}>
          Terms and Conditions
        </Link>
      </Container>
    </>
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
          heading="New Tab"
          options={newTabOptions}
          selectedValue={newTab}
          setSelectedValue={setNewTab}
          type="boolean"
        />
      </div>
      <ComponentContainer code={code} scope={scope} />
    </>
  );
}

export default LinkPage;
