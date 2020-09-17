import React, { useState } from "react";
import * as allDesignSystem from "basis";
import RadioGroupSetting, {
  getRadioOptions,
  getCheckboxOptions,
} from "../../../components/RadioGroupSetting";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode, nonDefaultProps } from "../../../utils/formatting";

const { useTheme, Link } = allDesignSystem;
const { APPEARANCES, VARIANTS, DEFAULT_PROPS } = Link;
const scope = allDesignSystem;

const appearanceOptions = getRadioOptions(APPEARANCES);
const variantOptions = getRadioOptions(VARIANTS);
const newTabOptions = getCheckboxOptions();

function isVariantDisabled({ appearance, variant }) {
  switch (appearance) {
    case "text": {
      return ["light-bg", "medium-bg", "dark-bg"].includes(variant) === false;
    }

    case "primary-button": {
      return (
        ["blue-button", "white-button", "green-button"].includes(variant) ===
        false
      );
    }

    case "secondary-button": {
      return (
        ["blue-button", "white-button", "black-button"].includes(variant) ===
        false
      );
    }

    case "icon": {
      return true;
    }

    default: {
      return false;
    }
  }
}

function LinkPage() {
  const theme = useTheme();
  const [appearance, setAppearance] = useState(DEFAULT_PROPS.appearance);
  const [variant, setVariant] = useState(DEFAULT_PROPS.variant);
  const [newTab, setNewTab] = useState(false);
  const code = formatCode(`
    <Link ${nonDefaultProps([
      {
        prop: "appearance",
        value: appearance,
        defaultValue: DEFAULT_PROPS.appearance,
      },
      {
        prop: "variant",
        value: variant,
        defaultValue: DEFAULT_PROPS.variant,
      },
      {
        prop: "href",
        value: "/terms",
      },
      {
        prop: "newTab",
        value: newTab,
        type: "boolean",
      },
    ])}>
      ${
        appearance === "icon"
          ? `<Icon name="github" color="grey.t75" hoverColor="black" />`
          : "Terms and Conditions"
      }
    </Link>
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
          heading="Appearance"
          options={appearanceOptions}
          selectedValue={appearance}
          setSelectedValue={(appearance) => {
            setAppearance(appearance);

            switch (appearance) {
              case "text": {
                if (
                  ["light-bg", "medium-bg", "dark-bg"].includes(variant) ===
                  false
                ) {
                  setVariant("light-bg");
                }
                break;
              }

              case "primary-button": {
                if (
                  ["blue-button", "white-button", "green-button"].includes(
                    variant
                  ) === false
                ) {
                  setVariant("blue-button");
                }
                break;
              }

              case "secondary-button": {
                if (
                  ["blue-button", "white-button", "black-button"].includes(
                    variant
                  ) === false
                ) {
                  setVariant("blue-button");
                }
                break;
              }

              case "icon": {
                setVariant("light-bg");
                break;
              }

              default: {
                break;
              }
            }
          }}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="Variant"
          options={variantOptions.map((option) => ({
            ...option,
            disabled: isVariantDisabled({ appearance, variant: option.value }),
          }))}
          selectedValue={variant}
          setSelectedValue={setVariant}
        />
        <RadioGroupSetting
          css={{ marginLeft: theme.space[13] }}
          heading="New tab"
          options={newTabOptions}
          selectedValue={newTab}
          setSelectedValue={setNewTab}
          type="boolean"
        />
      </div>
      <ComponentContainer
        code={code}
        scope={scope}
        bg={
          variant === "dark-bg"
            ? "primary.blue.t100"
            : variant === "medium-bg"
            ? "secondary.lightBlue.t15"
            : variant === "white-button"
            ? "highlight.pink.t100"
            : variant === "black-button"
            ? "secondary.pink.t30"
            : "white"
        }
      />
    </>
  );
}

export default LinkPage;
