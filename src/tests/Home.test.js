import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";

describe("Home component", () => {
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

  test("renders description on button mouse over and removes on mouse out", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(getByText("Created by Tom Hammersley 2021")).toBeInTheDocument();
  });

  test("renders footer text", () => {
    const { queryByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.mouseOver(queryByText("Play"));
    expect(
      queryByText(
        "Battle against a highly skilled computer using your Top Trumps deck."
      )
    ).toBeInTheDocument();
    fireEvent.mouseOut(queryByText("Play"));
    expect(
      queryByText(
        "Battle against a highly skilled computer using your Top Trumps deck."
      )
    ).not.toBeInTheDocument();
    fireEvent.mouseOver(queryByText("Browse Cards"));
    expect(
      queryByText(
        "View the stats of (or delete) cards from your Top Trumps deck."
      )
    ).toBeInTheDocument();
    fireEvent.mouseOut(queryByText("Browse Cards"));
    expect(
      queryByText(
        "View the stats of (or delete) cards from your Top Trumps deck."
      )
    ).not.toBeInTheDocument();
    fireEvent.mouseOver(queryByText("Create Cards"));
    expect(
      queryByText("Add personalised cards to your Top Trumps deck.")
    ).toBeInTheDocument();
    fireEvent.mouseOut(queryByText("Create Cards"));
    expect(
      queryByText("Add personalised cards to your Top Trumps deck.")
    ).not.toBeInTheDocument();
  });
});
