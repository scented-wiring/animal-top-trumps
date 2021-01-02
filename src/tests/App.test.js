import { render } from "@testing-library/react";
import App from "../components/App";

test("renders correctly", () => {
  const { asFragment } = render(<App />);
  expect(asFragment).toMatchSnapshot();
});

test("renders the page title", () => {
  const { getByText } = render(<App />);
  expect(getByText("Animal Top Trumps")).toBeInTheDocument();
});

test("renders two buttons", () => {
  const { getAllByRole } = render(<App />);
  expect(getAllByRole("button")).toHaveLength(2);
});
