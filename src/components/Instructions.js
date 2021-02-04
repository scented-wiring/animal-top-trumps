import "../styles/Instructions.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Instructions = () => {
  const [display, setDisplay] = useState("play");

  const playText = (
    <div id="instructions-text">
      <div className="instructions-title">How to Play</div>
      <p>
        At the start of the game, your customised deck is automatically shuffled
        and dealt out between you and the computer as evenly possible.
        <br /> <br />
        Your top card will be displayed on the screen. You cannot see the
        computer's top card and it cannot see yours.
        <br /> <br />
        Select a field from your top card to play against the computer. If the
        value of that field is higher than that of the computer's, you win the
        computer's card and it is added to the back of your deck.
        <br /> <br />
        If the computer card's field is higher, it wins your card and takes the
        next turn. Turns continues until the active player loses a round.
        <br /> <br />
        In the event of a tie, yours and the computer's top cards are removed
        from their decks and added to a "tie deck". The winner of the next round
        wins the tie cards as well as the card they beat to break the tie. If
        the next round results in another tie, these cards are also added to the
        tie deck and play contintues in this fashion until the tie is broken or
        one player runs out of cards.
        <br /> <br />
        When either player runs out of cards, the game is over and a winner is
        declared!
      </p>
    </div>
  );

  const createText = (
    <div id="instructions-text">
      <div className="instructions-title">Creating Cards</div>
      <p>
        First, decide which animal you would like to create a card for then
        enter the name of the species in the "name" field. This name will be
        used as a query to search the Unsplash photo database and set an image
        for your animal (so keep in mind that you may not get a corresponding
        image if your chosen animal species name is mispelled or very obscure).
        <br /> <br />
        Next, select values for your animal between 1 to 10 for the cool,
        largeness and handsome fields. These values determine the winner of each
        round so higher is better. However, the total value of these fields
        cannot exceed 25 (because that would be cheating and nobody's perfect).
        <br /> <br />
        Finally, choose a nickname and alignment for your animal. These don't
        have any bearing on the gameplay, they just add a bit of extra colour to
        your card.
        <br /> <br />
        Then press "Create Card" and you're away!
        <br /> <br />
        Alternatively, if you're not feeling very inspired you can simply press
        "Add Cards" to add 20 pre-created cards to your deck and you can dive
        straight into the game.
        <br /> <br />
        You can also delete cards, or delete your entire deck, from the "Browse
        Cards" page.
      </p>
    </div>
  );

  return (
    <div id="instructions">
      <div id="instructions-links">
        <h2
          onClick={() => setDisplay("play")}
          id={display === "play" ? "link-active" : "link-inactive"}
        >
          How to Play
        </h2>
        <h2
          onClick={() => setDisplay("create")}
          id={display === "create" ? "link-active" : "link-inactive"}
        >
          Creating Cards
        </h2>
      </div>
      {display === "play" ? playText : createText}
      <Link to="/">
        <h3>&larr; BACK</h3>
      </Link>
    </div>
  );
};

export default Instructions;
