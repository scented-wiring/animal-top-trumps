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
      message: "Choose a card from the left to view its stats.",
      defaultText: true,
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

  const handleDeleteAllCards = () => {
    axios
      .delete("http://localhost:3000/cards")
      .then(() => setCards([]))
      .then(() => {
        setAlert({
          message: "Cards deleted",
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

  if (!load) {
    return (
      <div className="BrowseCards">
        <h2>Browse Cards</h2>
        <div className="display">
          <select
            name="selectCards-drop"
            id="selectCards-drop"
            onChange={(e) =>
              setCard(
                cards[document.getElementById("selectCards-drop").selectedIndex]
              )
            }
          >
            {cards.map((card) => (
              <option key={cards.indexOf(card)}>{card.name}</option>
            ))}
          </select>
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
              defaultText={true}
              message={`No cards found! Go to "Create Cards" from the menu to add cards to your deck.`}
            />
          ) : (
            <Card {...card} deleteCard={handleDeleteCard} />
          )}
        </div>
        {cards.length > 0 && (
          <div id="browse-buttons">
            <button
              id="delete"
              onClick={() =>
                setAlert({
                  message: `Delete ${card.name}? This action cannot be undone.`,
                  alertType: "Are you sure?",
                })
              }
            >
              DELETE CURRENT CARD
            </button>
            <button
              id="delete"
              onClick={() =>
                setAlert({
                  message: "Delete all cards? This cannot be undone.",
                  alertType: "Are you sure?",
                })
              }
            >
              DELETE ALL CARDS
            </button>
          </div>
        )}
        <Alert
          setAlert={setAlert}
          message={alert.message}
          alertType={alert.alertType}
          id={card.id}
          deleteCard={handleDeleteCard}
          deleteAllCards={handleDeleteAllCards}
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
