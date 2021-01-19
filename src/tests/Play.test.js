import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Play from "../components/Play";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getByText, getByRole, fireEvent } from "@testing-library/react";

const renderContainer = () => {
  render(
    <BrowserRouter>
      <Play />
    </BrowserRouter>,
    container
  );
};

const fakeResponse = [
  {
    id: 1,
    name: "Dog",
    cool: 1,
    largeness: 10,
    handsome: 9,
    aka: "Hairy friend",
    alignment: "Lawful Good",
  },
  {
    id: 2,
    name: "Cat",
    cool: 10,
    largeness: 10,
    handsome: 8,
    aka: "Furry assassin",
    alignment: "Lawful Evil",
  },
  {
    id: 3,
    name: "Elephant",
    cool: 8,
    largeness: 10,
    handsome: 6,
    aka: "Leg-face",
    alignment: "Lawful Neutral",
  },
  {
    id: 4,
    name: "Snake",
    cool: 2,
    largeness: 10,
    handsome: 4,
    aka: "Long lad",
    alignment: "Neutral Evil",
  },
];

const fakeResponse2 = [
  {
    id: 1,
    name: "Dog",
    cool: 1,
    largeness: 8,
    handsome: 9,
    aka: "Hairy friend",
    alignment: "Lawful Good",
  },
  {
    id: 2,
    name: "Cat",
    cool: 8,
    largeness: 10,
    handsome: 8,
    aka: "Furry assassin",
    alignment: "Lawful Evil",
  },
];

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

describe("Play component", () => {
  test("renders correctly", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(404);
    await act(async () => {
      renderContainer();
    });
    expect(container).toMatchSnapshot();
  });

  test("renders an alert if cannot connect to server", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(404);

    await act(async () => {
      renderContainer();
    });
    expect(getByText(container, "Error")).toBeInTheDocument();
    expect(
      getByText(container, "Could not connect to the server.")
    ).toBeInTheDocument();
  });

  test("deals out cards equally between player and computer", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });
    expect(getByText(container, "Player: 2 cards")).toBeInTheDocument();
    expect(getByText(container, "Computer: 2 cards")).toBeInTheDocument();
  });

  test("compares fields, determines winner and adjusts card arrays if one value exceeds another", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    fireEvent.click(getByText(container, "Cool"));
    expect(container.textContent).toContain("wins!");
    expect(container.textContent).toContain("3 cards");
    expect(container.textContent).toContain("1 cards");
  });

  test("compares fields, declares a tie and adjusts card arrays if values are equal", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    fireEvent.click(getByText(container, "Largeness"));
    expect(container.textContent).toContain("Tie!");
    expect(container.textContent).toContain("1 cards");
  });

  test("declares a winner if one card array is empty", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse2);

    await act(async () => {
      renderContainer();
    });

    fireEvent.click(getByText(container, "Cool"));
    fireEvent.click(getByText(container, "OK"));
    expect(container.textContent).toContain("wins the game!");
  });

  test("clears win message after confirmation click", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    fireEvent.click(getByText(container, "Cool"));
    expect(container.textContent).toContain("wins!");
    fireEvent.click(getByText(container, "OK"));
    expect(container.textContent).not.toContain("wins!");
  });

  test("changes score div class based on active turn", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    expect(getByText(container, "Player: 2 cards")).toHaveClass("score-active");
    expect(getByText(container, "Computer: 2 cards")).toHaveClass("score");
  });

  test("renders home link", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    const link = getByRole(container, "link");
    expect(link.textContent).toContain("← BACK");
    expect(link.getAttribute("href")).toBe("/");
  });
});
