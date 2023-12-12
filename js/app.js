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

// app.js

document.getElementById('submitButton').addEventListener('click', createUser);

function createUser() {
  const usernameInput = document.getElementById('createUsername');
  const username = usernameInput.value.trim();

  const selectedImage = document.getElementById('selectImage');
  const image = selectedImage.value;

  // Check if username exists in localStorage
  if (localStorage.getItem(username)) {
    displayAlert('Username already exists! Please choose another.');
    return; // Exit if username exists
  } else {
    // Create a new user object
    const userObject = {
      username,
      image,
    };

    // Call saveUser function
    saveUser(userObject);

    // Clear pre-game view
    document.getElementById('playerForm').style.display = 'none';
  }
}

// // Function to display the alert message
// function displayAlert(message) {
//   const alertText = document.getElementById('alertText');
//   alertText.textContent = message;

//   const alertMessage = document.getElementById('alertMessage');
//   alertMessage.style.display = 'block';

//   // Optionally, hide the alert after a few seconds
//   setTimeout(() => {
//     alertMessage.style.display = 'none';
//   }, 3000); // Hide after 3 seconds (adjust as needed)
// }

function saveUser(user) {
  // Step 3: Parse localStorage to a variable
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Step 3: Push the new user to the variable
  users.push(user);

  // Step 3: Save the variable back to localStorage
  localStorage.setItem('users', JSON.stringify(users));
}