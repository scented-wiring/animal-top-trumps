import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BrowseCards from "../components/BrowseCards";

beforeAll(() => {
  const script = document.createElement("script");
  document.body.appendChild(script);
});

test("renders correctly", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <BrowseCards />
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});

test("renders a title", () => {
  const { getByText } = render(
    <BrowserRouter>
      <BrowseCards />
    </BrowserRouter>
  );
  expect(getByText("Browse Cards")).toBeInTheDocument();
});
