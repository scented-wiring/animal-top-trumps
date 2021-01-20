import "../styles/CreateCards.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";
import { addStarterDeck } from "../helpers";

const CreateCards = () => {
  const initialState = {
    fields: {
      name: "",
      aka: "",
      cool: 1,
      largeness: 1,
      handsome: 1,
      alignment: "Lawful Good",
    },
    alert: {
      message: "",
      alertType: "",
    },
  };

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const handleAddCard = (event) => {
    event.preventDefault();
    document.getElementsByClassName("createCardsForm")[0].reset();
    if (fields.cool + fields.largeness + fields.handsome > 25) {
      setAlert({
        message:
          "Your card is too powerful! The maximum total for the numerical parameters is 25.",
        alertType: "Error",
      });
    } else {
      axios
        .post("http://localhost:3000/cards", { ...fields })
        .then(() =>
          setAlert({
            message: "Card created.",
            alertType: "Success",
          })
        )
        .catch(() => {
          setAlert({
            message: "Could not connect to the server.",
            alertType: "Error",
          });
        });
    }
  };

  const handleFieldChange = (event) => {
    if (
      event.target.name === "name" ||
      event.target.name === "alignment" ||
      event.target.name === "aka"
    ) {
      setFields({ ...fields, [event.target.name]: event.target.value });
    } else {
      setFields({
        ...fields,
        [event.target.name]: parseInt(event.target.value, 10),
      });
    }
  };

  return (
    <div className="CreateCards">
      <Alert
        setAlert={setAlert}
        message={alert.message}
        alertType={alert.alertType}
      />
      <h2>Card Creator</h2>
      <form className="createCardsForm" onSubmit={handleAddCard}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            autoComplete="off"
            onChange={handleFieldChange}
            maxLength="17"
            pattern="^(?=.*\S).+$"
            required
            title="Must be at least 1 non-space character"
          />
        </label>
        <label htmlFor="cool">
          Cool
          <select
            className="selectNumber"
            name="cool"
            onChange={handleFieldChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <label htmlFor="largeness">
          Largeness
          <select
            className="selectNumber"
            name="largeness"
            onChange={handleFieldChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <label htmlFor="handsome">
          Handsome
          <select
            className="selectNumber"
            name="handsome"
            onChange={handleFieldChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <label htmlFor="aka">
          aka (Nickname)
          <input
            id="aka"
            name="aka"
            autoComplete="off"
            onChange={handleFieldChange}
            maxLength="20"
            pattern="^(?=.*\S).+$"
            required
            title="Must be at least 1 non-space character"
          />
        </label>
        <label htmlFor="alignment">
          Alignment
          <select id="alignment" name="alignment" onChange={handleFieldChange}>
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="True Neutral">True Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaotic Evil">Chaotic Evil</option>
          </select>
        </label>
        <div className="note">
          Note: "aka" and "alignment" are just for fun and do not have any
          bearing on the gameplay.
        </div>
        <button type="submit">Add Card</button>
      </form>
      <div className="starter-deck">
        <div className="starter-text">
          Or press this button to add <br />
          20 starter cards to your deck:
        </div>
        <button type="submit" onClick={() => addStarterDeck(setAlert)}>
          Add Cards
        </button>
      </div>
      <Link to="/">
        <h3>&larr; BACK</h3>
      </Link>
    </div>
  );
};

export default CreateCards;
