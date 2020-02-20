import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Checkbox } from "basis";
import KitchenSinkLayout from "./KitchenSinkLayout";
import KitchenSinkForm from "./KitchenSinkForm";

function FormWithCheckbox({
  initialValue = false,
  color,
  label,
  disabled,
  helpText,
  optional,
  __internal__keyboardFocus,
  children,
  submitOnMount
}) {
  return (
    <KitchenSinkForm
      initialValues={{ agreedToTerms: initialValue }}
      submitOnMount={submitOnMount}
    >
      <Checkbox
        name="agreedToTerms"
        color={color}
        label={label}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        __internal__keyboardFocus={__internal__keyboardFocus}
      >
        {children}
      </Checkbox>
    </KitchenSinkForm>
  );
}

FormWithCheckbox.propTypes = {
  initialValue: PropTypes.bool,
  color: PropTypes.oneOf(Checkbox.COLORS),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  __internal__keyboardFocus: PropTypes.bool,
  children: PropTypes.node.isRequired,
  submitOnMount: PropTypes.bool
};

function KitchenSinkCheckbox() {
  return (
    <KitchenSinkLayout name="Checkbox">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGutter="8">
            <FormWithCheckbox color="grey.t05">Grey</FormWithCheckbox>

            <FormWithCheckbox initialValue={true} color="grey.t05">
              Grey checked
            </FormWithCheckbox>

            <FormWithCheckbox color="grey.t05" __internal__keyboardFocus>
              Grey focus
            </FormWithCheckbox>

            <FormWithCheckbox
              initialValue={true}
              color="grey.t05"
              __internal__keyboardFocus
            >
              Grey checked focus
            </FormWithCheckbox>
          </Grid>
        </Container>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Container width="320">
          <Grid rowsGutter="8">
            <FormWithCheckbox>White</FormWithCheckbox>

            <FormWithCheckbox initialValue={true}>
              White checked
            </FormWithCheckbox>

            <FormWithCheckbox __internal__keyboardFocus>
              White focus
            </FormWithCheckbox>

            <FormWithCheckbox initialValue={true} __internal__keyboardFocus>
              White checked focus
            </FormWithCheckbox>

            <FormWithCheckbox>
              This text spans multiple lines so you could see how it wraps.
            </FormWithCheckbox>

            <FormWithCheckbox label="Accept terms and conditions">
              With label
            </FormWithCheckbox>

            <FormWithCheckbox label="Get occasional promotions" optional>
              Optional
            </FormWithCheckbox>

            <FormWithCheckbox
              label="Accept terms and conditions"
              helpText="It's your responsibility to read the terms before accepting."
            >
              With help text
            </FormWithCheckbox>

            <FormWithCheckbox
              label="Accept terms and conditions"
              helpText="It's your responsibility to read the terms before accepting."
              disabled
            >
              Disabled
            </FormWithCheckbox>

            <FormWithCheckbox label="Accept terms and conditions" submitOnMount>
              With error
            </FormWithCheckbox>
          </Grid>
        </Container>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkCheckbox;
