import "../styles/Alert.css";

function Alert({ message, alertType, onAlertPress }) {
  if (!message) return null;

  return (
    <div className="alert">
      <h2>{alertType}!</h2>
      <p>{message}</p>
      <button className="clearAlert" onClick={onAlertPress}>
        OK
      </button>
    </div>
  );
}

export default Alert;
