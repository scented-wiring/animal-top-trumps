import "../styles/Card.css";

const Card = ({
  name,
  cool,
  largeness,
  handsome,
  aka,
  alignment,
  id,
  deleteCard,
}) => {
  if (aka === "default__card") {
    return (
      <div className="Card">
        <div className="other-stat">{name}</div>
      </div>
    );
  } else {
    return (
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
    );
  }
};

export default Card;
