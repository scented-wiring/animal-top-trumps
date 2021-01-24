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

describe("Card component", () => {
  test("renders correctly", () => {
    render(<Card />, container);
    expect(container).toMatchSnapshot();
  });

  test("renders a message if defaultText is true", () => {
    render(
      <Card message="test" alignment="do not render" defaultText={true} />,
      container
    );

    expect(container.textContent).toContain("test");
    expect(container.textContent).not.toContain("do not render");
  });

  test("renders the back of card if hide is true", () => {
    render(<Card name="test" hide={true} />, container);

    expect(container.textContent).toContain("Animal Top Trumps");
    expect(container.textContent).not.toContain("test");
  });

  test("renders nothing if decksize equals 0", () => {
    render(<Card name="test" deckSize={0} />, container);

    expect(container.textContent).not.toContain("test");
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
      'test"test"(test)Loading image...Cool: 5Largeness: 5Handsome: 5'
    );
  });

  test("doesn't render a delete button if deleteCard prop is falsy", () => {
    render(<Card deleteCard={false} />, container);

    expect(container.textContent).not.toContain("DELETE");
  });
});
