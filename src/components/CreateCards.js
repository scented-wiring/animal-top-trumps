import "../styles/CreateCards.css";
import { Link } from "react-router-dom";

function CreateCards() {
  return (
    <div className="CreateCards">
      <Link to="/">
        <h2>&larr; BACK</h2>
      </Link>
      <form className="createCardsForm">
        <label htmlFor="name">
          Name
          <input id="name" name="name" autoComplete="off" />
        </label>
        <label htmlFor="cool">
          Cool
          <select className="selectNumber" name="cool">
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
          <select className="selectNumber" name="largeness">
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
          <select className="selectNumber" name="Handsome">
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
          <input id="aka" name="aka" autoComplete="off" />
        </label>
        <label htmlFor="alignment">
          Alignment
          <select id="alignment" name="alignment">
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
        <button type="submit" className="addCardButton">
          Add Card
        </button>
      </form>
      <div className="note">
        <p>
          Note: "aka" and "alignment" are just for fun and not required fields.
        </p>
      </div>
    </div>
  );
}

export default CreateCards;
