// Code obtained from https://codepen.io/technokami/pen/abojmZa
/* Store the element in el */
let house = document.getElementById('house')

/* Get the height and width of the element */
const height = house.offsetHeight;
const width = house.offsetWidth;

/*
  * Add a listener for mousemove event
  * Which will trigger function 'handleMove'
  * On mousemove
  */
house.addEventListener('mousemove', handleMove)

/* Define function a */
function handleMove(e) {
  /*
    * Get position of mouse cursor
    * With respect to the element
    * On mouseover
    */

  var xVal = e.clientX - house.offsetLeft; //x position within the element.
  var yVal = e.clientY - house.offsetTop;  //y position within the element.
  /*
    * Calculate rotation valuee along the Y-axis
    * Here the multiplier 20 is to
    * Control the rotation
    * You can change the value and see the results
    */
  const yRotation = -20 * ((xVal - house.offsetWidth / 2) / house.offsetWidth)

  /* Calculate the rotation along the X-axis */
  const xRotation = 20 * ((yVal - house.offsetHeight / 2) / house.offsetHeight)

  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

  /* Apply the calculated transformation */
  house.style.transform = string
}

/* Add listener for mouseout event, remove the rotation */
house.addEventListener('mouseout', function () {
  house.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

/* Add listener for mouseup, simulate release of mouse click */
house.addEventListener('mouseup', function () {
  house.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})

function resetTiles() {
  var tiles = document.getElementsByClassName('tile');
  for (tile of tiles) {
    removeHover(tile);
  }
}

function scrollToLeft(room)
{
  var width = window.innerWidth;
  room.scrollTo({
    top: 0,
    left: (room.scrollLeft - (width - 100)),
    behavior: 'smooth'
  });
}

function scrollToRight(room)
{
  var width = window.innerWidth;
  room.scrollTo({
    top: 0,
    left: (room.scrollLeft + (width - 100)),
    behavior: 'smooth'
  });
}

function getRoom()
{

}