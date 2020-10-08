let deck = [], suits = [], values = []; playerCards = [], dealerCards = [];

suits = ["Hearts", "Clubs", "Spades", "Diamonds"]
values = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
// Inititalize arrays for suites and card values

// Populate initial deck of cards with key value pairs
function createDeck() {
  for (let i=0; i<13;i++) {
    for (let j=0; j<4; j++) {
      deck.push({value: values[i], suit: suits[j]});
    }
  }
  return;
}

// Shuffle deck using Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method

function shuffleDeck(arr) {
  for(let i = arr.length-1; i>0; i--){
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return;
}

createDeck();
// console.log(deck); 
// Test output of deck
shuffleDeck(deck);
// console.log(deck);
// Test output of shuffled deck

// Function to draw first four cards at beginning of hand

function drawFour() {
  for (let i=0;i<=1;i++) {
    playerCards.push(deck.pop());
    dealerCards.push(deck.pop());
  }
  return;
}

function startGame() {
  let input = "Y";
  input = prompt("Welcome to BlackJack. Do you want to play? (Y)es or (N)o?".toUpperCase());
  if (input == "Y") {
    drawFour();
    console.log("Player has: ");
    console.log(playerCards);
    console.log("Dealer has: ");
    console.log(dealerCards);
  }
    return;
  }

startGame();













