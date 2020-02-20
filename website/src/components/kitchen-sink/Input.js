import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Input } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";
import KitchenSinkForm from "./KitchenSinkForm";

function FormWithInput({
  initialValue = "",
  placeholder,
  color,
  type,
  label,
  disabled,
  helpText,
  optional,
  __internal__focus,
  submitOnMount
}) {
  return (
    <KitchenSinkForm
      initialValues={{ name: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Input
        name="name"
        placeholder={placeholder}
        color={color}
        type={type}
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
  color: PropTypes.oneOf(Input.COLORS),
  type: PropTypes.oneOf(Input.TYPES),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  __internal__focus: PropTypes.bool,
  submitOnMount: PropTypes.bool
};

function KitchenSinkInput() {
  return (
    <KitchenSinkLayout name="Input">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGutter="8">
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
          <Grid rowsGutter="8">
            <FormWithInput label="White" />

            <FormWithInput label="White focus" __internal__focus />

            <FormWithInput label="With placeholder" placeholder="Placeholder" />

            <FormWithInput label="With value" initialValue="With value" />

            <FormWithInput label="Optional" optional />

            <FormWithInput
              label="With help text"
              helpText="Please enter your name exactly as it appears in your passport."
            />

            <FormWithInput
              label="Disabled"
              helpText="Nickname is not allowed."
              disabled
            />

            <FormWithInput label="With error" submitOnMount />

            <FormWithInput label="Number type" type="number" />

            <FormWithInput
              label="Number type with value"
              type="number"
              initialValue="10"
            />
          </Grid>
        </Container>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkInput;
