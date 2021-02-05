import "../styles/Card.css";
import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import logo from "../dog.png";
import key from "../accessKey";

const api = createApi({
  accessKey: key,
});

const Card = ({
  name,
  cool,
  largeness,
  handsome,
  aka,
  alignment,
  hide,
  deckSize,
  defaultText,
  message,
}) => {
  const [photo, setPhoto] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setLoad(true);
    if (!defaultText) {
      api.search
        .getPhotos({
          query: name,
          orientation: "landscape",
          page: 1,
          perPage: 1,
        })
        .then((result) => {
          if (!isCancelled) {
            setPhoto(result.response.results[0]);
            setLoad(false);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setPhoto(false);
            setLoad(false);
          }
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [name, defaultText]);

  if (defaultText) {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="default-message">{message}</div>
        </div>
      </div>
    );
  } else if (deckSize === 0) {
    return <div className="no-cards"></div>;
  } else if (hide) {
    return (
      <div className="hidden-card">
        <div id="card-back-text">
          Animal <br />
          Top Trumps
        </div>
        <img
          id="card-back-logo"
          src={logo}
          alt="Logo"
          height="96px"
          width="96px"
        />
      </div>
    );
  } else {
    return (
      <div className="Card-border">
        <div className="Card">
          <div className="name">{name}</div>
          <div className="aka">"{aka}"</div>
          <div className="alignment">({alignment})</div>
          {load ? (
            <div className="loading">Loading image...</div>
          ) : !photo ? (
            <div
              id="nophoto"
              style={{ width: "200px", height: "150px", fontSize: "20px" }}
            >
              <br />
              No photo results for "{name}" found
            </div>
          ) : (
            <img
              id="photo"
              src={photo.urls.small}
              alt="Logo"
              height="150px"
              width="200px"
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
          {photo && (
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
          )}
        </div>
      </div>
    );
  }
};

export default Card;
