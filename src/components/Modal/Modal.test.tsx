import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Button from "../Button";
import Modal from "./Modal";
import Text from "../Text";
import { render, screen, userEvent } from "../../utils/test";

describe("Modal", () => {
  it("renders the modal when open={true}", () => {
    render(
      <Modal title="Modal title" open>
        <Text>Modal description</Text>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("doesn't render the modal when open={false}", () => {
    render(
      <Modal title="Modal title" open={false}>
        <Text>Modal description</Text>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the close button", () => {
    render(
      <Modal title="Modal title" open>
        <Text>Modal description</Text>
      </Modal>
    );

    expect(
      screen.getByRole("button", { name: "Close modal" })
    ).toBeInTheDocument();
  });

  it("renders the header", () => {
    render(
      <Modal title="Modal title" open>
        <Text>Modal description</Text>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    const header = modal.querySelector("header");

    expect(modal).toHaveAttribute(
      "aria-labelledby",
      header?.getAttribute("id")
    );
    expect(header).toHaveStyle({
      fontFamily: "'Montserrat',sans-serif",
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "28px",
      letterSpacing: "-0.52px",
      color: "#0046aa",
    });
  });

  it("renders children", () => {
    render(
      <Modal title="Modal title" open>
        <Text>Modal description</Text>
      </Modal>
    );

    expect(screen.getByText("Modal description")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(
      <Modal title="Modal title" open>
        <Modal.Footer>
          <Button>OK</Button>
        </Modal.Footer>
      </Modal>
    );

    const modal = screen.getByRole("dialog");
    const footer = modal.querySelector("footer");

    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    expect(footer).toHaveStyle({
      marginTop: "32px",
    });
  });

  it("calls onClose", () => {
    const onClose = jest.fn();

    render(
      <Modal title="Modal title" open onClose={onClose}>
        <Text>Modal description</Text>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: "Close modal" });

    userEvent.click(closeButton);

    expect(onClose).toBeCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("with testId", () => {
    render(
      <Modal title="Modal title" open testId="my-modal">
        <Text>Modal description</Text>
      </Modal>
    );

    const modal = screen.getByRole("dialog");

    expect(modal).toHaveAttribute("data-testid", "my-modal");
  });
});
