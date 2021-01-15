import "../styles/Play.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import Card from "../components/Card";
import GameUI from "../components/GameUI";

const Play = () => {
  const initialState = {
    alert: {
      message: "",
      alertType: "",
    },
  };

  const [playerCards, setPlayerCards] = useState([]);
  const [playerCard, setPlayerCard] = useState({});
  const [computerCards, setComputerCards] = useState([]);
  const [computerCard, setComputerCard] = useState({});
  const [lostCard, setLostCard] = useState("");
  const [cardHighField, setCardHighField] = useState("");
  const [showWonCard, setShowWonCard] = useState(false);

  const [playerTurn, setPlayerTurn] = useState(true);

  const [tieCards, setTieCards] = useState([]);
  const [win, setWin] = useState("");
  const [gameWinner, setGameWinner] = useState("");

  const [alert, setAlert] = useState(initialState.alert);
  const [load, setLoad] = useState([true]);

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const removeLostCards = (cards, setCards, setCard) => {
    cards.splice(0, 1);
    setCards(cards);
    setCard(cards[0]);
  };

  const handlePlayField = (field) => {
    if (playerCard[field] === computerCard[field]) {
      //tie
      setTieCards((tieCards) => [...tieCards, playerCard, computerCard]);
      removeLostCards(computerCards, setComputerCards, setComputerCard);
      removeLostCards(playerCards, setPlayerCards, setPlayerCard);
      setWin("Tie");
    } else if (playerCard[field] > computerCard[field]) {
      //player win
      setLostCard(computerCard.name);
      setShowWonCard(true);
      playerCards.push(computerCard);
      setPlayerCards(playerCards);
      if (tieCards.length > 0) {
        setPlayerCards(playerCards.concat(tieCards));
      }
      removeLostCards(computerCards, setComputerCards, setComputerCard);
      setPlayerTurn(true);
      setWin("Player");
    } else {
      //computer win
      setLostCard(playerCard.name);
      computerCards.push(playerCard);
      setComputerCards(computerCards);
      if (tieCards.length > 0) {
        setComputerCards(computerCards.concat(tieCards));
      }

      removeLostCards(playerCards, setPlayerCards, setPlayerCard);
      setPlayerTurn(false);
      setWin("Computer");

      // The below block is required to remove the "id" key from playable fields
      let cardValues = Object.assign(
        {},
        {
          cool: computerCard.cool,
          handsome: computerCard.handsome,
          largeness: computerCard.largeness,
        }
      );
      let highValue = Math.max(...Object.values(cardValues));
      setCardHighField(
        Object.keys(computerCard).find((key) => computerCard[key] === highValue)
      );

      setPlayerTurn(false);
    }
  };

  const handleClearWin = () => {
    setWin(false);
    setShowWonCard(false);
    if (win !== "Tie") {
      setTieCards([]);
    }
    if (playerCards.length === 0) {
      setGameWinner("Computer");
    } else if (computerCards.length === 0) {
      setGameWinner("Player");
    }
  };

  const handleAlertPress = () => {
    setAlert({
      message: "",
      alertType: "",
    });
  };

  useEffect(() => {
    const deal = (array) => {
      let i;
      for (i = 0; i < array.length; i++) {
        if (array.indexOf(array[i]) % 2 === 0) {
          playerCards.push(array[i]);
        } else {
          computerCards.push(array[i]);
        }
      }
    };

    axios
      .get("http://localhost:3000/cards")
      .then((response) => {
        deal(shuffle(response.data));
        setPlayerCard(playerCards[0]);
        setComputerCard(computerCards[0]);
        setLoad(false);
      })
      .catch(() => {
        setAlert({
          message: "Could not connect to the server.",
          alertType: "Error",
        });
      });
  }, []);

  if (!load) {
    return (
      <div className="Play">
        <div className="game-area">
          <div className="player">
            <div className="score">Player: {playerCards.length} cards</div>
            {showWonCard ? (
              <Card {...playerCards.find((card) => card.name === lostCard)} /> // Displays the card that the player has won
            ) : (
              <Card {...playerCard} deckSize={playerCards.length} />
            )}
          </div>

          <GameUI
            playerTurn={playerTurn}
            playField={handlePlayField}
            win={win}
            lostCard={lostCard}
            clearWin={handleClearWin}
            cardHighField={cardHighField}
            gameWinner={gameWinner}
            tieCards={tieCards.length}
          />

          <div className="computer">
            <div className="score">Computer: {computerCards.length} cards</div>
            <Card {...computerCard} deckSize={computerCards.length} />
          </div>
        </div>

        <Alert
          message={alert.message}
          alertType={alert.alertType}
          onAlertPress={handleAlertPress}
        />

        <Link to="/">
          <h3>&larr; BACK</h3>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="Play">
        <h2>Loading...</h2>
      </div>
    );
  }
};

export default Play;
