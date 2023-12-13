// Global Variables
let gameScore = 0;

// Card Class
class Card {
  static cards = [];
  static lastId = 0;

  constructor (color, position) {
    this.id = ++Card.lastId;
    this.color = color;
    this.position = position;
    this.flipped = false;
    this.guessed = false;
    Card.cards.push(this); // Add this newly created card object to our variable below.
  }

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

// Generate colors, locations, then the cards
function generateCards() {
  const colorPallette = ['ff0000', '0000ff', 'ffff00', '008000', 'ffa500', '800080', 'ffc0cb', '008080'];
  let locations = [[1, 1], [1, 2], [1, 3], [1, 4], [2, 1], [2, 2], [2, 3], [2, 4]];
  let chosenColors = [];

  // Generate Colors
  while(chosenColors.length < 4) {
    // Generate Random number between 0 and colorPallette length
    const randomIndex = Math.floor(Math.random() * colorPallette.length);

    //If the random color isn't already in the chosen colors, then add it.
    if(!chosenColors.includes(colorPallette[randomIndex])) {
      chosenColors.push(colorPallette[randomIndex]);
    }
  }
  
  // Generate Cards
  while(chosenColors.length > 0) {
    for (let i = 0; i < 2; i++) { // Loop through each color twice
      const randomLocation = Math.floor(Math.random() * locations.length);
      let newCard = new Card(chosenColors[chosenColors.length - 1], locations.splice(randomLocation, 1)[0]); // Create new card with the last color in the list and a random location
      
      // Remove color from the array after using it twice.
      if (i === 1) {
        chosenColors.pop();
      }
    }
  }

  // Create play area
  let firstRow = document.createElement('section');
  firstRow.classList.add('cardRow');
  let secondRow = document.createElement('section');
  secondRow.classList.add('cardRow');

  document.querySelector('main').appendChild(firstRow);
  document.querySelector('main').appendChild(secondRow);

  // Display Cards to player
  for (let y = 1; y <= 2; y++) { // Cycle through rows
    for (let x = 1; x <= 4; x++) { // Cycle through columns
      if (y === 1) { // Populate first row
        let card = Card.cards.find(obj => obj.position[0] === y && obj.position[1] === x);
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.innerText = card.color;
        cardElement.style.backgroundColor = '#' + card.color;
        firstRow.appendChild(cardElement);
      } else { // Populate second row
        let card = Card.cards.find(obj => obj.position[0] === y && obj.position[1] === x);
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add('card');
        cardElement.innerText = card.color;
        cardElement.style.backgroundColor = '#' + card.color;
        secondRow.appendChild(cardElement);
      }
    }
  }
}

//generateCards();