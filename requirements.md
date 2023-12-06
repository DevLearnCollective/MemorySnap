# Software Requirements

## Vision

The vision of our product is to create a fun and interactive game, Memory Snap, designed to help children enhance their memory and color skills. By addressing the lack of free and educational games for children, our project provides an advertising-free environment for young minds to thrive. We believe in the importance of offering a delightful and easily accessible platform for children to engage in memory-enhancing activities, making learning a joyful experience.

## Scope (In/Out)

### What Our Product Will Do

* This web app will present users with a selection of face down cards where they will try to find the matching pairs.
* This web app will score users based on how many guesses it takes for them to solve the game.
* The web app will have animated cards that flip over when chosen.
* The web app will present the user with 4 colors dispersed among 8 cards, face down.
* The game will remove correctly guessed pairs of cards from the play board.
* The game will keep and flip back over incorrectly guessed cards.
* Users can create a username to track their scores.
* Users can select their already created username from a list to continue competing against their high scores.
* The web app will present the user with their top 10 scores after each game is complete.
* The web app will save user data over many sessions to the users browser.

### What Our Product Will Not Do

### Minimum Viable Product

Our MVP will be a memory game that allows users to create a username, play the game, and track their top 10 scores.

### Stretch Goals

* Card flip animations.
* Score challenge by sharing a link with challenger username and high score to beat.

## Functional Requirements

* A user can create a new username.
* A user can select their existing username.
* A user can select two cards at a time from 8 to try and match like colors.
* A user can view their top 10 high scores.

### Data Flow

1. A user will first find themselves on a page where they can create a new user, or select form a list of already created users that are saved on the machine.
2. On the second page the user will be presented with 8 cards, face down, and will begin the game by selecting two cards at a time. correct matches will remove the cards from the board, incorrect matches will return them face down on the board. The number of guesses it takes to clear the board will be tracked. The lower the guesses is equivalent to a higher score.
3. After a user has completed the game, they will be presented with a list of their top scores, up to a total of 10. these scores will be saved alonside their username in the localstorage.