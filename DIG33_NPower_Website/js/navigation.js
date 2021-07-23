const menuToggle = document.getElementById('navbarCollapse')
const bsCollapse = new bootstrap.Collapse(menuToggle)

// Function used to close nav menu if in mobile display
function closeNav() {
    var screenWidth = window.innerWidth;
    if(screenWidth < 1301)
    {
        if(!document.getElementById('toggle').classList.contains('collapsed'))
        {
            bsCollapse.toggle();
        }
    }
    console.log(screenWidth);
}

// Function used to display energy-saving incentives page.
function esPage() {
    hidePages();
    var esPage = document.querySelector(".energySaving");
    var esNav = document.getElementById("esNav");
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
    var pages = document.getElementsByClassName("page");
    for(page of pages)
    {
        page.style.display = "none";
    }
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
        console.log("Hello");
        nav.style.visibility = "visible";
    }
}

window.onload = function()
{
    bsCollapse.hide();
}

