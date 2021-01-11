import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Play from "../components/Play";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
    cool: 6,
    largeness: 6,
    handsome: 10,
    aka: "Hairy friend",
    alignment: "Good",
  },
  { id: 2, name: "Cat" },
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
});
