import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GameUI from "../components/GameUI";

describe("GameUI component", () => {
  test("renders correctly", () => {
    const { asFragment } = render(<GameUI />);

    expect(asFragment).toMatchSnapshot();
  });

  test("renders a message if deck contains no cards", () => {
    const { getByText } = render(<GameUI noCards={true} />);

    expect(getByText("No cards found")).toBeInTheDocument();
    expect(
      getByText('Go to "Create Cards" from the menu to add cards to your deck.')
    ).toBeInTheDocument();
  });

  test("renders a message and two link buttons if the game is won", () => {
    const { getByText, getAllByRole } = render(
      <BrowserRouter>
        <GameUI gameWinner="Player" />
      </BrowserRouter>
    );

    expect(getByText("Player wins the game!")).toBeInTheDocument();
    expect(getByText("Game over")).toBeInTheDocument();
    expect(getAllByRole("button")).toHaveLength(2);
    expect(getAllByRole("button")[0].textContent).toContain("Play again");
    expect(getAllByRole("button")[1].textContent).toContain("Back");
  });

  test("renders a message, number of tie cards and confirmation button if win is equal to tie", () => {
    const { getByText, getByRole } = render(
      <GameUI win="Tie" tieCardsLength={4} />
    );

    expect(getByText("Tie!")).toBeInTheDocument();
    expect(
      getByText(
        "Top player and computer cards added to tie deck. 4 tie cards up for grabs next round."
      )
    ).toBeInTheDocument();
    expect(getByRole("button").textContent).toContain("OK");
  });

  test("renders a message, won card names and confirmation button on round win", () => {
    const { getByText, getByRole } = render(
      <GameUI
        win="Player"
        lostCard="Elephant"
        tieCardsLength={2}
        tieCards={[{ name: "Cat" }, { name: "Dog" }]}
      />
    );

    expect(getByText("Player wins!")).toBeInTheDocument();
    expect(
      getByText(`Elephant, Cat, and Dog added to the back of player's deck.`)
    ).toBeInTheDocument();
    expect(getByRole("button").textContent).toContain("OK");
  });

  test("renders a message and 3 field options on player turn", () => {
    const { getByText } = render(<GameUI playerTurn={true} />);

    expect(getByText(`Player's turn`)).toBeInTheDocument();
    expect(
      getByText("Select a field to play against your opponent:")
    ).toBeInTheDocument();
    expect(getByText("Cool", "Largeness", "Handsome")).toBeInTheDocument();
  });

  test("renders a message, computer card high value and confirmation button on computer turn", () => {
    const { getByText, getByRole } = render(
      <GameUI playerTurn={false} cardHighField="test" />
    );

    expect(getByText(`Computer's turn`)).toBeInTheDocument();
    expect(getByText("Computer plays test...")).toBeInTheDocument();
    expect(getByRole("button").textContent).toContain("OK");
  });
});
