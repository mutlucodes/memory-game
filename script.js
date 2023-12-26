const gameContainer = document.getElementById("game");
const resetButton = document.getElementById("reset");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "black",
  "beige",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "black",
  "beige"
];

let firstCardClicked = false
let firstCardIndex
let firstCardColor
let timeOutCompleted = true;

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
function handleCardClick(event) {
  if (!timeOutCompleted) return;

  let index = [].indexOf.call(event.target.parentNode.children, event.target);

  if(!firstCardClicked) {

    console.log("First Card Clicked")

    // Assign color for first card
    event.target.style.backgroundColor = event.target.className

    // Save first card index
    firstCardIndex = index

    // Save first card color
    firstCardColor = event.target.className

    firstCardClicked = true

  } else if (firstCardClicked && timeOutCompleted && firstCardIndex != index && firstCardColor === event.target.className){
    
    console.log("You got this!")
    event.target.style.backgroundColor = event.target.className
    firstCardClicked = false

  } else if (firstCardClicked && timeOutCompleted && firstCardIndex !== index) {
    event.target.style.backgroundColor = event.target.className;
    if (firstCardColor === event.target.className) {
      console.log("You got this!");
      firstCardClicked = false;
    } else {
      console.log("Wrong color");
      timeOutCompleted = false; // Prevents further clicks
      setTimeout(function(){
        event.target.style.backgroundColor = 'rgb(117,106,182)';
        gameContainer.children[firstCardIndex].style.backgroundColor = 'rgb(117,106,182)';
        timeOutCompleted = true;
      }, 1000);
      firstCardClicked = false;
    }
  }

  

  console.log("you just clicked", event.target);
}


resetButton.addEventListener("click", function(e){
  location.reload()

})


// when the DOM loads
createDivsForColors(shuffledColors);
