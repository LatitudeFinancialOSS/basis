import React from "react";
import { Grid, Stepper } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkStepper() {
  return (
    <KitchenSinkLayout name="Stepper">
      <Grid rowsGap="8">
        <Stepper>
          <Stepper.Item label="You" label-md="About you" />
          <Stepper.Item
            label="Address"
            label-sm="Address and ID"
            label-md="Address and identification"
            minor
          />
          <Stepper.Item label="Work" label-xs="Employment" />
          <Stepper.Item label="Expenses" minor />
          <Stepper.Item label="Verify" label-xs="Verify details" />
        </Stepper>

        <Stepper>
          <Stepper.Item label="You" label-md="About you" current />
          <Stepper.Item
            label="Address"
            label-sm="Address and ID"
            label-md="Address and identification"
            minor
          />
          <Stepper.Item label="Work" label-xs="Employment" />
          <Stepper.Item label="Expenses" minor />
          <Stepper.Item label="Verify" label-xs="Verify details" />
        </Stepper>

        <Stepper>
          <Stepper.Item label="You" label-md="About you" />
          <Stepper.Item
            label="Address"
            label-sm="Address and ID"
            label-md="Address and identification"
            minor
          />
          <Stepper.Item label="Work" label-xs="Employment" />
          <Stepper.Item label="Expenses" minor current />
          <Stepper.Item label="Verify" label-xs="Verify details" />
        </Stepper>

        <Stepper completed>
          <Stepper.Item label="You" label-md="About you" />
          <Stepper.Item
            label="Address"
            label-sm="Address and ID"
            label-md="Address and identification"
            minor
          />
          <Stepper.Item label="Work" label-xs="Employment" />
          <Stepper.Item label="Expenses" minor />
          <Stepper.Item label="Verify" label-xs="Verify details" />
        </Stepper>
      </Grid>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkStepper;
