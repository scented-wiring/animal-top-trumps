import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";

const Play = () => {
  const initialState = {
    alert: {
      message: "",
      alertType: "",
    },
  };

  const [cards, setCards] = useState([]);
  const [alert, setAlert] = useState(initialState.alert);
  const [load, setLoad] = useState([true]);

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get("http://localhost:3000/cards")
      .then((response) => setCards(response.data))
      .catch(() => {
        setAlert({
          message: "Could not connect to the server.",
          alertType: "Error",
        });
      });
    setLoad(false);
  }, []);

  if (!load) {
    shuffle(cards);
  }

  const handleAlertPress = () => {
    setAlert({
      message: "",
      alertType: "",
    });
  };

  return (
    <div className="Play">
      {" "}
      <Alert
        message={alert.message}
        alertType={alert.alertType}
        onAlertPress={handleAlertPress}
      />
      Test
    </div>
  );
};

export default Play;
