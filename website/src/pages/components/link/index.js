import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Link } = allDesignSystem;
const { VARIANTS, DEFAULT_PROPS } = Link;
const scope = allDesignSystem;

const variantOptions = getRadioOptions(VARIANTS);
const newTabOptions = getCheckboxOptions();

function LinkPage() {
  const theme = useTheme();
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [newTab, setNewTab] = useState(false);
  const code = formatCode(
    `<Link ${nonDefaultProps([
      {
        prop: "href",
        value: "/terms"
      },
      {
        prop: "variant",
        value: variant,
        defaultValue: DEFAULT_PROPS.variant
      },
      {
        prop: "newTab",
        value: newTab,
        type: "boolean"
      }
    ])}
>
  ${
    variant === "icon"
      ? `
          <Icon
            name="facebook"
            color="white"
            hoverColor="secondary.lightBlue.t60"
          />
        `
      : "Terms and Conditions"
  }
</Link>`
  );

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
          heading="Variant"
          options={variantOptions}
          selectedValue={variant}
          setSelectedValue={setVariant}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="New Tab"
          options={newTabOptions}
          selectedValue={newTab}
          setSelectedValue={setNewTab}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        backgroundColor={
          ["dark-bg", "icon"].includes(variant)
            ? theme.colors.primary.blue.t100
            : variant === "medium-bg"
            ? theme.colors.secondary.lightBlue.t25
            : null
        }
      />
    </>
  );
}

export default LinkPage;
