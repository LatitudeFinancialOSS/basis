import React from "react";
import PropTypes from "prop-types";
import { Text, Flex, designTokens } from "basis";

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
      <Text weight="bold" color="grey.t75" margin="0 0 2 0">
        {heading.toUpperCase()}
      </Text>
      <Flex>
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
      </Flex>
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
