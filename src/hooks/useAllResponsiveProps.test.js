import { renderHook } from "@testing-library/react-hooks";
import useAllResponsiveProps from "./useAllResponsiveProps";
import { TestWrapper } from "../utils/test";

describe("useAllResponsiveProps", () => {
  it("collects all the responsive props", () => {
    const props = {
      padding: "4",
      "padding-xs": 5,
      "padding-sm": "0",
      "padding-md": "6",
      "padding-lg": "1 2 3",
      "padding-xl": "0 8",
      anotherProp: "some value",
    };
    const { result } = renderHook(
      () => useAllResponsiveProps(props, "padding"),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      padding: "4",
      "padding-xs": 5,
      "padding-sm": "0",
      "padding-md": "6",
      "padding-lg": "1 2 3",
      "padding-xl": "0 8",
    });
  });

  it("drops responsive props that do not exist", () => {
    const props = {
      "padding-xs": 5,
      "padding-md": "6",
      anotherProp: "some value",
    };
    const { result } = renderHook(
      () => useAllResponsiveProps(props, "padding"),
      { wrapper: TestWrapper }
    );

    expect(result.current).toStrictEqual({
      "padding-xs": 5,
      "padding-md": "6",
    });
  });
});
