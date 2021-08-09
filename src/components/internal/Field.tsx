import React from "react";
import Grid from "../Grid";
import Text from "../Text";
import VisuallyHidden from "../VisuallyHidden";
import useTheme from "../../hooks/useTheme";

interface FieldProps {
  fullWidth?: boolean;
  optional: boolean;
  disabled: boolean;
  labelId?: string;
  labelFor?: string;
  label?: React.ReactNode;
  hideLabel?: boolean;
  renderLabel?: boolean;
  auxId: string;
  helpText?: React.ReactNode;
  errors?: React.ReactNode[];
  children: React.ReactNode;
  testId?: string;
}

function Field({
  fullWidth = true,
  optional,
  disabled,
  label,
  hideLabel = false,
  renderLabel = true,
  labelId,
  labelFor,
  auxId,
  helpText,
  errors,
  children,
  testId,
}: FieldProps) {
  const theme = useTheme();
  let labelToRender = null;

  if (renderLabel) {
    const LabelElement = labelFor ? "label" : "div";
    const labelContent = (
      <LabelElement
        css={theme.field.getCSS({ targetElement: "label" })}
        id={labelId}
        htmlFor={labelFor}
      >
        {label}
        {optional && (
          <span css={theme.field.getCSS({ targetElement: "optionalTag" })}>
            Optional
          </span>
        )}
      </LabelElement>
    );

    labelToRender = hideLabel ? (
      <VisuallyHidden>{labelContent}</VisuallyHidden>
    ) : (
      labelContent
    );
  }

  return (
    <div
      css={theme.field.getCSS({
        targetElement: "fieldContainer",
        fullWidth,
        disabled,
      })}
      data-testid={testId}
    >
      {labelToRender}
      {children}
      {Array.isArray(errors) && errors.length > 0 ? (
        <div
          css={theme.field.getCSS({
            targetElement: "errorsContainer",
          })}
          id={auxId}
        >
          {
            <Grid cols={1} rowsGap={1}>
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
          }
        </div>
      ) : helpText ? (
        <div css={theme.field.getCSS({ targetElement: "helpText" })} id={auxId}>
          <Text textStyle="body2">{helpText}</Text>
        </div>
      ) : null}
    </div>
  );
}

export default Field;
