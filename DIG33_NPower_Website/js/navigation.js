const menuToggle = document.getElementById('navbarCollapse')
const bsCollapse = new bootstrap.Collapse(menuToggle)

// Function used to close nav menu if in mobile display
function closeNav() {
    // Screen width obtained
    var screenWidth = window.innerWidth;
    // If screen width is less than desktop mode size
    if (screenWidth < 1301) {
        // nav toggled if not already collapsed.
        if (!document.getElementById('toggle').classList.contains('collapsed')) {
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
    esPage.scrollTo(0, 0);
    var esNav = document.getElementById("esNav");
    // energyseving section displayed and nav set to active.
    esPage.style.display = "block";
    esNav.classList.add("active");
}

// Function used to display eligibility page.
function elgPage() {
    hidePages();
    var egPage = document.querySelector(".elegibilityPage");
    egPage.scrollTo(0, 0);
    var esNav = document.getElementById("esNav");
    egPage.style.display = "block";
    esNav.classList.add("active");
}

// Function used to display home page.
function homePage() {
    hidePages();
    var home = document.querySelector(".homePage");
    home.scrollTo(0, 0);
    home.style.display = "block";
}

// Function used to display the products page.
function impPage() {
    hidePages();
    var impPage = document.querySelector(".improvementsPage");
    impPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    impPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function impBedroom() {
    hidePages();
    var bedroomPage = document.querySelector(".bedroomPage");
    bedroomPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    bedroomPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function impBathroom() {
    hidePages();
    var bathroomPage = document.querySelector(".bathroomPage");
    bathroomPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    bathroomPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function impLiving() {
    hidePages();
    var livingPage = document.querySelector(".livingPage");
    livingPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    livingPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function impStudy() {
    hidePages();
    var studyPage = document.querySelector(".studyPage");
    studyPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    studyPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function impLaundry() {
    hidePages();
    var laundryPage = document.querySelector(".laundryPage");
    laundryPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    laundryPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function impKitchen() {
    hidePages();
    var kitchenPage = document.querySelector(".kitchenPage");
    kitchenPage.scrollTo(0, 0);
    var impNav = document.getElementById("impNav");
    kitchenPage.style.display = "block";
    impNav.classList.add("active");
}

// Function used to display the products page.
function prodPage() {
    hidePages();
    productPageOpen = true;
    var prodPage = document.querySelector(".productsPage");
    prodPage.scrollTo(0, 0);
    var prodNav = document.getElementById("prodNav");
    prodPage.style.display = "block";
    prodNav.classList.add("active");
}

// Function used to display about page.
function aboutPage() {
    hidePages();
    var about = document.querySelector(".aboutPage");
    about.scrollTo(0, 0);
    var aboutNav = document.getElementById("aboutNav");
    about.style.display = "block";
    aboutNav.classList.add("active");
}

// Function used to display support page.
function supportPage() {
    hidePages();
    var support = document.querySelector(".supportPage");
    support.scrollTo(0, 0);
    var supportNav = document.getElementById("supportNav");
    support.style.display = "block";
    supportNav.classList.add("active");
}

function elgTruePage() {
    hidePages();
    var sideNav = document.getElementsByClassName("elgSideNav2");
    var elgTruePage = document.querySelector(".resultsPageTrue");
    elgTruePage.scrollTo(0, 0);
    var esNav = document.getElementById("esNav");
    for(nav of sideNav)
    {
        nav.style.display = "block";
    }
    elgTruePage.style.display = "block";
    esNav.classList.add("active");
}

function elgFalsePage() {
    hidePages();
    var sideNav = document.getElementsByClassName("elgSideNav2");
    var elgFalsePage = document.querySelector(".resultsPageFalse");
    elgFalsePage.scrollTo(0, 0);
    var esNav = document.getElementById("esNav");
    for(nav of sideNav)
    {
        nav.style.display = "block";
    }
    elgFalsePage.style.display = "block";
    esNav.classList.add("active");
}

// Function used to hide all pages on the site and make all nav options inactive.
function hidePages() {
    productPageOpen = false;
    // All pages obtained
    var pages = document.getElementsByClassName("page");
    // For loop used to loop through all pages and hide them
    for (page of pages) {
        page.style.display = "none";
    }
    // Nav links captured and deactivated.
    var navItems = document.getElementsByClassName("nav-link");
    for (navItem of navItems) {
        navItem.classList.remove("active");
    }
    resetTiles()
    closeNav();
}

function activateNav() {
    var nav = document.getElementById('navbarCollapse');
    if (window.getComputedStyle(nav).visibility === "hidden") {
        nav.style.visibility = "visible";
    }
}

window.onload = function () {
    bsCollapse.hide();
}

function resetTiles() {
    var tiles = document.getElementsByClassName('tile');
    for (tile of tiles) {
      removeHover(tile);
    }
  }

