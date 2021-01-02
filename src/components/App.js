import "../styles/App.css";
import logo from "../dog.png";

function App() {
  return (
    <div className="App">
      <div className="title">
        <img id="logo" src={logo} alt="Logo" width="70px" height="70px" />
        <h1>Animal Top Trumps</h1>
      </div>
      <div className="buttons">
        <button type="button">Play</button>
        <button type="button">Create Cards</button>
      </div>
    </div>
  );
}

export default App;
