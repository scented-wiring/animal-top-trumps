import "../styles/Alert.css";

const Alert = ({ message, alertType, onAlertPress }) => {
  if (!message) return null;

  return (
    <div className="Alert">
      <h2>{alertType}!</h2>
      <p>{message}</p>
      <button className="clearAlert" onClick={onAlertPress}>
        OK
      </button>
    </div>
  );
};

export default Alert;
