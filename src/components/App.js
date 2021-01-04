import "../styles/App.css";
import Home from "../components/Home";
import CreateCards from "../components/CreateCards";
import { Link, Switch, Route } from "react-router-dom";
import logo from "../dog.png";

const App = () => {
  return (
    <div className="App">
      <div className="title">
        <Link to="/">
          <img id="logo" src={logo} alt="Logo" width="70px" height="70px" />{" "}
        </Link>
        <Link to="/">
          <h1>Animal Top Trumps</h1>
        </Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createcards" component={CreateCards} />
      </Switch>
    </div>
  );
};

export default App;
