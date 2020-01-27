import React from "react";
import { Grid, Section, Stepper } from "basis";
import Layout from "./Layout";

function KitchenSinkStepper() {
  return (
    <Layout name="Stepper">
      <Grid rowsGutter="8">
        <Section bg="grey.t05">
          <Stepper>
            <Stepper.Item label="You" label-md="About you" />
            <Stepper.Item
              label="Address"
              label-sm="Address and ID"
              label-md="Address and identification"
              isMinor={true}
            />
            <Stepper.Item label="Work" label-xs="Employment" />
            <Stepper.Item label="Expenses" isMinor={true} />
            <Stepper.Item label="Verify" label-xs="Verify details" />
          </Stepper>
        </Section>

        <Section bg="grey.t05">
          <Stepper>
            <Stepper.Item label="You" label-md="About you" isCurrent={true} />
            <Stepper.Item
              label="Address"
              label-sm="Address and ID"
              label-md="Address and identification"
              isMinor={true}
            />
            <Stepper.Item label="Work" label-xs="Employment" />
            <Stepper.Item label="Expenses" isMinor={true} />
            <Stepper.Item label="Verify" label-xs="Verify details" />
          </Stepper>
        </Section>

        <Section bg="grey.t05">
          <Stepper>
            <Stepper.Item label="You" label-md="About you" />
            <Stepper.Item
              label="Address"
              label-sm="Address and ID"
              label-md="Address and identification"
              isMinor={true}
            />
            <Stepper.Item label="Work" label-xs="Employment" />
            <Stepper.Item label="Expenses" isMinor={true} isCurrent={true} />
            <Stepper.Item label="Verify" label-xs="Verify details" />
          </Stepper>
        </Section>

        <Section bg="grey.t05">
          <Stepper isCompleted={true}>
            <Stepper.Item label="You" label-md="About you" />
            <Stepper.Item
              label="Address"
              label-sm="Address and ID"
              label-md="Address and identification"
              isMinor={true}
            />
            <Stepper.Item label="Work" label-xs="Employment" />
            <Stepper.Item label="Expenses" isMinor={true} />
            <Stepper.Item label="Verify" label-xs="Verify details" />
          </Stepper>
        </Section>
      </Grid>
    </Layout>
  );
}

export default KitchenSinkStepper;
