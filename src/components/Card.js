import "../styles/Card.css";
import logo from "../dog.png";

const Card = ({
  name,
  cool,
  largeness,
  handsome,
  aka,
  alignment,
  id,
  deleteCard,
  hide,
}) => {
  if (aka === "default__card") {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="other-stat">{name}</div>
        </div>
      </div>
    );
  } else if (hide) {
    return (
      <div className="hidden-card">
        <div className="text">
          Animal <br />
          Top Trumps
        </div>
        <img id="card-logo" src={logo} alt="Logo" height="96px" width="96px" />
      </div>
    );
  } else {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="name">{name}</div>
          <div className="other-stat">Cool: {cool} </div>
          <div className="other-stat">Largeness: {largeness} </div>
          <div className="other-stat">Handsome: {handsome} </div>
          <div className="other-stat">
            aka: <br />"{aka}"{" "}
          </div>
          <div className="other-stat">
            Alignment:
            <br />
            {alignment}{" "}
          </div>
          {deleteCard && (
            <div className="delete">
              <button onClick={() => deleteCard(id)}>DELETE</button>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Card;
