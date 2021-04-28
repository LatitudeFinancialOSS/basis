import React from "react";
import PropTypes from "prop-types";
import { Container, Flex, Grid, Link, Placeholder, RadioGroup } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

const defaultOptions = [
  {
    label: "Option 1",
    value: "option-1",
  },
  {
    label: "Option 2",
    value: "option-2",
  },
  {
    label: "Option 3",
    value: "option-3",
  },
];

function FormWithRadioGroup({
  options = defaultOptions,
  label,
  initialValue = "",
  disabled,
  helpText,
  optional,
  columns,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ hungry: initialValue }}
      submitOnMount={submitOnMount}
    >
      <RadioGroup
        name="hungry"
        options={options}
        label={label}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
        columns={columns}
      />
    </KitchenSinkForm>
  );
}

FormWithRadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.node,
      value: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  columns: PropTypes.number,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkRadioGroup() {
  return (
    <KitchenSinkLayout name="RadioGroup">
      <Container width="600">
        <Grid rowsGap="4">
          <Container padding="4">
            <Grid rowsGap="8">
              <FormWithRadioGroup label="Default" />

              <FormWithRadioGroup
                label="Disabled"
                initialValue="option-2"
                disabled
              />

              <FormWithRadioGroup label="Optional" optional />

              <FormWithRadioGroup label="With error" submitOnMount />
            </Grid>
          </Container>

          <Container padding="4" bg="grey.t05">
            <Grid rowsGap="8">
              <FormWithRadioGroup
                label="One column with help text"
                initialValue="option-1"
                columns={1}
                helpText="Help text goes here."
              />

              <FormWithRadioGroup
                label="2 columns, with error"
                columns={2}
                submitOnMount
              />
            </Grid>
          </Container>

          <Container padding="4">
            <Grid rowsGap="8">
              <FormWithRadioGroup
                label="With description"
                options={[
                  {
                    label: "Option 1",
                    description: "Description goes here",
                    value: "option-1",
                  },
                  {
                    label: "Option 2",
                    description: (
                      <>
                        Descriptions can be very long, so long that they span
                        multiple lines. Moreover, they can have links like{" "}
                        <Link href="https://basis.vercel.app" newTab>
                          this
                        </Link>
                        .
                      </>
                    ),
                    value: "option-2",
                  },
                  {
                    label: "Option 3",
                    value: "option-3",
                  },
                ]}
              />
            </Grid>
          </Container>

          <Container padding="4">
            <Grid rowsGap="8">
              <FormWithRadioGroup
                label="With JSX labels"
                columns={2}
                initialValue="value1"
                options={[
                  {
                    label: (
                      <Flex>
                        <Placeholder label="Image 1" width="120" height="60" />
                        <Container margin="0 0 0 6">Option 1</Container>
                      </Flex>
                    ),
                    value: "value1",
                  },
                  {
                    label: (
                      <Flex>
                        <Placeholder label="Image 2" width="120" height="120" />
                        <Container margin="0 0 0 6">Option 2</Container>
                      </Flex>
                    ),
                    value: "value2",
                  },
                  {
                    label: (
                      <Flex>
                        <Placeholder label="Image 3" width="120" height="80" />
                        <Container margin="0 0 0 6">Option 3</Container>
                      </Flex>
                    ),
                    value: "value3",
                  },
                  {
                    label: (
                      <Flex>
                        <Placeholder label="Image 4" width="120" height="100" />
                        <Container margin="0 0 0 6">Option 4</Container>
                      </Flex>
                    ),
                    value: "value4",
                  },
                ]}
              />
            </Grid>
          </Container>
        </Grid>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkRadioGroup;
