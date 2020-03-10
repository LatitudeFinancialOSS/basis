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
  it("wraps plain jsx code in Fragment", () => {
    expect(
      annotateCodeForPlayground("<Button>Apply</Button>").startsWith("<>")
    ).toBe(true);
    expect(
      annotateCodeForPlayground("<Button>Apply</Button>").endsWith("</>;")
    ).toBe(true);
  });

  it("wraps ajacent jsx code in Fragment", () => {
    expect(
      annotateCodeForPlayground(
        "<Button>Apply</Button><Button>Back</Button>"
      ).startsWith("<>")
    ).toBe(true);
    expect(
      annotateCodeForPlayground(
        "<Button>Apply</Button><Button>Back</Button>"
      ).endsWith("</>;")
    ).toBe(true);
  });

  it("wraps plain empty string code in Fragment", () => {
    expect(annotateCodeForPlayground("").startsWith("<>")).toBe(true);
    expect(annotateCodeForPlayground("").endsWith("</>;")).toBe(true);
  });

  it("does not wrap code starting with '()' in Fragment", () => {
    const functionShorthand = "() => <Button>Apply</Button>";

    expect(annotateCodeForPlayground(functionShorthand).startsWith("<>")).toBe(
      false
    );
    expect(annotateCodeForPlayground(functionShorthand).endsWith("</>;")).toBe(
      false
    );
  });

  it("does not wrap code starting with 'function' Fragment", () => {
    const functionLonghand = "function App() { return <Button>Apply</Button> }";

    expect(annotateCodeForPlayground(functionLonghand).startsWith("<>")).toBe(
      false
    );
    expect(annotateCodeForPlayground(functionLonghand).endsWith("</>;")).toBe(
      false
    );
  });

  it("does not wrap code starting with 'class' in Fragment", () => {
    const classComponent = `class ButtonTest extends React.Component {
      
        render() {
          return (
            <Button>Apply</Button>
          )
        }
      }`;

    expect(annotateCodeForPlayground(classComponent).startsWith("<>")).toBe(
      false
    );
    expect(annotateCodeForPlayground(classComponent).endsWith("</>;")).toBe(
      false
    );
  });
});
