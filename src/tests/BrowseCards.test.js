import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import BrowseCards from "../components/BrowseCards";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fireEvent, getByText, findByText } from "@testing-library/react";

const renderContainer = () => {
  render(
    <BrowserRouter>
      <BrowseCards />
    </BrowserRouter>,
    container
  );
};

const fakeResponse = [
  { id: 1, name: "Cat", aka: "Furry demon", alignment: "Lawful Evil" },
  { id: 2, name: "Dog" },
  { id: 3, name: "Elephant" },
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

describe("BrowseCards component", () => {
  test("renders correctly", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });
    expect(container).toMatchSnapshot();
  });

  test("renders a loading message", async () => {
    renderContainer();

    expect(await findByText(container, "Loading...")).toBeInTheDocument();
  });

  test("renders an alert if API can't connect to server", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(404);

    await act(async () => {
      renderContainer();
    });

    expect(container.textContent).toContain(
      "ErrorCould not connect to the server"
    );
  });

  test("renders a message if no cards found", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, []);

    await act(async () => {
      renderContainer();
    });

    expect(container.textContent).toContain("No cards found!");
  });

  test("renders a page title", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    expect(container.textContent).toContain("Browse Cards");
  });

  test("renders an option for each object fetched from the API", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    const options = container.getElementsByTagName("option");

    expect(container.textContent).toContain("CatDogElephant");
    expect(options).toHaveLength(3);
  });

  test("renders a card with default text on load", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });
    expect(container.textContent).toContain(
      "Choose a card from the left to view its stats"
    );
  });

  test("shows stats of card from select menu when clicked", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);

    await act(async () => {
      renderContainer();
    });

    fireEvent.change(document.getElementById("selectCards"), {
      target: { value: "Cat" },
    });

    expect(container.textContent).toContain(
      'aka: "Furry demon" Alignment:Lawful Evil'
    );
  });

  test("renders an alert on 'delete all cards' press", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(200, fakeResponse);
    mock.onDelete("http://localhost:3000/cards").reply(200);

    await act(async () => {
      renderContainer();
    });

    fireEvent.click(getByText(container, "DELETE ALL CARDS"));

    expect(container.textContent).toContain("Are you sure?");
  });
});
