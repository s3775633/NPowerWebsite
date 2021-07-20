
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
    egPage.style.display = "block";
}

// Function used to display home page.
function homePage() {
    hidePages();
    var home = document.querySelector(".homePage"); 
    home.style.display = "block";
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
}