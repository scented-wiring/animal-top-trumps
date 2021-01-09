import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import BrowseCards from "../components/BrowseCards";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const renderContainer = () => {
  render(
    <BrowserRouter>
      <BrowseCards />
    </BrowserRouter>,
    container
  );
};

const fakeResponse = [
  { id: 1, name: "Cat" },
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

  test("renders an alert if API can't connect to server", async () => {
    var mock = new MockAdapter(axios);
    mock.onGet("http://localhost:3000/cards").reply(404);

    await act(async () => {
      renderContainer();
    });

    expect(container.textContent).toContain(
      "Error!Could not connect to the server"
    );
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
});
