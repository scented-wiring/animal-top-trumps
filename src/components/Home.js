import "../styles/Home.css";

import { Link } from "react-router-dom";
import pokerdogs from "../pokerdogs.png";
import twitter from "../twitter.png";

const Home = () => {
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
          <button type="button">Play</button>
        </Link>
        <Link to="/browsecards">
          <button type="button">Browse Cards</button>
        </Link>
        <Link to="/createcards">
          <button type="button">Create Cards</button>
        </Link>
        <Link to="/instructions">
          <button type="button">Instructions</button>
        </Link>
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
