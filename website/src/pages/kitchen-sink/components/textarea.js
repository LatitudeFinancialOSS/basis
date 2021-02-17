import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Textarea } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

function FormWithTextarea({
  initialValue = "",
  placeholder,
  color,
  label,
  disabled,
  helpText,
  optional,
  height,
  __internal__focus,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ description: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Textarea
        name="description"
        placeholder={placeholder}
        color={color}
        label={label}
        helpText={helpText}
        disabled={disabled}
        optional={optional}
        {...(height ? { height } : {})}
        __internal__focus={__internal__focus}
      />
    </KitchenSinkForm>
  );
}

FormWithTextarea.propTypes = {
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.oneOf(Textarea.COLORS),
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  height: PropTypes.string,
  __internal__focus: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkTextarea() {
  return (
    <KitchenSinkLayout name="Textarea">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGap="8">
            <FormWithTextarea label="Grey" color="grey.t05" />

            <FormWithTextarea
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
            <FormWithTextarea label="White" />

            <FormWithTextarea label="White focus" __internal__focus />

            <FormWithTextarea
              label="With placeholder"
              placeholder="Placeholder"
            />

            <FormWithTextarea label="With value" initialValue="Some value" />

            <FormWithTextarea label="Optional" optional />

            <FormWithTextarea
              label="With help text"
              helpText="Please provide as many details as possible."
            />

            <FormWithTextarea
              label="Disabled with value"
              initialValue="Some value"
              helpText="How can we help?"
              disabled
            />

            <FormWithTextarea
              label="With height"
              height="200"
              placeholder="200px"
            />

            <FormWithTextarea label="With error" submitOnMount />
          </Grid>
        </Container>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkTextarea;
