import React from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import matchMediaPolyfill from "mq-polyfill";
import { BasisProvider, defaultTheme } from "..";
import { enhanceTheme } from "./theme";

export const theme = enhanceTheme(defaultTheme);

matchMediaPolyfill(global);

export function TestWrapper({ children }) {
  return <BasisProvider theme={defaultTheme}>{children}</BasisProvider>;
}

TestWrapper.propTypes = {
  children: PropTypes.node,
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: TestWrapper,
    ...options,
  });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

export { userEvent };
