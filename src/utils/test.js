import React from "react";
import PropTypes from "prop-types";
import { matcherHint, printReceived } from "jest-matcher-utils";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "regenerator-runtime/runtime";
import matchMediaPolyfill from "mq-polyfill";
import { BasisProvider, defaultTheme } from "..";
import { enhanceTheme } from "./theme";

matchMediaPolyfill(global);

export const theme = enhanceTheme(defaultTheme);
export function TestWrapper({ children }) {
  return (
    <BasisProvider theme={defaultTheme} isRoot>
      {children}
    </BasisProvider>
  );
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

// throw if console.error is called in tests
beforeEach(() => {
  const { error } = console;

  jest.spyOn(console, "error").mockImplementation((...args) => {
    error(...args);
    throw new Error();
  });
});

afterEach(() => {
  console.error.mockRestore();
});

// custom matchers
expect.extend({
  toBeVisuallyHidden(element) {
    const { getComputedStyle } = element.ownerDocument.defaultView;
    const {
      position,
      width,
      height,
      overflow,
      whiteSpace,
      clip,
      clipPath,
    } = getComputedStyle(element);
    const isVisuallyHidden =
      position === "absolute" &&
      width === "1px" &&
      height === "1px" &&
      overflow === "hidden" &&
      whiteSpace === "nowrap" &&
      clip === "rect(0px, 0px, 0px, 0px)" &&
      clipPath === "inset(50%)";

    return {
      pass: isVisuallyHidden,
      message: () => {
        const is = isVisuallyHidden ? "is" : "is not";

        return [
          matcherHint(
            `${this.isNot ? ".not" : ""}.toBeVisuallyHidden`,
            "element",
            ""
          ),
          "",
          `Received element ${is} currently visually hidden:`,
          `  ${printReceived(element.cloneNode(false))}`,
          "",
          JSON.stringify(
            { position, width, height, overflow, whiteSpace, clip, clipPath },
            null,
            2
          ),
        ].join("\n");
      },
    };
  },
});
