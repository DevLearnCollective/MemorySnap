// Global Variables
let gameScore = 0;

// Card Class
class Card {
  constructor (id, color, position) {
    this.id = id;
    this.color = color;
    this.position = position;
    this.flipped = false;
    this.guessed = false;
    Card.cards.push(this); // Add this newly created card object to our variable below.
  }

  static cards = [];

  // Flip the card, changing its flip state.
  flip() {
    this.flipped = !this.flipped; // Assign this.flipped the opposite true or false value of what it is currently set as.

    const card = document.getElementById(this.id);

    if(this.flipped) {
      card.classList.remove('flippedDown');
      card.style.backgroundColor = this.color;
      card.classList.add('flippedUp');
    } else {
      card.classList.remove('flippedUp');
      card.style.backgroundColor = null;
      card.classList.add('flippedDown');
    }
  }

  // Remove the card from the game view.
  guessed() {
    this.guessed = true;

    const card = document.getElementById(this.id);

    card.parentNode.removeChild(card);
  }
}