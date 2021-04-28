import React from "react";
import PropTypes from "prop-types";
import { Container, Flex, Placeholder, CheckboxGroup, Stack } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import KitchenSinkForm from "../../../components/kitchen-sink/KitchenSinkForm";

const defaultOptions = [
  {
    key: "option1",
    label: "Option 1",
  },
  {
    key: "option2",
    label: "Option 2",
  },
  {
    key: "option3",
    label: "Option 3",
  },
];

function FormWithCheckboxGroup({
  options = defaultOptions,
  label,
  initialValue = {
    option1: false,
    option2: false,
    option3: false,
  },
  disabled,
  helpText,
  optional,
  submitOnMount,
}) {
  return (
    <KitchenSinkForm
      initialValues={{ fruits: initialValue }}
      submitOnMount={submitOnMount}
    >
      <CheckboxGroup
        name="fruits"
        options={options}
        label={label}
        disabled={disabled}
        helpText={helpText}
        optional={optional}
      />
    </KitchenSinkForm>
  );
}

FormWithCheckboxGroup.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
      })
    ),
  ]),
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.object,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  optional: PropTypes.bool,
  submitOnMount: PropTypes.bool,
};

function KitchenSinkCheckboxGroup() {
  return (
    <KitchenSinkLayout name="CheckboxGroup">
      <Container width="600">
        <Stack gap="4">
          <Container padding="4">
            <Stack gap="8">
              <FormWithCheckboxGroup label="Default" />

              <FormWithCheckboxGroup
                label="Disabled"
                initialValue={{
                  option1: false,
                  option2: true,
                  option3: false,
                }}
                disabled
              />

              <FormWithCheckboxGroup label="Optional" optional />

              <FormWithCheckboxGroup label="With error" submitOnMount />
            </Stack>
          </Container>

          <Container padding="4">
            <Stack gap="8">
              <FormWithCheckboxGroup
                label="With JSX labels"
                initialValue={{
                  value1: false,
                  value2: false,
                  value3: true,
                  value4: false,
                }}
                options={[
                  {
                    key: "value1",
                    label: (
                      <Flex>
                        <Placeholder label="Image 1" width="120" height="60" />
                        <Container margin="0 0 0 6">Option 1</Container>
                      </Flex>
                    ),
                  },
                  {
                    key: "value2",
                    label: (
                      <Flex>
                        <Placeholder label="Image 2" width="120" height="120" />
                        <Container margin="0 0 0 6">Option 2</Container>
                      </Flex>
                    ),
                  },
                  {
                    key: "value3",
                    label: (
                      <Flex>
                        <Placeholder label="Image 3" width="120" height="80" />
                        <Container margin="0 0 0 6">Option 3</Container>
                      </Flex>
                    ),
                  },
                  {
                    key: "value4",
                    label: (
                      <Flex>
                        <Placeholder label="Image 4" width="120" height="100" />
                        <Container margin="0 0 0 6">Option 4</Container>
                      </Flex>
                    ),
                  },
                ]}
              />
            </Stack>
          </Container>
        </Stack>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkCheckboxGroup;
