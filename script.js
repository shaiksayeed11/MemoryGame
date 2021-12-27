const gameContainer = document.getElementById("game");

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
// it is based on an algorithm called Fisher Yates if you want to research more
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
// you can use event.target to see which element was clicked
let clickedCard=null;
let preventClick=false;
let resetPoint=0;
function handleCardClick(event) {
  
  let target=event.target;
  
  // prevent click(not guess more than two cards)
  if( preventClick || event.target.getAttribute('clicked')=='done')
  {
    return;
  }


  let displayColor=(event.target.classList.value)

  event.target.style.backgroundColor=displayColor;

  event.target.setAttribute('clicked','done')

  if(!clickedCard)
  {
    clickedCard=target;
  }
  else if(clickedCard)
  {
    if(clickedCard.classList.value===displayColor)
    {
      // console.log('match')
      clickedCard=null;
      resetPoint++;
    }
    else{
      preventClick=true;
      setTimeout(()=>{
        event.target.setAttribute('clicked','undone')
        clickedCard.setAttribute('clicked','undone')
        event.target.style.backgroundColor='white';
        clickedCard.style.backgroundColor='white';
        clickedCard=null;
        preventClick=false;

      },1000)
    }
    
  }

  if (resetPoint==5)
  {
    const reset=document.getElementById('reset')
    reset.addEventListener('click',refresh)
    // refresh()
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);


function refresh()
{
location.reload();
  
}