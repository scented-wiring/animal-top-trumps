import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByText,
} from "@testing-library/react";
import CreateCards from "../components/CreateCards";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const renderContainer = () => {
  render(
    <BrowserRouter>
      <CreateCards />
    </BrowserRouter>,
    container
  );
};

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

describe("Create Cards component", () => {
  test("renders correctly", () => {
    renderContainer();
    expect(container).toMatchSnapshot();
  });

  test("renders home link", () => {
    renderContainer();
    const link = getByRole(container, "link");
    expect(link.textContent).toContain("← BACK");
    expect(link.getAttribute("href")).toBe("/");
  });

  test("renders 2 textboxes", () => {
    renderContainer();
    const textboxes = getAllByRole(container, "textbox");
    expect(textboxes).toHaveLength(2);
  });

  test("renders 4 select boxes", () => {
    renderContainer();
    const selectBoxes = getAllByRole(container, "combobox");
    expect(selectBoxes).toHaveLength(4);
  });

  test("renders two submit button", () => {
    renderContainer();
    const buttons = getAllByRole(container, "button");
    expect(buttons).toHaveLength(2);
  });

  test("renders a success message on card submit", async () => {
    var mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/cards").reply(200);

    await act(async () => {
      renderContainer();
    });

    await act(async () => {
      fireEvent.click(getAllByRole(container, "button")[0]);
    });

    expect(getByText(container, "Success")).toBeInTheDocument();
    expect(getByText(container, "Card created.")).toBeInTheDocument();
  });

  test("renders an error message on card submit", async () => {
    var mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/cards").reply(404);

    await act(async () => {
      renderContainer();
    });

    await act(async () => {
      fireEvent.click(getAllByRole(container, "button")[0]);
    });

    expect(getByText(container, "Error")).toBeInTheDocument();
  });

  test("renders a success message on starter cards submit", async () => {
    var mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/cards").reply(200);

    await act(async () => {
      renderContainer();
    });

    await act(async () => {
      fireEvent.click(getAllByRole(container, "button")[1]);
    });

    expect(getByText(container, "Success")).toBeInTheDocument();
    expect(getByText(container, "Starter cards added.")).toBeInTheDocument();
  });

  test("renders an error message on starter cards submit", async () => {
    var mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/cards").reply(404);

    await act(async () => {
      renderContainer();
    });

    await act(async () => {
      fireEvent.click(getAllByRole(container, "button")[1]);
    });

    expect(getByText(container, "Error")).toBeInTheDocument();
    expect(
      getByText(container, "Could not connect to the server.")
    ).toBeInTheDocument();
  });
});
