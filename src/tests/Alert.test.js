import { render } from "@testing-library/react";
import Alert from "../components/Alert";

test("renders correctly", () => {
  const { asFragment } = render(<Alert />);
  expect(asFragment).toMatchSnapshot();
});

test("does not render an alert box if message prop is empty", () => {
  const { queryByText } = render(<Alert alertType="Success" />);
  expect(queryByText("Success!")).not.toBeInTheDocument();
});

test("displays an error message", () => {
  const { getByText } = render(<Alert alertType="Error" message="test" />);
  expect(getByText("Error!")).toBeInTheDocument();
});

test("displays an success message", () => {
  const { getByText } = render(<Alert alertType="Success" message="test" />);
  expect(getByText("Success!")).toBeInTheDocument();
});
