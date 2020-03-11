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
  // checks if the passed code variable is surrounded by a react fragment <>{code}</>
  function isFragment(code) {
    return /^<>.*<\/>;$/.test(code);
  }

  it("wraps plain adjacent jsx code in Fragment", () => {
    expect(
      isFragment(
        annotateCodeForPlayground("<Button>Apply</Button><Button>Back</Button>")
      )
    ).toBe(true);
  });

  it("wraps plain empty string code in Fragment", () => {
    expect(isFragment(annotateCodeForPlayground(""))).toBe(true);
  });

  it("does not wrap code starting with '()' in Fragment", () => {
    expect(
      isFragment(annotateCodeForPlayground("() => <Button>Apply</Button>"))
    ).toBe(false);
  });

  it("does not wrap code starting with 'function' Fragment", () => {
    expect(
      isFragment(
        annotateCodeForPlayground(
          "function App() { return <Button>Apply</Button> }"
        )
      )
    ).toBe(false);
  });

  it("does not wrap code starting with 'class' in Fragment", () => {
    const classComponent = `class ButtonTest extends React.Component {
      
        render() {
          return (
            <Button>Apply</Button>
          )
        }
      }`;

    expect(isFragment(annotateCodeForPlayground(classComponent))).toBe(false);
  });
});
