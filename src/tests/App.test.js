import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";

describe("App component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot();
  });

  test("renders the page title", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText("Animal Top Trumps")).toBeInTheDocument();
  });

  test("renders two home links", () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getAllByRole("link")).toBeTruthy();
    expect(getAllByRole("link")[0]).toHaveAttribute("href", "/");
    expect(getAllByRole("link")[1]).toHaveAttribute("href", "/");
  });

  test("switches components", () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(getByText("Browse Cards"));
    expect(getByText("Loading...")).toBeTruthy();
  });
});
