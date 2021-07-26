var request = new XMLHttpRequest();
// eligibility API accessed.
request.open('GET', 'https://npower-s1.herokuapp.com/eligibility');
request.onload = function() {
    // JSON string parsed and stores
    var eQuestions = JSON.parse(request.responseText);
    var questions = new Array();
    // for loop used to loop through each question obtained from the JSON.
    for(x = 0; x < eQuestions.length; x++)
    {
        // Options array created with options iterated and added.
        options = new Array();
        for(i = 0; i < eQuestions[x].options.length; i++)
        {
            options[i] = eQuestions[x].options[i];
        }
        // New question object created and added to questions array.
        q = new Question(eQuestions[x]._id, eQuestions[x].heading, eQuestions[x].questionNumber, options, eQuestions[x].questionType);
        questions.push(q);
    }
    populateEligibity(questions);
};

// function used to populate all questions within the eligibility page
function populateEligibity(questions)
{
    // elements obtained and stored in variables
    var headings = document.getElementsByClassName('title-heading');
    var status = document.getElementById('status');
    var income = document.getElementById('income');
    var occupants = document.getElementById('occupants');
    var rating = document.getElementById('rating');
    var checkBoxSection = document.getElementById('checkBoxes');
    var radioSection = document.getElementById('radioSection');

    // for loop used to iterate through all questions
    for(x = 0; x < questions.length; x++)
    {
        headings[x].innerHTML = questions[x].heading;
        // for loop used to iterate through each option within the question.
        for(i = 0; i < questions[x].options.length; i++)
        {
            // option element created and populated with question option.
            var option = document.createElement('option');
            option.value = questions[x].options[i];
            option.innerHTML = questions[x].options[i];
            
            // Option assigned to dom element depending on question number.
            if(questions[x].number == 1)
            {
                status.appendChild(option);
            }
            else if(questions[x].number == 2)
            {
                income.appendChild(option);
            }
            else if(questions[x].number == 3)
            {
                occupants.appendChild(option);
            }
            else if(questions[x].number == 4)
            {
                // Code block created with appropriate styles.
                var codeBlock = ' <div class="rowES ">' +
                '<div class="col3Elig">' +
                  '<input type="checkbox" class="egCheck" id="' + questions[x].options[i] + '">' +
                '</div>' +
                '<div class="col1Elig">' +
                  '<p class="esDescriptionSmall formText">'
                  + questions[x].options[i] +
                  '</p></div>' +
                '</div>'
                // Code block used to populate checkbox section with nuique data.
                checkBoxSection.innerHTML += codeBlock;
            }
            else if(questions[x].number == 5)
            {
                var codeBlock = '<input type="radio" name="benefits" id="' + questions[x].options[i] + '" value="' + questions[x].options[i] + '">' +
                  '<label>&nbsp;' + questions[x].options[i] + '</label>&nbsp;&nbsp;&nbsp;';
                radioSection.innerHTML += codeBlock;
            }
            else if(questions[x].number == 6)
            {
                rating.appendChild(option);
            }
        }
    }
    headings[4].innerHTML = 'Do you or a member of your household receive any ' +
    '<a href="https://www.eoninstall.com/affordable-warmth/affordable-warmth-landing.html" target="blank">' +
      'government benefits?</a>';
    headings[5].innerHTML = 'Dwelling <a href="https://find-energy-certificate.digital.communities.gov.uk/" target="blank">' +
      'EPC Rating</a>';
}

var compRequest = new XMLHttpRequest();
compRequest.open('GET', 'https://npower-s1.herokuapp.com/company');
compRequest.onload = function() {
    // JSON string parsed and stores
    var companyInfo = JSON.parse(compRequest.responseText);
    address = new Address(companyInfo.address.street1, companyInfo.address.street2,
        companyInfo.address.city, companyInfo.address.postcode);
    company = new Company(companyInfo._id, companyInfo.tradingName, companyInfo.companyName,
        address, companyInfo.webAddress, companyInfo.enquiryPhone, companyInfo.faultPhone,
        companyInfo.email, companyInfo.facebook, companyInfo.twitter);
    setCompanyInfo(company);
};

function setCompanyInfo(company)
{
    var facebookIcon = document.getElementById('facebook');
    facebookIcon.href = company.facebook;
    var twitterIcon = document.getElementById('twitter');
    twitterIcon.href = company.twitter;
    var emailButton = document.getElementById('emailButton');
    emailButton.href = "mailto:" + company.email;
    var enqButton = document.getElementById('enqButton');
    enqButton.href = "tel:" + company.enquiryPhone;
    var enqButton = document.getElementById('supportEnq');
    enqButton.href = "tel:" + company.enquiryPhone;
    var supportFault = document.getElementById('supportFault');
    supportFault.href = "tel:" + company.faultPhone;
    var supportEmail = document.getElementById('supportEmail');
    supportEmail.href = "mailto:" + company.email;
    var supportButton = document.getElementById('enqPhoneButton');
    supportButton.innerHTML += " - " + company.enquiryPhone;
    var supportButton = document.getElementById('faultPhoneButton');
    supportButton.innerHTML += " - " + company.faultPhone;
    var supportButton = document.getElementById('messageButton');
    supportButton.innerHTML += " - " + company.email;
}

compRequest.send();
request.send();

// Classes and their constructors
class Question {
    constructor(id, heading, number, options, type) {
        this.id = id;
        this.heading = heading;
        this.number = number;
        this.options = options;
        this.type = type;
    }
}

