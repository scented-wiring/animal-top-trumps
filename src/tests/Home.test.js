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

test("renders two buttons", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  expect(getAllByRole("button")).toHaveLength(2);
});
