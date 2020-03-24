import React from "react";
import PropTypes from "prop-types";
import { Text, Flex, useTheme } from "basis";

function RangeSetting({
  className,
  heading,
  min,
  max,
  selectedValue,
  setSelectedValue,
  selectedValueText,
  selectedValueAuxText,
}) {
  const theme = useTheme();

  return (
    <div className={className}>
      <Text color="grey.t75" margin="0 0 2 0">
        <strong>{heading.toUpperCase()}</strong>
      </Text>
      <Flex>
        <input
          type="range"
          min={min}
          max={max}
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(Number(e.target.value));
          }}
        />
        <div css={{ marginLeft: theme.space[2] }}>
          {selectedValueText || selectedValue}
          {selectedValueAuxText && (
            <span css={{ marginLeft: theme.space[5] }}>
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
  selectedValueAuxText: PropTypes.string,
};

export default RangeSetting;
