import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";

test("renders correctly", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});

test("renders two images", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getAllByRole("img")).toHaveLength(2);
});

test("renders three buttons", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getAllByRole("button")).toHaveLength(3);
});

test("renders four links", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getAllByRole("link")).toHaveLength(4);
});

test("renders footer text", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getByText("Created by Tom Hammersley 2021")).toBeInTheDocument();
});
