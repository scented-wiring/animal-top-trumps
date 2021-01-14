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
  if (win) {
    return (
      <div className="game-ui">
        <div className="win">
          <div className="status">{win} wins!</div>
          <div className="message">
            {lostCard} added to {win.toLowerCase()}'s deck.
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
            <div className="status">Player's Turn</div>
            <div className="message">
              Select a field to play <br /> against your opponent:
            </div>
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
        ) : (
          <div className="computer-turn">
            <div className="status">Computer's Turn</div>
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