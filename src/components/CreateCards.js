import "../styles/CreateCards.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateCards() {
  const initialState = {
    fields: {
      name: "",
      aka: "",
      cool: 1,
      largeness: 1,
      handsome: 1,
      alignment: "",
    },
  };

  const [fields, setFields] = useState(initialState.fields);

  const handleAddCard = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/cards", { ...fields }).catch((error) => {
      console.log(error);
    });
  };

  const handleFieldChange = (event) => {
    if (event.target.type === "text") {
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
      <h2>Card Creator</h2>
      <form className="createCardsForm" onSubmit={handleAddCard}>
        <label htmlFor="name">
          Name*
          <input
            id="name"
            name="name"
            autoComplete="off"
            onChange={handleFieldChange}
            type="text"
            pattern="^(?=.*\S).+$"
            required
            title="Must be at least 1 non-space character"
          />
        </label>
        <label htmlFor="cool">
          Cool*
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
          Largeness*
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
          Handsome*
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
            type="text"
          />
        </label>
        <label htmlFor="alignment">
          Alignment
          <select
            id="alignment"
            name="alignment"
            onChange={handleFieldChange}
            type="text"
          >
            <option value="">-</option>
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="True Neutral">True Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaoti Evil">Chaotic Evil</option>
          </select>
        </label>
        <div className="validation">* Required fields</div>
        <button type="submit" className="addCardButton">
          Add Card
        </button>
      </form>
      <Link to="/">
        <h3>&larr; BACK</h3>
      </Link>
    </div>
  );
}

export default CreateCards;
