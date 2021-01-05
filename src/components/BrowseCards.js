import "../styles/BrowseCards.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const BrowseCards = () => {
  const initialState = {
    alert: {
      message: "",
      alertType: "",
    },
  };

  const [cards, setCards] = useState([]);
  const [alert, setAlert] = useState(initialState.alert);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    axios
      .get("http://localhost:3000/cards")
      .then((response) => setCards(response.data))
      .catch(() => {
        setAlert({
          message: "Could not connect to the server.",
          alertType: "Error",
        });
      });
    setLoad(false);
  }, []);

  if (!load) {
    return (
      <div className="BrowseCards">
        <h2>Browse Cards</h2>
        <div className="display">
          <select name="selectCards" className="selectCards" size="15">
            {cards.map((card) => (
              <option key={card.id}>{card.name}</option>
            ))}
          </select>
        </div>
        <Alert message={alert.message} alertType={alert.alertType} />
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
