import "../styles/Alert.css";
import { Link } from "react-router-dom";

const Alert = ({ setAlert, message, alertType, deleteAllCards }) => {
  const clearAlert = () => {
    setAlert({
      message: "",
      alertType: "",
    });
  };

  let buttons;

  if (alertType === "Error") {
    buttons = (
      <Link to="/">
        <button className="clearAlert" onClick={() => clearAlert()}>
          BACK
        </button>
      </Link>
    );
  } else if (alertType === "Are you sure?") {
    buttons = (
      <div className="error-buttons">
        <button className="clearAlert" onClick={() => clearAlert()}>
          CANCEL
        </button>
        <button className="clearAlert" onClick={() => deleteAllCards()}>
          DELETE
        </button>
      </div>
    );
  } else {
    buttons = (
      <button className="clearAlert" onClick={() => clearAlert()}>
        OK
      </button>
    );
  }

  if (!message) return null;
  else {
    return (
      <div className="Alert">
        <h2>{alertType}</h2>
        <p>{message}</p>
        {buttons}
      </div>
    );
  }
};

export default Alert;
