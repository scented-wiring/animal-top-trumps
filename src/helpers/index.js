import axios from "axios";

const addStarterDeck = (setAlert) => {
  const url = "http://localhost:3000/cards";

  axios
    .all([
      axios.post(url, {
        name: "Dog",
        aka: "Best friend",
        cool: 6,
        largeness: 5,
        handsome: 10,
        alignment: "Lawful Good",
      }),
      axios.post(url, {
        name: "Cat",
        aka: "Tiddles",
        cool: 10,
        largeness: 4,
        handsome: 8,
        alignment: "Lawful Evil",
      }),
      axios.post(url, {
        name: "Goldfish",
        aka: "Flipper",
        cool: 5,
        largeness: 2,
        handsome: 7,
        alignment: "True Neutral",
      }),
      axios.post(url, {
        name: "Sheep",
        aka: "Sheeple",
        cool: 4,
        largeness: 5,
        handsome: 5,
        alignment: "Chaotic Neutral",
      }),
      axios.post(url, {
        name: "Weevil",
        aka: "Tiny lad",
        cool: 1,
        largeness: 1,
        handsome: 1,
        alignment: "Chaotic Weevil",
      }),
      axios.post(url, {
        name: "Snake",
        aka: "Long lad",
        cool: 10,
        largeness: 3,
        handsome: 7,
        alignment: "Lawful Evil",
      }),
      axios.post(url, {
        name: "Elephant",
        aka: "Leg-face",
        cool: 9,
        largeness: 8,
        handsome: 7,
        alignment: "Chaotic Good",
      }),
      axios.post(url, {
        name: "Whale",
        aka: "Willy",
        cool: 8,
        largeness: 10,
        handsome: 5,
        alignment: "Lawful Neutral",
      }),
      axios.post(url, {
        name: "Lion",
        aka: "The King",
        cool: 8,
        largeness: 7,
        handsome: 10,
        alignment: "Lawful Neutral",
      }),
      axios.post(url, {
        name: "Human",
        aka: "Dave",
        cool: 4,
        largeness: 6,
        handsome: 5,
        alignment: "Neutral Good",
      }),
      axios.post(url, {
        name: "Parrot",
        aka: "Pretty boy",
        cool: 8,
        largeness: 3,
        handsome: 10,
        alignment: "Neutral Good",
      }),
      axios.post(url, {
        name: "Toad",
        aka: "Warty",
        cool: 8,
        largeness: 2,
        handsome: 4,
        alignment: "Chaotic Neutral",
      }),
      axios.post(url, {
        name: "Giraffe",
        aka: "Lanky",
        cool: 9,
        largeness: 9,
        handsome: 6,
        alignment: "Neutral Good",
      }),
      axios.post(url, {
        name: "Owl",
        aka: "Hooter",
        cool: 10,
        largeness: 3,
        handsome: 10,
        alignment: "Lawful Good",
      }),
      axios.post(url, {
        name: "Robin",
        aka: "Tweeter",
        cool: 7,
        largeness: 1,
        handsome: 10,
        alignment: "Chaotic Evil",
      }),
      axios.post(url, {
        name: "Honey Badger",
        aka: "Sir",
        cool: 10,
        largeness: 4,
        handsome: 7,
        alignment: "Chaotic Evil",
      }),
      axios.post(url, {
        name: "Baboon",
        aka: "Red butt",
        cool: 8,
        largeness: 5,
        handsome: 8,
        alignment: "Chaotic Neutral",
      }),
      axios.post(url, {
        name: "Ladybird",
        aka: "Spotty",
        cool: 4,
        largeness: 1,
        handsome: 10,
        alignment: "Chaotic Good",
      }),
      axios.post(url, {
        name: "Giant Stag Beetle",
        aka: "Blimey",
        cool: 10,
        largeness: 10,
        handsome: 1,
        alignment: "Neutral Evil",
      }),
      axios.post(url, {
        name: "Tiny T-Rex",
        aka: "Lil' Killer",
        cool: 10,
        largeness: 2,
        handsome: 7,
        alignment: "Chaotic Neutral",
      }),
    ])
    .then(() =>
      setAlert({
        message: "Starter cards added.",
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
