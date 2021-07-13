import React from "react";
import { render, screen, userEvent } from "../utils/test";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form";
import Text from "./Text";
import Dropdown from "./Dropdown";
import Container from "./Container";

const movieOptions = [
  {
    data: {
      name: "Movie 1",
    },
    value: "movie-1",
  },
  {
    data: {
      name: "Movie 2",
    },
    value: "movie-2",
  },
  {
    data: {
      name: "Movie 3",
    },
    value: "movie-3",
  },
];

/* eslint-disable react/prop-types */
function MovieOption({ data }) {
  return <Text>{data.name}</Text>;
}
/* eslint-enable react/prop-types */

function movieOptionToString({ data }) {
  return data.name;
}

const initialValues = {
  movie: "",
};

function FormWithDropdown(props) {
  return (
    <Form initialValues={initialValues}>
      <Dropdown
        name="movie"
        label="Movie"
        options={movieOptions}
        optionToString={movieOptionToString}
        optionComponent={MovieOption}
        {...props}
      />
    </Form>
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Dropdown", () => {
  it("renders the label and options are not visible", () => {
    render(<FormWithDropdown />);

    const label = screen.getByText("Movie");
    const button = screen.getByRole("button", { name: /Please select/ });
    const buttonId = button.getAttribute("id");

    expect(buttonId).toBeTruthy();
    expect(label).toHaveAttribute("for", buttonId);

    expect(screen.queryByText("Movie 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 3")).not.toBeInTheDocument();
  });

  it("reveals options", async () => {
    render(<FormWithDropdown />);

    const button = screen.getByRole("button", { name: /Please select/ });

    userEvent.click(button);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  it("hides options", async () => {
    render(<FormWithDropdown />);

    const button = screen.getByRole("button", { name: /Please select/ });

    // Open
    userEvent.click(button);

    await sleep(0); // Without this, the test passes when it should fail.

    // Close
    userEvent.click(button);

    expect(screen.queryByText("Movie 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Movie 3")).not.toBeInTheDocument();
  });

  it("hides the label", () => {
    render(<FormWithDropdown hideLabel />);

    expect(screen.getByText("Movie")).toBeVisuallyHidden();
  });

  it("inside dark container", () => {
    render(
      <Container bg="grey.t05">
        <FormWithDropdown />
      </Container>
    );
    const button = screen.getByRole("button", { name: /Please select/ });

    expect(button).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("inside nested container", () => {
    render(
      <Container bg="grey.t05">
        <Container>
          <FormWithDropdown />
        </Container>
      </Container>
    );
    const button = screen.getByRole("button", { name: /Please select/ });

    expect(button).toHaveStyle({
      backgroundColor: "#ffffff",
    });
  });

  it("with onChange", () => {
    const onChange = jest.fn();

    render(<FormWithDropdown onChange={onChange} />);

    const button = screen.getByRole("button", { name: /Please select/ });

    userEvent.click(button);
    userEvent.click(screen.getByText("Movie 2"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({
      selectedOption: {
        data: {
          name: "Movie 2",
        },
        value: "movie-2",
      },
    });
  });

  it("with testId", () => {
    const { container } = render(<FormWithDropdown testId="my-dropdown" />);

    expect(container.querySelector("form").firstChild).toHaveAttribute(
      "data-testid",
      "my-dropdown"
    );
  });
});
