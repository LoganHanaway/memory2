const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);

  // Check if noClicking is true or if the clicked element already has the class "flipped."
  // If either condition is true, exit the function.
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  // Save the clicked card element (e.target) in a variable called currentCard.
  // Set the background color of the clicked card to its first class name.
  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  // Check if either card1 or card2 is not set (clicked).
  // If true, add the "flipped" class to the clicked card, 
  // set card1 to the clicked card if card1 is not set, 
  // and set card2 to the clicked card if card1 is already set.
  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  // Check if both card1 and card2 are set.
  // Temporarily disable further clicking.
  // Check if the class names of card1 and card2 match.
  // If they match, update the cardsFlipped count, reset card1 and card2 to null, and re-enable clicking.
  // If they don't match, set a timeout function to reset the cards after 1000 milliseconds.
  if (card1 && card2) {
    noClicking = true;

    const areCardsMatching = card1.className === card2.className;

    if (areCardsMatching) {
      cardsFlipped += 2;
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function(){
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      },1500);
    }
  }

  if (cardsFlipped === COLORS.length) alert("Game over!");  

}

// when the DOM loads
createDivsForColors(shuffledColors);
