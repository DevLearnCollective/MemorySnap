// Global Variables
let gameScore = 0;

// User Class
class User {
  static currentUser = null;
  constructor (username, image, scores) {
    this.username = username;
    this.image = image;
    this.scores = scores;
    User.currentUser = this;
  }
}

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

    const card = document.getElementById(this.id).firstChild;

    if(this.flipped) {
      card.style = 'transform: rotateY(180deg)';
    } else {
      card.style = '';
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

  // Put card rows in main
  document.querySelector('main').appendChild(firstRow);
  document.querySelector('main').appendChild(secondRow);

  // Create event listeners for the card rows to detect clicks
  firstRow.addEventListener('click', handleCardClick);
  secondRow.addEventListener('click', handleCardClick);

  // Display Cards to player
  for (let y = 1; y <= 2; y++) { // Cycle through rows
    for (let x = 1; x <= 4; x++) { // Cycle through columns
      if (y === 1) { // Populate first row
        let card = Card.cards.find(obj => obj.position[0] === y && obj.position[1] === x);

        // Create Card Element
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add('card');

        // Create Card inner Element
        let cardInnerElement = document.createElement('div');
        cardInnerElement.classList.add('card-inner');
        cardElement.appendChild(cardInnerElement);

        // Create Card Back
        let cardBack = document.createElement('div');
        cardBack.classList.add('flippedDown');
        cardBack.appendChild(document.createElement('div')).innerText = 'SNAP!';
        cardInnerElement.appendChild(cardBack);

        // Create Card Face
        let cardFace = document.createElement('div');
        cardFace.classList.add('flippedUp');
        cardFace.style.backgroundColor = '#' + card.color;
        cardInnerElement.appendChild(cardFace);

        firstRow.appendChild(cardElement);
      } else { // Populate second row
        let card = Card.cards.find(obj => obj.position[0] === y && obj.position[1] === x);
        
        // Create Card Element
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add('card');

        // Create Card inner Element
        let cardInnerElement = document.createElement('div');
        cardInnerElement.classList.add('card-inner');
        cardElement.appendChild(cardInnerElement);

        // Create Card Back
        let cardBack = document.createElement('div');
        cardBack.classList.add('flippedDown');
        cardBack.appendChild(document.createElement('div')).innerText = 'SNAP!';
        cardInnerElement.appendChild(cardBack);

        // Create Card Face
        let cardFace = document.createElement('div');
        cardFace.classList.add('flippedUp');
        cardFace.style.backgroundColor = '#' + card.color;
        cardInnerElement.appendChild(cardFace);

        secondRow.appendChild(cardElement);
      }
    }
  }
}


function startGame() {
  // Make sure previous view is cleared
  document.querySelector('main').innerHTML = '';

  // Generate cards and populate game board
  generateCards();
}

// Handle when a card is clicked
function handleCardClick(event) {
  const clickedCard = event.target.closest('.card'); // Find the card
  console.log(clickedCard.id);

  //TODO: Impliment logic to check if card has been flipped already, and impliment check for when two cards have been flipped.
  // If a card is found, Flip it
  if (clickedCard) {
    const card = Card.cards[clickedCard.id - 1];
    card.flip();
  }
}

function doesUsernameExist(username) {
  const storedUsers = JSON.parse(localStorage.getItem('users'));
  
  for (const user of storedUsers) {
    if (user.username === username) {
      return true; // Username exists in the stored data
    }
  }
  return false; // Username does not exist in the stored data
}

function createUser() {
  const usernameInput = document.getElementById('createUsername');
  const username = usernameInput.value.trim();

  const selectedImage = document.getElementById('selectImage');
  const image = selectedImage.value;

  // Check if username exists in localStorage
  if (localStorage.getItem('users') && doesUsernameExist(username)) {

    displayAlert('Username already exists! Please choose another.');

  } else {
    // Dummy score data
    let testScores = [4, 6, 8, 9, 11, 12, 13, 14, 17, 20];

    // Create a new user object
    const userObject = new User(username, image, testScores);

    // Call saveUser function
    saveUser(userObject);

    // Clear pre-game view
    document.getElementById('playerForm').style.display = 'none';

    // Start Game
    startGame();
  }
}

// Function to display the alert message
function displayAlert(message) {
  const alertText = document.getElementById('alertText');
  alertText.textContent = message;

  const alertMessage = document.getElementById('alertMessage');
  alertMessage.style.display = 'block';

  // Hide the alert after a few seconds
  setTimeout(() => {
    alertMessage.style.display = 'none';
  }, 3000); // Hide after 3 seconds
}

function saveUser(user) {
  // Parse localStorage to a variable
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Push the new user to the variable
  users.push(user);

  // Save the variable back to localStorage
  localStorage.setItem('users', JSON.stringify(users));
}

document.getElementById('submitButton').addEventListener('click', createUser);

// Check Local Storage for Data
if (localStorage.getItem('users')) {
  // Retrieve and Parse Data
  const storedUsers = JSON.parse(localStorage.getItem('users'));

  // Display Usernames
  const existingPlayersSection = document.getElementById('existingPlayersContainer');
  existingPlayersSection.innerHTML = ''; // Clear existing content

  storedUsers.forEach(user => {
    const userContainer = document.createElement('div');
  
    const usernameElement = document.createElement('p');
    usernameElement.textContent = user.username;
    userContainer.appendChild(usernameElement); // Username displayed above image
    
    const userImageElement = document.createElement('img');
    userImageElement.src = user.image;
    userImageElement.alt = user.image.substring(5);
    userImageElement.alt = userImageElement.alt.substring(0, userImageElement.alt.length - 4);
    userContainer.appendChild(userImageElement); // Image displayed below username
    userContainer.addEventListener('click', () => {
      // Create a new CurrentUser object
      const currentUser = new User(user.username, user.image);

      // Start Game
      startGame();
    });
    existingPlayersSection.appendChild(userContainer);
  });
} else {
  // No data in local storage, do nothing or display a message
  console.log('No data found in local storage.');
}
