import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Checkbox } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

function FormWithCheckbox({
  initialValue = false,
  color,
  label,
  hideLabel,
  disabled,
  helpText,
  optional,
  __internal__keyboardFocus,
  children,
  submitOnMount,
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
        hideLabel={hideLabel}
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
  hideLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  __internal__keyboardFocus: PropTypes.bool,
  children: PropTypes.node.isRequired,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkCheckbox() {
  return (
    <KitchenSinkLayout name="Checkbox">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGap="8">
            <FormWithCheckbox label="Grey" hideLabel color="grey.t05">
              Grey
            </FormWithCheckbox>

            <FormWithCheckbox
              label="Grey checked"
              hideLabel
              initialValue={true}
              color="grey.t05"
            >
              Grey checked
            </FormWithCheckbox>

            <FormWithCheckbox
              label="Grey focus"
              hideLabel
              color="grey.t05"
              __internal__keyboardFocus
            >
              Grey focus
            </FormWithCheckbox>

            <FormWithCheckbox
              label="Grey checked focus"
              hideLabel
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
          <Grid rowsGap="8">
            <FormWithCheckbox label="White" hideLabel>
              White
            </FormWithCheckbox>

            <FormWithCheckbox
              label="White checked"
              hideLabel
              initialValue={true}
            >
              White checked
            </FormWithCheckbox>

            <FormWithCheckbox
              label="White focus"
              hideLabel
              __internal__keyboardFocus
            >
              White focus
            </FormWithCheckbox>

            <FormWithCheckbox
              label="White checked focus"
              hideLabel
              initialValue={true}
              __internal__keyboardFocus
            >
              White checked focus
            </FormWithCheckbox>

            <FormWithCheckbox label="With wrap" hideLabel>
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
