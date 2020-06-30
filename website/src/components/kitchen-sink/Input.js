import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Input } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";
import KitchenSinkForm from "./KitchenSinkForm";

function FormWithInput({
  initialValue = "",
  placeholder,
  variant,
  numericPrefix,
  numericSuffix,
  color,
  label,
  disabled,
  helpText,
  optional,
  __internal__focus,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ name: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Input
        name="name"
        placeholder={placeholder}
        variant={variant}
        numericPrefix={numericPrefix}
        numericSuffix={numericSuffix}
        color={color}
        label={label}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        __internal__focus={__internal__focus}
      />
    </KitchenSinkForm>
  );
}

FormWithInput.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(Input.VARIANTS),
  numericPrefix: PropTypes.string,
  numericSuffix: PropTypes.string,
  color: PropTypes.oneOf(Input.COLORS),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  __internal__focus: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkInput() {
  return (
    <KitchenSinkLayout name="Input">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGap="8">
            <FormWithInput label="Grey" color="grey.t05" />

            <FormWithInput
              label="Grey focus"
              color="grey.t05"
              __internal__focus
            />
          </Grid>
        </Container>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Container width="320">
          <Grid rowsGap="8">
            <FormWithInput label="White" />

            <FormWithInput label="White focus" __internal__focus />

            <FormWithInput label="With placeholder" placeholder="Placeholder" />

            <FormWithInput label="With value" initialValue="Some value" />

            <FormWithInput label="Optional" optional />

            <FormWithInput
              label="With help text"
              helpText="Please enter your name exactly as it appears in your passport."
            />

            <FormWithInput
              label="Disabled with value"
              initialValue="Some value"
              helpText="Nickname is not allowed."
              disabled
            />

            <FormWithInput label="With error" submitOnMount />

            <FormWithInput
              label="Numeric with prefix"
              variant="numeric"
              numericPrefix="$"
              placeholder="Placeholder"
            />

            <FormWithInput
              label="Numeric with prefix and value"
              variant="numeric"
              numericPrefix="$"
              initialValue="4000"
            />

            <FormWithInput
              label="Numeric with longer prefix"
              variant="numeric"
              numericPrefix="AUD"
              initialValue="800"
            />

            <FormWithInput
              label="Numeric with suffix"
              variant="numeric"
              numericSuffix="%"
              initialValue="34"
            />
          </Grid>
        </Container>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkInput;
