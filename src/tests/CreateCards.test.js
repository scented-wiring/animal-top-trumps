import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateCards from "../components/CreateCards";

test("renders correctly", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <CreateCards />
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot();
});

test("renders back link", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <CreateCards />
    </BrowserRouter>
  );
  expect(getAllByRole("link")).toHaveLength(1);
});

test("renders 2 textboxes", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <CreateCards />
    </BrowserRouter>
  );
  expect(getAllByRole("textbox")).toHaveLength(2);
});

test("renders 4 select boxes", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <CreateCards />
    </BrowserRouter>
  );
  expect(getAllByRole("combobox")).toHaveLength(4);
});

test("renders a button", () => {
  const { getAllByRole } = render(
    <BrowserRouter>
      <CreateCards />
    </BrowserRouter>
  );
  expect(getAllByRole("button")).toHaveLength(1);
});
