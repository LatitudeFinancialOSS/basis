import { mergeProps } from "./mergeProps";

interface Props {
  prop1?: string;
  prop2?: string;
  prop3?: string | null;
}

describe("mergeProps", () => {
  it("it should join objects", () => {
    const props: Props = {
      prop1: "test",
    };

    const defaultProps = {
      prop2: "test",
    } as const;

    expect(mergeProps(props, defaultProps)).toStrictEqual({
      prop1: "test",
      prop2: "test",
    });
  });

  it("should override, explicit undefined properties", () => {
    const props: Props = {
      prop1: "test",
      prop2: undefined,
    };

    const defaultProps = {
      prop2: "test",
    } as const;

    expect(mergeProps(props, defaultProps)).toStrictEqual({
      prop1: "test",
      prop2: "test",
    });
  });

  it("should not override, explicit null properties", () => {
    const props: Props = {
      prop1: "test",
      prop3: null,
    };

    const defaultProps = {
      prop3: "test",
    } as const;

    expect(mergeProps(props, defaultProps)).toStrictEqual({
      prop1: "test",
      prop3: null,
    });
  });
});
