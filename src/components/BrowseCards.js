import "../styles/BrowseCards.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import Card from "../components/Card";

const BrowseCards = () => {
  const initialState = {
    alert: {
      message: "",
      alertType: "",
    },
    card: {
      name: "Choose a card from the left to view its stats",
      aka: "default__card",
    },
  };

  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(initialState.card);
  const [alert, setAlert] = useState(initialState.alert);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    axios
      .get("http://localhost:3000/cards")
      .then((response) => {
        setCards(response.data);
        setLoad(false);
      })
      .catch(() => {
        setAlert({
          message: "Could not connect to the server.",
          alertType: "Error",
        });
        setLoad(false);
      });
  }, []);

  const handleDeleteCard = (id) => {
    axios
      .delete(`http://localhost:3000/cards/${id}`)
      .then(() => setCards(cards.filter((card) => card.id !== id)))
      .then(() => {
        setCard(initialState.card);
      })
      .then(() => {
        setAlert({
          message: "Card deleted",
          alertType: "Success",
        });
      })
      .catch(() => {
        setAlert({
          message: "Could not connect to the server",
          alertType: "Error",
        });
      });
  };

  const handleAlertPress = () => {
    setAlert({
      message: "",
      alertType: "",
    });
  };

  if (!load) {
    return (
      <div className="BrowseCards">
        <h2>Browse Cards</h2>
        <div className="display">
          <select
            name="selectCards"
            id="selectCards"
            size="15"
            onChange={(e) =>
              setCard(
                cards[document.getElementById("selectCards").selectedIndex]
              )
            }
          >
            {cards.map((card) => (
              <option key={cards.indexOf(card)}>{card.name}</option>
            ))}
          </select>
          {!cards.length ? (
            <Card
              name={`No cards found! Go to "Create Cards" from the menu to add cards to your deck.`}
              aka="default__card"
            />
          ) : (
            <Card {...card} deleteCard={handleDeleteCard} />
          )}
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
      <div className="BrowseCards">
        <h2>Loading...</h2>
      </div>
    );
  }
};

export default BrowseCards;
