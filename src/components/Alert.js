import "../styles/Alert.css";
import { Link } from "react-router-dom";

const Alert = ({ message, alertType, onAlertPress }) => {
  if (!message) return null;

  return (
    <div className="Alert">
      <h2>{alertType}!</h2>
      <p>{message}</p>
      {alertType === "Error" ? (
        <Link to="/">
          <button className="clearAlert" onClick={onAlertPress}>
            BACK
          </button>
        </Link>
      ) : (
        <button className="clearAlert" onClick={onAlertPress}>
          OK
        </button>
      )}
    </div>
  );
};

export default Alert;
