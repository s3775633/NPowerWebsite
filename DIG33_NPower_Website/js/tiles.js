

function mouseOver(div) {
    var image = div.querySelector(".image");
    var text = div.querySelector(".tileText");
    var heading = div.querySelector(".tileHeading");
    var description = div.querySelector(".tileDescription");
    image.classList.add("fade-out");
    text.classList.add("fade-out");
    heading.classList.remove("fade-out-description");
    description.classList.remove("fade-out-description");
    image.classList.remove("fade-in");
    text.classList.remove("fade-in");
    heading.classList.add("fade-in-description");
    description.classList.add("fade-in-description");
    heading.classList.remove("tileDecriptionVisibility");
    description.classList.remove("tileDecriptionVisibility");
}

function mouseOut(div) {
  var image = div.querySelector(".image");
  var text = div.querySelector(".tileText");
  var heading = div.querySelector(".tileHeading");
  var description = div.querySelector(".tileDescription");
  image.classList.remove("fade-out");
  text.classList.remove("fade-out");
  heading.classList.add("fade-out-description");
  description.classList.add("fade-out-description");
  image.classList.add("fade-in");
  text.classList.add("fade-in");
  heading.classList.remove("fade-in-description");
  description.classList.remove("fade-in-description");
}