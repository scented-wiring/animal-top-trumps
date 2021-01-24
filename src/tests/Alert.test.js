import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Alert from "../components/Alert";

describe("Alert component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<Alert />);
    expect(asFragment).toMatchSnapshot();
  });

  test("does not render an alert box if message prop is empty", () => {
    const { queryByText } = render(<Alert alertType="Success" />);
    expect(queryByText("Success!")).not.toBeInTheDocument();
  });

  test("renders an error message and back button", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Alert alertType="Error" message="test" />
      </BrowserRouter>
    );
    expect(getByText("Error")).toBeInTheDocument();
    expect(getByText("test")).toBeInTheDocument();
    expect(getByText("BACK")).toBeInTheDocument();
  });

  test("renders a success message and ok button", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Alert alertType="Success" message="test2" />
      </BrowserRouter>
    );
    expect(getByText("Success")).toBeInTheDocument();
    expect(getByText("test2")).toBeInTheDocument();
    expect(getByText("OK")).toBeInTheDocument();
  });

  test("renders a confirmation message and two buttons", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Alert alertType="Are you sure?" message="test3" />
      </BrowserRouter>
    );
    expect(getByText("Are you sure?")).toBeInTheDocument();
    expect(getByText("test3")).toBeInTheDocument();
    expect(getByText("CANCEL")).toBeInTheDocument();
    expect(getByText("DELETE")).toBeInTheDocument();
  });

  test("alert clears on OK press", () => {
    const clearAlert = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <Alert alertType="Success" message="test" setAlert={clearAlert} />
      </BrowserRouter>
    );
    fireEvent.click(getByText("OK"));
    expect(clearAlert).toHaveBeenCalled();
  });

  test("alert clears on BACK press", () => {
    const clearAlert = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <Alert alertType="Are you sure?" message="test" setAlert={clearAlert} />
      </BrowserRouter>
    );
    fireEvent.click(getByText("CANCEL"));
    expect(clearAlert).toHaveBeenCalled();
  });

  test("alert clears on CANCEL press", () => {
    const clearAlert = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <Alert alertType="Error" message="test" setAlert={clearAlert} />
      </BrowserRouter>
    );
    fireEvent.click(getByText("BACK"));
    expect(clearAlert).toHaveBeenCalled();
  });

  test("deletes all cards on confirmation press", () => {
    const deleteCards = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <Alert
          alertType="Are you sure?"
          message="Delete all cards? This cannot be undone."
          deleteAllCards={deleteCards}
        />
      </BrowserRouter>
    );
    fireEvent.click(getByText("DELETE"));
    expect(deleteCards).toHaveBeenCalled();
  });
});
