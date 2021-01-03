import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="buttons">
        <button type="button">Play</button>
        <Link to="/createcards">
          <button type="button">Create Cards</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
