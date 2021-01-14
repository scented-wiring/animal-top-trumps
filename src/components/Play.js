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

  const [playerTurn, setPlayerTurn] = useState(true);
  const [win, setWin] = useState("");

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

  const handleAlertPress = () => {
    setAlert({
      message: "",
      alertType: "",
    });
  };

  const handlePlayField = (field) => {
    if (playerCard[field] > computerCard[field]) {
      setPlayerCards((playerCards) => [...playerCards, computerCard]);
      computerCards.splice(0, 1);
      setComputerCards(computerCards);
      setWin("Player");
      setLostCard(computerCard.name);
    } else {
      setComputerCards((computerCards) => [...computerCards, computerCard]);
      playerCards.splice(0, 1);
      setPlayerCards(playerCards);
      setPlayerCard(playerCards[0]);
      setWin("Computer");
      setLostCard(playerCard.name);
    }
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
            <Card {...playerCard} />
          </div>

          <GameUI
            playerTurn={playerTurn}
            playField={handlePlayField}
            win={win}
            lostCard={lostCard}
            clearWin={() => setWin("")}
          />

          <div className="computer">
            <div className="score">Computer: {computerCards.length} cards</div>
            <Card {...computerCard} secret={true} />
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
