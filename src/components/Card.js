import "../styles/Card.css";
import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import logo from "../dog.png";

const api = createApi({
  accessKey: "jsioAkwwM5Hg_da8KPqPHaVc67Y-HkofLqQY7NEbOL0",
});

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
  deckSize,
}) => {
  const [photo, setPhoto] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    api.search
      .getPhotos({
        query: name,
        orientation: "landscape",
        page: 1,
        perPage: 1,
      })
      .then((result) => {
        setPhoto(result.response.results[0]);
        setLoad(false);
      })
      .catch(() => {
        console.log("something went wrong!");
        setLoad(false);
      });
  }, [name]);

  if (aka === "default__card") {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="name">{name}</div>
        </div>
      </div>
    );
  } else if (deckSize === 0) {
    return <div className="no-cards"></div>;
  } else if (hide) {
    return (
      <div className="hidden-card">
        <div className="text">
          Animal <br />
          Top Trumps
        </div>
        <img
          id="card-logo-back"
          src={logo}
          alt="Logo"
          height="96px"
          width="96px"
        />
      </div>
    );
  } else if (!load) {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="name">{name}</div>
          <div className="aka">"{aka}"</div>
          <div className="alignment">({alignment})</div>
          {load ? (
            <div className="cardload">Loading Photo...</div>
          ) : !deleteCard ? (
            <img
              id="card-logo-front"
              src={photo.urls.small}
              alt="Logo"
              height="150px"
              width="200px"
            />
          ) : (
            <img
              id="card-logo-front"
              src={photo.urls.small}
              alt="Logo"
              height="100px"
              width="150px"
            />
          )}
          <div className="stat-name1">
            Cool: <div className="stat1">{cool}</div>
          </div>
          <div className="stat-name2">
            Largeness: <div className="stat2">{largeness}</div>
          </div>
          <div className="stat-name1">
            Handsome: <div className="stat1">{handsome}</div>
          </div>

          {deleteCard && (
            <div className="delete">
              <button onClick={() => deleteCard(id)}>DELETE</button>
            </div>
          )}
          <div className="footer">
            Photo by{" "}
            <a
              className="photographer-link"
              href={`https://unsplash.com/@${photo.user.username}?utm_source=Animal Top Trumps&utm_medium=referral`}
              target="_blank"
              rel="noreferrer"
            >
              {photo.user.name}
            </a>{" "}
            on{" "}
            <a
              className="photographer-link"
              href="https://unsplash.com/?utm_source=Animal Top Trumps&utm_medium=referral"
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Card-border">
        <div className="Card"></div>
      </div>
    );
  }
};

export default Card;
