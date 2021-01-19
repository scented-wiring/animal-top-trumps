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
  xtest("renders correctly", () => {
    renderContainer();
    expect(container).toMatchSnapshot();
  });

  xtest("renders home link", () => {
    renderContainer();
    const link = getByRole(container, "link");
    expect(link.textContent).toContain("← BACK");
    expect(link.getAttribute("href")).toBe("/");
  });

  xtest("renders 2 textboxes", () => {
    renderContainer();
    const textboxes = getAllByRole(container, "textbox");
    expect(textboxes).toHaveLength(2);
  });

  xtest("renders 4 select boxes", () => {
    renderContainer();
    const selectBoxes = getAllByRole(container, "combobox");
    expect(selectBoxes).toHaveLength(4);
  });

  xtest("renders a submit button", () => {
    renderContainer();
    const button = getByRole(container, "button");
    expect(button).toBeInTheDocument();
  });

  xtest("renders a success message on submit", async () => {
    var mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/cards").reply(200);

    await act(async () => {
      renderContainer();
    });

    await act(async () => {
      fireEvent.click(getByRole(container, "button"));
    });

    const successMessage = getByText(container, "Success!");
    expect(successMessage).toBeInTheDocument();
  });

  xtest("renders an error message on submit", async () => {
    var mock = new MockAdapter(axios);
    mock.onPost("http://localhost:3000/cards").reply(404);

    await act(async () => {
      renderContainer();
    });

    await act(async () => {
      fireEvent.click(getByRole(container, "button"));
    });

    const errorMessage = getByText(container, "Error!");
    expect(errorMessage).toBeInTheDocument();
  });
});
