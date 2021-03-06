import "../styles/App.css";
import Home from "../components/Home";
import Play from "../components/Play";
import BrowseCards from "../components/BrowseCards";
import CreateCards from "../components/CreateCards";
import Instructions from "../components/Instructions";
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
        <Route exact path="/play" component={Play} />
        <Route exact path="/browsecards" component={BrowseCards} />
        <Route exact path="/createcards" component={CreateCards} />
        <Route exact path="/instructions" component={Instructions} />
      </Switch>
    </div>
  );
};

export default App;
