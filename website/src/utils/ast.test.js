import { getReactLiveNoInline } from "./ast";

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
