import "../styles/Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import pokerdogs from "../pokerdogs.png";
import twitter from "../twitter.png";

const Home = () => {
  const [hover, setHover] = useState("");

  return (
    <div className="home">
      <img
        id="pokerdogs"
        src={pokerdogs}
        alt="dogs playing poker"
        width="500px"
      />
      <div className="buttons">
        <Link to="/play">
          <button
            type="button"
            onMouseOver={() => setHover("play")}
            onMouseOut={() => setHover("")}
          >
            Play
          </button>
        </Link>
        <Link to="/browsecards">
          <button
            type="button"
            onMouseOver={() => setHover("browse")}
            onMouseOut={() => setHover("")}
          >
            Browse Cards
          </button>
        </Link>
        <Link to="/createcards">
          <button
            type="button"
            onMouseOver={() => setHover("create")}
            onMouseOut={() => setHover("")}
          >
            Create Cards
          </button>
        </Link>
        <Link to="/instructions">
          <button
            type="button"
            onMouseOver={() => setHover("instructions")}
            onMouseOut={() => setHover("")}
          >
            Instructions
          </button>
        </Link>
      </div>
      <div className="description">
        {hover === "play" &&
          "Battle against a highly skilled computer using your Top Trumps deck."}
        {hover === "browse" &&
          "View the stats of (or delete) cards from your Top Trumps deck."}
        {hover === "create" &&
          "Add personalised cards to your Top Trumps deck."}
        {hover === "instructions" && "How the game and card creation works."}
      </div>
      <footer>
        Created by Tom Hammersley 2021{" "}
        <a
          href="https://twitter.com/scentedwiring"
          target="_blank"
          rel="noreferrer"
        >
          <img id="twitter" src={twitter} alt="twitter" height="25px" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
