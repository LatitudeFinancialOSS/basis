import React from "react";
import PropTypes from "prop-types";
import { Container, Text, designTokens } from "basis";

function RangeSetting({
  className,
  heading,
  min,
  max,
  selectedValue,
  setSelectedValue,
  selectedValueText,
  selectedValueAuxText
}) {
  return (
    <div className={className}>
      <Container margin="0 0 2 0">
        <Text weight="bold" color="grey.t75">
          {heading.toUpperCase()}
        </Text>
      </Container>
      <div css={{ display: "flex" }}>
        <input
          type="range"
          min={min}
          max={max}
          value={selectedValue}
          onChange={e => {
            setSelectedValue(Number(e.target.value));
          }}
        />
        <div css={{ marginLeft: designTokens.space[2] }}>
          {selectedValueText || selectedValue}
          {selectedValueAuxText && (
            <span css={{ marginLeft: designTokens.space[5] }}>
              {selectedValueAuxText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

RangeSetting.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  selectedValueText: PropTypes.string,
  selectedValueAuxText: PropTypes.string
};

export default RangeSetting;
