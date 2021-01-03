import "../styles/App.css";
import Home from "../components/Home";
import { Switch, Route } from "react-router-dom";
import logo from "../dog.png";

function App() {
  return (
    <div className="App">
      <div className="title">
        <img id="logo" src={logo} alt="Logo" width="70px" height="70px" />
        <h1>Animal Top Trumps</h1>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
