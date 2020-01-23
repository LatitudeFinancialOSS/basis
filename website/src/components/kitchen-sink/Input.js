import React from "react";
import { Container, Grid, Text } from "basis";
import Input from "../optionally-uncontrolled/Input";

function KitchenSinkInput() {
  return (
    <Container>
      <Container bg="primary.blue.t100" padding="6">
        <Text intent="h2" align="center">
          Input
        </Text>
      </Container>

      <Container padding="4" bg="white">
        <Container width="20">
          <Grid rowsGutter="8">
            <Input placeholder="Grey" color="grey.t05" />
            <Input
              placeholder="Grey focused"
              color="grey.t05"
              __internal__focused={true}
            />
          </Grid>
        </Container>
      </Container>
      <Container padding="4" bg="grey.t05">
        <Container width="20">
          <Grid rowsGutter="8">
            <Input placeholder="White" />
            <Input placeholder="White focused" __internal__focused={true} />
            <Input placeholder="With label" label="First name" />
            <Input
              placeholder="With value"
              label="First name"
              data={{ value: "With value" }}
            />
            <Input
              placeholder="Optional"
              label="First name"
              isOptional={true}
            />
            <Input
              placeholder="With help text"
              label="First name"
              helpText="Please enter your name exactly as it appears in your passport."
            />
            <Input
              placeholder="Disabled"
              label="First name"
              helpText="Nickname is not allowed."
              isDisabled={true}
            />
            <Input
              placeholder="Single error"
              label="First name"
              data={{ value: "", errors: ["Something is wrong"] }}
            />
            <Input
              placeholder="Very long error"
              label="First name"
              data={{
                value: "",
                errors: [
                  "Something is wrong and it's easy to fix, but I won't bother for now."
                ]
              }}
            />
            <Input
              placeholder="Multiple errors"
              label="First name"
              data={{
                value: "",
                errors: [
                  "Something is wrong and it's easy to fix, but I won't bother for now.",
                  "Another thing seems invalid here and you should be able to fix it easily without any help.",
                  "Error 3"
                ]
              }}
            />
            <Input placeholder='type="number"' type="number" />
            <Input
              label="With number value"
              type="number"
              data={{ value: "10" }}
            />
          </Grid>
        </Container>
      </Container>
    </Container>
  );
}

export default KitchenSinkInput;
