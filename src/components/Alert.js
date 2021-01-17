import "../styles/Alert.css";
import { Link } from "react-router-dom";

const Alert = ({ setAlert, message, alertType }) => {
  const clearAlert = () => {
    setAlert({
      message: "",
      alertType: "",
    });
  };

  if (!message) return null;

  return (
    <div className="Alert">
      <h2>{alertType}!</h2>
      <p>{message}</p>
      {alertType === "Error" ? (
        <Link to="/">
          <button className="clearAlert" onClick={() => clearAlert()}>
            BACK
          </button>
        </Link>
      ) : (
        <button className="clearAlert" onClick={() => clearAlert()}>
          OK
        </button>
      )}
    </div>
  );
};

export default Alert;
