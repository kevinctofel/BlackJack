let deck = [], suits = [], values = []; playerCards = [], dealerCards = [];

suits = ["Hearts", "Clubs", "Spades", "Diamonds"]
values = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
// Inititalize arrays for suites and card values

// Populate initial deck of cards with key value pairs
function createDeck() {
	for (let i = 0; i < values.length; i++) {
		for (let j = 0; j < suits.length; j++) {
			deck.push({ value: values[i], suit: suits[j] });
		}
	}
	return;
}

// Shuffle deck using Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method

function shuffleDeck(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * i);
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return;
}


// console.log(deck);
// Test output of shuffled deck

// Function to draw first four cards at beginning of hand

function drawFour() {
	for (let i = 0; i <= 1; i++) {
		playerCards.push(deck.pop());
		dealerCards.push(deck.pop());
	}
	return;
}

function getCardValue(card) {
	switch (card) {
		case "Two":
			return 2;
		case "Three":
			return 3;
		case "Four":
			return 4;
		case "Five":
			return 5;
		case "Six":
			return 6;
		case "Seven":
			return 7;
		case "Eight":
			return 8;
		case "Nine":
			return 9;
		case "Ten":
		case "Jack":
		case "Queen":
		case "King":
			return 10;
		case "Ace":
			return 11;
	}

}

function getHandValue(hand) {
	// console.log(hand);
	let totalHand = 0;
	for (let i = 0; i < hand.length; i++) {
		totalHand += ((getCardValue(hand[i].value)));
		// console.log(totalHand);
	}
	return totalHand;
}

function showStatus() {

	let playerHand = `Player: ${playerCards[0].value} of ${playerCards[0].suit}`;
	let dealerHand = `Dealer: ${dealerCards[0].value} of ${dealerCards[0].suit}`;

	for (let i = 1; i < dealerCards.length; i++) {
		dealerHand += (` and ${dealerCards[i].value} of ${dealerCards[i].suit}`);
	}
	const dealerTotal = (getHandValue(dealerCards));
	console.log(`${dealerHand} (${dealerTotal})`);

	for (let i = 1; i < playerCards.length; i++) {
		playerHand += (` and ${playerCards[i].value} of ${playerCards[i].suit}`);
	}
	const playerTotal = (getHandValue(playerCards));
	console.log(`${playerHand} (${playerTotal})`);

	checkPlayerScore(playerTotal);

}

function checkPlayerScore(playerTotal) {
	if (playerTotal > 21) {
		let status = "\nPlayer busted! Play again?(Y)es or(N)o?";
		replay(status);
	} else if (playerTotal == 21) {
		let status = "\nBlackJack! Player wins! Play again?(Y)es or(N)o?";
		replay(status);
	}
}

function drawCard(arr) { // draw single card for play Hit action
	arr.push(deck.pop());
}

function playerHitOrStand(arr) { // recursive Hit or Stand action
	let input = "Y";
	input = prompt("\nDo you want to (H)it or (S)tand?").toUpperCase();
	if (input == "H") {
		drawCard(playerCards);
		showStatus();
		return playerHitOrStand(playerCards);
	}
	else if (input == "S") {
		console.log("\nYou hit stand!\n");
		showStatus();

	}
}

function dealerAction(dealerCards, playerCards) {
	do {
		drawCard(dealerCards);
	}
	while ((getHandValue(dealerCards) < 21) && (getHandValue(dealerCards)) < (getHandValue(playerCards)));
	showStatus();
	if (getHandValue(dealerCards) > 21) {
		status = "Dealer busted, player wins! Play again?(Y)es or(N)o?";
		replay(status);
	} else if (getHandValue(dealerCards) > getHandValue(playerCards)) {
		status = "Dealer wins! Play again?(Y)es or(N)o?";
		replay(status);
	} else if (getHandValue(dealerCards) == getHandValue(playerCards)) {
		status = "It's a push! Play again?(Y)es or(N)o?";
		replay(status);
	}
}

function replay(status) {
	let input = "Y";
	input = prompt(status).toUpperCase();
	if (input == "Y") { // this is why the game should be an object; easy to change values or reset them
		dealerCards = [];
		playerCards = [];
		playerHand = 0;
		playerTotal = 0;
		dealerCards = [];
		dealerHand = 0;
		dealerTotal = 0;
		createDeck();
		shuffleDeck(deck);
		drawFour();
		showStatus();
		playerHitOrStand();
	}
	else if (input == "N") {
		console.log("Thanks for playing!");
	}
}

function startGame() {
	let input = "Y";
	input = prompt("Welcome to BlackJack. Do you want to play? (Y)es or (N)o?").toUpperCase();
	if (input == "Y") {
		createDeck();
		shuffleDeck(deck);
		drawFour();
	}
	showStatus();
	playerHitOrStand(playerCards);
	dealerAction(dealerCards, playerCards);
}


startGame();
