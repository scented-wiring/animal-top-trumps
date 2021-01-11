import { getByRole } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import Card from "../components/Card";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("BrowseCards component", () => {
  test("renders correctly", () => {
    render(<Card />, container);
    expect(container).toMatchSnapshot();
  });

  test('renders only the card name if aka is set to "default__card"', () => {
    render(
      <Card name="test" alignment="do not render" aka="default__card" />,
      container
    );

    expect(container.textContent).toContain("test");
    expect(container.textContent).not.toContain("do not render");
  });

  test("renders all card stats", () => {
    render(
      <Card
        name="test"
        cool="5"
        largeness="5"
        handsome="5"
        aka="test"
        alignment="test"
      />,
      container
    );

    expect(container.textContent).toContain(
      'testCool: 5 Largeness: 5 Handsome: 5 aka: "test" Alignment:test'
    );
  });

  test("renders a delete button if deleteCard prop is truthy", () => {
    render(<Card deleteCard={true} />, container);

    const button = getByRole(container, "button");

    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain("DELETE");
  });

  test("doesn't render a delete button if deleteCard prop is falsy", () => {
    render(<Card deleteCard={false} />, container);

    expect(container.textContent).not.toContain("DELETE");
  });
});
