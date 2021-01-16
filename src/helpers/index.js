import axios from "axios";

const addStarterDeck = (setAlert) => {
  axios
    .all([
      axios.post("http://localhost:3000/cards", {
        name: "Dog",
        aka: "Best friend",
        cool: 6,
        largeness: 5,
        handsome: 10,
        alignment: "Lawful Good",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Cat",
        aka: "Tiddles",
        cool: 10,
        largeness: 4,
        handsome: 8,
        alignment: "Lawful Evil",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Goldfish",
        aka: "Flipper",
        cool: 4,
        largeness: 2,
        handsome: 7,
        alignment: "True Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Sheep",
        aka: "Sheeple",
        cool: 4,
        largeness: 5,
        handsome: 5,
        alignment: "Chaotic Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Weevil",
        aka: "Tiny lad",
        cool: 1,
        largeness: 1,
        handsome: 1,
        alignment: "Chaotic Weevil",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Snake",
        aka: "Long lad",
        cool: 10,
        largeness: 3,
        handsome: 7,
        alignment: "Lawful Evil",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Elephant",
        aka: "Leg-face",
        cool: 7,
        largeness: 10,
        handsome: 7,
        alignment: "Chaotic Good",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Giant Stag Beetle",
        aka: "Blimey",
        cool: 10,
        largeness: 10,
        handsome: 1,
        alignment: "Neutral Evil",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Tiny T-Rex",
        aka: "Lil' Killer",
        cool: 10,
        largeness: 2,
        handsome: 7,
        alignment: "Chaotic Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Whale",
        aka: "Willy",
        cool: 8,
        largeness: 10,
        handsome: 5,
        alignment: "Lawful Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Lion",
        aka: "The King",
        cool: 8,
        largeness: 6,
        handsome: 10,
        alignment: "Lawful Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Human",
        aka: "Dave",
        cool: 4,
        largeness: 5,
        handsome: 5,
        alignment: "Neutral Good",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Animal",
        aka: "Muppet drummer",
        cool: 10,
        largeness: 3,
        handsome: 8,
        alignment: "Chaotic Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Parrot",
        aka: "Pretty boy",
        cool: 8,
        largeness: 3,
        handsome: 10,
        alignment: "Neutral Goodl",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Toad",
        aka: "Warty",
        cool: 8,
        largeness: 2,
        handsome: 4,
        alignment: "Chaotic Neutral",
      }),
      axios.post("http://localhost:3000/cards", {
        name: "Giraffe",
        aka: "Lanky",
        cool: 9,
        largeness: 9,
        handsome: 6,
        alignment: "Neutral Good",
      }),
    ])
    .then(() =>
      setAlert({
        message: "Starter deck added.",
        alertType: "Success",
      })
    )
    .catch(() => {
      setAlert({
        message: "Could not connect to the server.",
        alertType: "Error",
      });
    });
};

export { addStarterDeck };
