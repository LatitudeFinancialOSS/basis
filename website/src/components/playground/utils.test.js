import { getComponentsAtPoint } from "./utils";

describe("getComponentsAtPoint", () => {
  it("find all components that contain the given point", () => {
    const componentsLocation = {
      foo: {
        left: 20,
        top: 80,
        right: 60,
        bottom: 100,
      },
      bar: {
        left: 30,
        top: 100,
        right: 40,
        bottom: 120,
      },
      baz: {
        left: 10,
        top: 70,
        right: 50,
        bottom: 90,
      },
    };

    expect(
      getComponentsAtPoint({ x: 35, y: 85 }, componentsLocation)
    ).toStrictEqual({
      foo: {
        left: 20,
        top: 80,
        right: 60,
        bottom: 100,
      },
      baz: {
        left: 10,
        top: 70,
        right: 50,
        bottom: 90,
      },
    });
  });
});
