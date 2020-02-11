import React from "react";
import { Container, Grid } from "basis";
import Layout from "./Layout";
import { Checkbox } from "../optionally-controlled";

function KitchenSinkCheckbox() {
  return (
    <Layout name="Checkbox">
      <Container padding="4">
        <Container width="320">
          <Grid rowsGutter="8">
            <Checkbox color="grey.t05">Grey</Checkbox>

            <Checkbox color="grey.t05" data={{ value: true }}>
              Grey checked
            </Checkbox>

            <Checkbox color="grey.t05" __internal__keyboardFocus={true}>
              Grey focus
            </Checkbox>

            <Checkbox
              color="grey.t05"
              data={{ value: true }}
              __internal__keyboardFocus={true}
            >
              Grey checked focus
            </Checkbox>
          </Grid>
        </Container>
      </Container>

      <Container padding="4" bg="grey.t05">
        <Container width="320">
          <Grid rowsGutter="8">
            <Checkbox>White</Checkbox>

            <Checkbox data={{ value: true }}>White checked</Checkbox>

            <Checkbox __internal__keyboardFocus={true}>White focus</Checkbox>

            <Checkbox data={{ value: true }} __internal__keyboardFocus={true}>
              White checked focus
            </Checkbox>

            <Checkbox>
              This text spans multiple lines so you could see how it wraps.
            </Checkbox>

            <Checkbox label="Accept terms and conditions">With label</Checkbox>

            <Checkbox label="Get occasional promotions" optional={true}>
              Optional
            </Checkbox>

            <Checkbox
              label="Accept terms and conditions"
              helpText="It's your responsibility to read the terms before accepting."
            >
              With help text
            </Checkbox>

            <Checkbox
              label="Accept terms and conditions"
              helpText="It's your responsibility to read the terms before accepting."
              disabled={true}
            >
              Disabled
            </Checkbox>

            <Checkbox
              label="Accept terms and conditions"
              data={{
                value: false,
                errors: ["You must accept the terms before proceeding."]
              }}
            >
              With error
            </Checkbox>
          </Grid>
        </Container>
      </Container>
    </Layout>
  );
}

export default KitchenSinkCheckbox;