class Company {
    constructor(id, tradingName, companyName, address, webAddress, enquiryPhone, faultPhone, email, facebook, twitter) {
        this.id = id;
        this.tradingName = tradingName;
        this.companyName = companyName,
        this.address = address;
        this.webAddress = webAddress;
        this.enquiryPhone = enquiryPhone;
        this.faultPhone = faultPhone,
        this.email = email;
        this.facebook = facebook;
        this.twitter = twitter;
    }
}

class Address {
    constructor(street1, street2, city, postcode) {
        this.street1 = street1;
        this.street2 = street2;
        this.city = city,
        this.postcode = postcode;
    }
}

const menuToggle = document.getElementById('navbarCollapse')
const bsCollapse = new bootstrap.Collapse(menuToggle)

// Function used to close nav menu if in mobile display
function closeNav() {
    // Screen width obtained
    var screenWidth = window.innerWidth;
    // If screen width is less than desktop mode size
    if(screenWidth < 1301)
    {
        // nav toggled if not already collapsed.
        if(!document.getElementById('toggle').classList.contains('collapsed'))
        {
            bsCollapse.toggle();
        }
    }
}

// Function used to display energy-saving incentives page.
function esPage() {
    // hidePages function ran to hide all other pages.
    hidePages();
    // energysaving section and nav obtained
    var esPage = document.querySelector(".energySaving");
    var esNav = document.getElementById("esNav");
    // energyseving section displayed and nav set to active.
    esPage.style.display = "block";
    esNav.classList.add("active");
}

// Function used to display eligibility page.
function elgPage() {
    hidePages();
    var egPage = document.querySelector(".elegibilityPage");
    var esNav = document.getElementById("esNav");
    egPage.style.display = "block";
    esNav.classList.add("active");
}

// Function used to display home page.
function homePage() {
    hidePages();
    var home = document.querySelector(".homePage"); 
    home.style.display = "block";
}

// Function used to display the products page.
function impPage() {
    hidePages();
    var impPage = document.querySelector(".improvementsPage");
    var impNav = document.getElementById("impNav");
    impPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function prodPage() {
    hidePages();
    var prodPage = document.querySelector(".productsPage");
    var prodNav = document.getElementById("prodNav");
    prodPage.style.display = "block";
    prodNav.classList.add("active");
}

// Function used to display about page.
function aboutPage() {
    hidePages();
    var about = document.querySelector(".aboutPage"); 
    var aboutNav = document.getElementById("aboutNav");
    about.style.display = "block";
    aboutNav.classList.add("active");
}

// Function used to display support page.
function supportPage() {
    hidePages();
    var support = document.querySelector(".supportPage"); 
    var supportNav = document.getElementById("supportNav");
    support.style.display = "block";
    supportNav.classList.add("active");
}

// Function used to hide all pages on the site and make all nav options inactive.
function hidePages() {   
    // All pages obtained
    var pages = document.getElementsByClassName("page");
    // For loop used to loop through all pages and hide them
    for(page of pages)
    {
        page.style.display = "none";
    }
    // Nav links captured and deactivated.
    var navItems = document.getElementsByClassName("nav-link");
    for(navItem of navItems)
    {
        navItem.classList.remove("active");
    }
    resetTiles()
    closeNav();
}

function activateNav()
{   
    var nav = document.getElementById('navbarCollapse');
    if(window.getComputedStyle(nav).visibility === "hidden")
    {
        nav.style.visibility = "visible";
    }
}

window.onload = function()
{
    bsCollapse.hide();
}

// function used to add and remove classes from home page tiles to give additional
// hover effects
function mouseOver(div) {
    // Screen width obtained
    var screenWidth = window.innerWidth;
    // If screen width is less than desktop mode size
    if(!(screenWidth < 576))
    {
      addHover(div);
    }
  }
  
  // function used to add and remove classes from home page tiles to give additional
  // unhover effects
  function mouseOut(div) {
    // Screen width obtained
    var screenWidth = window.innerWidth;
    // If screen width is less than desktop mode size
    if(!(screenWidth < 576))
    {
      removeHover(div);
    }
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
  
  function tileClick(div)
  {
    var description = div.querySelector(".tileDescription");
    // Screen width obtained
    var screenWidth = window.innerWidth;
    // If screen width is less than desktop mode size
    if(screenWidth < 576)
    {
      if(description.classList.contains("fade-in-description"))
      {
        navigate(div);
        resetTiles();
      }
      else
      {
        resetTiles();
        addHover(div);
      }
    }
    else
    {
      navigate(div)
    }
  }
  
  function navigate(div)
  {
    if(div.classList.contains("reduceCost"))
    {
      esPage();
    }
    else if(div.classList.contains("alternatives"))
    {
      impPage();
    }
    else if(div.classList.contains("environment"))
    {
      prodPage();
    }
  }
  
  function resetTiles()
  {
    var tiles = document.getElementsByClassName('tile');
    for(tile of tiles)
    {
      removeHover(tile);
    }
  }

// Code obtained from https://codepen.io/technokami/pen/abojmZa
/* Store the element in el */
let house = document.getElementById('house')

/* Get the height and width of the element */
const height = house.height
const width = house.width

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
  /* Store the x position */
  const xVal = e.layerX
  /* Store the y position */
  const yVal = e.layerY
  
  /*
    * Calculate rotation valuee along the Y-axis
    * Here the multiplier 20 is to
    * Control the rotation
    * You can change the value and see the results
    */
  const yRotation = -20 * ((xVal - width / 2) / width)
  
  /* Calculate the rotation along the X-axis */
  const xRotation = 20 * ((yVal - height / 2) / height)

  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  
  /* Apply the calculated transformation */
  house.style.transform = string
}

/* Add listener for mouseout event, remove the rotation */
house.addEventListener('mouseout', function() {
  house.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

/* Add listener for mouseup, simulate release of mouse click */
house.addEventListener('mouseup', function() {
  house.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})

