import React from "react";
import PropTypes from "prop-types";
import Grid from "../Grid";
import Text from "../Text";
import useTheme from "../../hooks/useTheme";

function Field({
  isFullWidth = true,
  isOptional,
  isDisabled,
  label,
  labelId,
  labelFor,
  auxId,
  helpText,
  errors,
  children,
  testId
}) {
  const theme = useTheme();

  return (
    <div
      css={{
        ...theme.field,
        ...(isFullWidth && theme["field.fullWidth"]),
        ...(isDisabled && theme["field.disabled"])
      }}
      data-testid={testId}
    >
      {label && (
        <label css={theme["field.label"]} id={labelId} htmlFor={labelFor}>
          {label}
          {isOptional && (
            <span css={theme["field.label.optional"]}>Optional</span>
          )}
        </label>
      )}
      {children}
      {errors ? (
        <div css={theme["field.errors"]} id={auxId}>
          <Grid cols={1} rowsGutter={1}>
            {errors.map((error, index) => (
              <Text
                textStyle="body2"
                color="conditional.negative.text"
                key={index}
              >
                {error}
              </Text>
            ))}
          </Grid>
        </div>
      ) : helpText ? (
        <div css={theme["field.helpText"]} id={auxId}>
          <Text textStyle="body2">{helpText}</Text>
        </div>
      ) : null}
    </div>
  );
}

Field.propTypes = {
  isFullWidth: PropTypes.bool,
  isOptional: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  labelId: PropTypes.string,
  labelFor: PropTypes.string,
  label: PropTypes.node,
  auxId: PropTypes.string.isRequired,
  helpText: PropTypes.node,
  errors: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node.isRequired,
  testId: PropTypes.string
};

export default Field;
