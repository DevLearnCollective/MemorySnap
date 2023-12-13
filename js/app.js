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

    // Create a new user object
    const userObject = new User(username, image, []);

    // Call saveUser function
    saveUser(userObject);

    // Clear pre-game view
    document.getElementById('playerForm').style.display = 'none';
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
  const existingPlayersSection = document.getElementById('existingPlayers');
  existingPlayersSection.innerHTML = ''; // Clear existing content

  storedUsers.forEach(user => {
    const usernameElement = document.createElement('p');
    usernameElement.textContent = user.username;
    usernameElement.addEventListener('click', () => {
      // Create a new CurrentUser object
      const currentUser = new CurrentUser(user.username, /* Other necessary parameters */);

      // Navigate to the game board or perform other actions
      // For example: window.location.href = 'game.html';
    });
    existingPlayersSection.appendChild(usernameElement);
  });
} else {
  // No data in local storage, do nothing or display a message
  console.log('No data found in local storage.');
}
