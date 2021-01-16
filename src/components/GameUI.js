import "../styles/GameUI.css";
import { Link } from "react-router-dom";

const GameUI = ({
  playerTurn,
  playField,
  win,
  lostCard,
  clearWin,
  cardHighField,
  gameWinner,
  tieCards,
  noCards,
}) => {
  if (gameWinner) {
    return (
      <div className="game-ui">
        <div className="status">{gameWinner} wins the game!</div>
        <div className="message">Game over!</div>
        <div className="buttons">
          <button onClick={() => window.location.reload()}>Play again</button>
          <Link to="/">
            <button>Back</button>
          </Link>
        </div>
      </div>
    );
  }
  if (win === "Tie") {
    return (
      <div className="game-ui">
        <div className="status">{win}!</div>
        <div className="message">
          Top player and computer cards added to tie deck.
          <br />
          <br />
          {tieCards} tie cards up for grabs next round!
        </div>
        <div className="clearAlert">
          <button className="clearAlert" onClick={clearWin}>
            OK
          </button>
        </div>
      </div>
    );
  }
  if (win) {
    return (
      <div className="game-ui">
        <div className="win">
          <div className="status">{win} wins!</div>
          <div className="message">
            {lostCard} {tieCards > 0 && `and ${tieCards} tie cards `}added to{" "}
            {win.toLowerCase()}'s deck!
          </div>
          <button className="clearAlert" onClick={clearWin}>
            OK
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="game-ui">
        {playerTurn ? (
          <div className="player-turn">
            <div className="status">
              {noCards ? `No cards found!` : `Player's turn`}
            </div>
            {tieCards > 0 && (
              <div className="tie">{tieCards} tie cards on the table!</div>
            )}
            <div className="message">
              {noCards
                ? `Go to "Create Cards" from the menu to add cards to your deck.`
                : `Select a field to play against your opponent:`}
            </div>
            {!noCards && (
              <div>
                <div className="field" onClick={() => playField("cool")}>
                  Cool
                </div>
                <div className="field" onClick={() => playField("largeness")}>
                  Largeness
                </div>
                <div className="field" onClick={() => playField("handsome")}>
                  Handsome
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="computer-turn">
            <div className="status">Computer's Turn</div>
            {tieCards > 0 && (
              <div className="tie">{tieCards} tie cards on the table!</div>
            )}
            <div className="message">Computer plays {cardHighField}!</div>
            <button
              className="clearAlert"
              onClick={() => playField(cardHighField)}
            >
              OK
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default GameUI;
