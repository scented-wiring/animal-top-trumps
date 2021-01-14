import "../styles/GameUI.css";

const GameUI = ({ playerTurn, playField, win, lostCard, clearWin }) => {
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
          <div className="turn">Computer's Turn</div>
        )}
      </div>
    );
  }
};

export default GameUI;
