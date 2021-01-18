import { getAllByRole, getByText, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";

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

test("renders two links", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(getAllByRole("link")).toBeTruthy();
  console.log(getAllByRole("link")[0]);
});
