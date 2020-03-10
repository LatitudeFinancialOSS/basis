import { getReactLiveNoInline, annotateCodeForPlayground } from "./ast";

describe("getReactLiveNoInline", () => {
  it("invalid code", () => {
    expect(
      getReactLiveNoInline(`
      not
      valid
      code
    `)
    ).toBe(false);
  });

  it("noInline = false", () => {
    expect(getReactLiveNoInline(``)).toBe(false);
    expect(getReactLiveNoInline(`<h1>Hello</h1>`)).toBe(false);
    expect(
      getReactLiveNoInline(`
      <Footer>
        <Footer.Header>
          <Footer.Header.Logo />
        </Footer.Header>
        <Footer.Legal>
          <Footer.Legal.Links>
            <Link href="#" newTab>
              Link 1
            </Link>
            <Link href="#" newTab>
              Link 2
            </Link>
            <Link href="#" newTab>
              Link 3
            </Link>
          </Footer.Legal.Links>
          <Footer.Legal.Copy>
            Legal copy goes here.
          </Footer.Legal.Copy>
        </Footer.Legal>
      </Footer>
    `)
    ).toBe(false);
    expect(getReactLiveNoInline(`renders(<h1>Hello</h1>)`)).toBe(false);
  });

  it("noInline = true", () => {
    expect(getReactLiveNoInline(`render(<h1>Hello</h1>)`)).toBe(true);
    expect(
      getReactLiveNoInline(`
      render(
        <Container>
          <Text>Hello</Text>
        </Container>
      )
    `)
    ).toBe(true);
    expect(
      getReactLiveNoInline(`
      const options = [
        {
          label: "0",
          value: "0"
        },
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        },
        {
          label: "4",
          value: "4"
        },
        {
          label: "5+",
          value: "5+"
        }
      ]
      
      function App() {
        const [dependants, setDependants] = React.useState({
          value: ""
        })
      
        return (
          <RadioGroup
            label="How many dependands do you have?"
            showCircles={false}
            options={options}
            data={dependants}
            onChange={setDependants}
          />
        )
      }
      
      render(<App />)

    `)
    ).toBe(true);
  });
});

describe("annotateCodeForPlayground", () => {
  it("wraps code in Fragment", () => {
    const plainJsx = annotateCodeForPlayground("<Button>Button</Button>");
    const emptyString = annotateCodeForPlayground("");

    expect(plainJsx.startsWith("<React.Fragment>")).toBe(true);
    expect(plainJsx.endsWith("</React.Fragment>;")).toBe(true);

    expect(emptyString.startsWith("<React.Fragment>")).toBe(true);
    expect(emptyString.endsWith("</React.Fragment>;")).toBe(true);
  });

  it("does not wrap code in Fragment", () => {
    const functionShorthand = annotateCodeForPlayground(
      "() => <Button>Button</Button>"
    );
    const functionLonghand = annotateCodeForPlayground(
      "function App() { <Button>Button</Button> }"
    );
    const classComponent = annotateCodeForPlayground(
      `class ButtonTest extends React.Component {
      
        render() {
          return (
            <Button>Button</Button>
          )
        }
      }`
    );

    expect(functionShorthand.startsWith("<React.Fragment>")).toBe(false);
    expect(functionShorthand.endsWith("</React.Fragment>;")).toBe(false);

    expect(functionLonghand.startsWith("<React.Fragment>")).toBe(false);
    expect(functionLonghand.endsWith("</React.Fragment>;")).toBe(false);

    expect(classComponent.startsWith("<React.Fragment>")).toBe(false);
    expect(classComponent.endsWith("</React.Fragment>;")).toBe(false);
  });
});
