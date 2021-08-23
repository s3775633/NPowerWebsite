// function used to add and remove classes from home page tiles to give additional
// hover effects
function mouseOver(div) {
  // Screen width obtained
  var screenWidth = window.innerWidth;
  // If screen width is less than desktop mode size
  if (!(screenWidth < 576)) {
    addHover(div);
  }
}

// function used to add and remove classes from home page tiles to give additional
// unhover effects
function mouseOut(div) {
  // Screen width obtained
  var screenWidth = window.innerWidth;
  // If screen width is less than desktop mode size
  if (!(screenWidth < 576)) {
    removeHover(div);
  }
}

function addHover(div) {
  var image = div.querySelector(".image");
  var text = div.querySelector(".tileText");
  var heading = div.querySelector(".tileHeading");
  var tileImage = div.querySelector(".cardImage");
  var tileButton = div.querySelector(".tileButton");
  var description = div.querySelector(".tileDescription");
  image.classList.add("fade-out");
  text.classList.add("fade-out");
  heading.classList.remove("fade-out-description");
  description.classList.remove("fade-out-description");
  tileImage.classList.remove("fade-out-description");
  tileButton.classList.remove("fade-out-description");
  image.classList.remove("fade-in");
  text.classList.remove("fade-in");
  heading.classList.add("fade-in-description");
  description.classList.add("fade-in-description");
  heading.classList.remove("tileDecriptionVisibility");
  description.classList.remove("tileDecriptionVisibility");
  tileImage.classList.add("fade-in-description");
  tileImage.classList.remove("tileDecriptionVisibility");
  tileButton.classList.add("fade-in-description");
  tileButton.classList.remove("tileDecriptionVisibility");
}

function removeHover(div) {
  var image = div.querySelector(".image");
  var text = div.querySelector(".tileText");
  var heading = div.querySelector(".tileHeading");
  var tileButton = div.querySelector(".tileButton");
  var description = div.querySelector(".tileDescription");
  var tileImage = div.querySelector(".cardImage");
  image.classList.remove("fade-out");
  text.classList.remove("fade-out");
  heading.classList.add("fade-out-description");
  description.classList.add("fade-out-description");
  tileImage.classList.add("fade-out-description");
  tileButton.classList.add("fade-out-description");
  image.classList.add("fade-in");
  text.classList.add("fade-in");
  heading.classList.remove("fade-in-description");
  description.classList.remove("fade-in-description");
  tileImage.classList.remove("fade-in-description");
  tileButton.classList.remove("fade-in-description");
}

function tileClick(div) {
  var description = div.querySelector(".tileDescription");
  // Screen width obtained
  var screenWidth = window.innerWidth;
  // If screen width is less than desktop mode size
  if (screenWidth < 576) {
    if (description.classList.contains("fade-in-description")) {
      navigate(div);
      resetTiles();
    }
    else {
      resetTiles();
      addHover(div);
    }
  }
  else {
    navigate(div)
  }
}

function navigate(div) {
  if (div.classList.contains("reduceCost")) {
    esPage();
  }
  else if (div.classList.contains("alternatives")) {
    impPage();
  }
  else if (div.classList.contains("environment")) {
    prodPage();
  }
}

function resetTiles() {
  var tiles = document.getElementsByClassName('tile');
  for (tile of tiles) {
    removeHover(tile);
  }
}