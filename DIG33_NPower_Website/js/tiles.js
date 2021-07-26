var tileView = true;

// function used to add and remove classes from home page tiles to give additional
// hover effects
function mouseOver(div) {
  addHover(div);
}

// function used to add and remove classes from home page tiles to give additional
// unhover effects
function mouseOut(div) {
  removeHover(div);
}

function addHover(div)
{
  var image = div.querySelector(".image");
  var text = div.querySelector(".tileText");
  var heading = div.querySelector(".tileHeading");
  var tileImage = div.querySelector(".cardImage");
  var description = div.querySelector(".tileDescription");
  image.classList.add("fade-out");
  text.classList.add("fade-out");
  heading.classList.remove("fade-out-description");
  description.classList.remove("fade-out-description");
  tileImage.classList.remove("fade-out-description");
  image.classList.remove("fade-in");
  text.classList.remove("fade-in");
  heading.classList.add("fade-in-description");
  description.classList.add("fade-in-description");
  heading.classList.remove("tileDecriptionVisibility");
  description.classList.remove("tileDecriptionVisibility");
  tileImage.classList.add("fade-in-description");
  tileImage.classList.remove("tileDecriptionVisibility");
}

function removeHover(div)
{
  var image = div.querySelector(".image");
  var text = div.querySelector(".tileText");
  var heading = div.querySelector(".tileHeading");
  var description = div.querySelector(".tileDescription");
  var tileImage = div.querySelector(".cardImage");
  image.classList.remove("fade-out");
  text.classList.remove("fade-out");
  heading.classList.add("fade-out-description");
  description.classList.add("fade-out-description");
  tileImage.classList.add("fade-out-description");
  image.classList.add("fade-in");
  text.classList.add("fade-in");
  heading.classList.remove("fade-in-description");
  description.classList.remove("fade-in-description");
  tileImage.classList.remove("fade-in-description");
}

var intervalId = window.setInterval(function(){
  var tiles = document.getElementsByClassName('tile');
  // Screen width obtained
  var screenWidth = window.innerWidth;
  // If screen width is less than desktop mode size
  if(screenWidth < 576)
  {
    if(tileView)
    {
      for(tile of tiles)
      {
        addHover(tile);
      }
      console.log("hover")
      tileView = false;
    }
    else
    {
      for(tile of tiles)
      {
        removeHover(tile);
      }
      tileView = true;
    }
  }
  else
  {
    for(tile of tiles)
    {
      removeHover(tile);
    }
    tileView = true;
  }
}, 5000);