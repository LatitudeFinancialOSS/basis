import React from "react";
import PropTypes from "prop-types";
import { COMPONENT_STATUS } from "../utils/constants";
import { designTokens } from "basis";

const statusDescriptions = {
  DRAFT:
    "We started working on this component, but it's not ready for consumption yet.",
  READY: "You can use this component today."
};

function ComponentStatusIndicator({ status }) {
  return (
    <div
      css={{
        fontSize: designTokens.fontSizes[0],
        padding: `${designTokens.space[1]} ${designTokens.space[2]}`,
        backgroundColor:
          status === COMPONENT_STATUS.READY
            ? designTokens.colors.conditional.positive.graphics
            : status === COMPONENT_STATUS.DRAFT
            ? designTokens.colors.conditional.negative.graphics
            : designTokens.colors.grey.t05,
        color: designTokens.colors.white,
        cursor: "default"
      }}
      title={statusDescriptions[status]}
    >
      {status}
    </div>
  );
}

ComponentStatusIndicator.propTypes = {
  status: PropTypes.oneOf(Object.values(COMPONENT_STATUS))
};

export default ComponentStatusIndicator;
