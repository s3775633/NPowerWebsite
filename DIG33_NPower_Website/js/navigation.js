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

