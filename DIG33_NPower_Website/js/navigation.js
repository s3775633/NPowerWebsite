
function esPage() {
    hidePages();
    var esPage = document.querySelector(".energySaving");
    var esNav = document.getElementById("esNav");
    esPage.style.display = "block";
    esNav.classList.add("active");
}

function homePage() {
    hidePages();
    var home = document.querySelector(".homePage"); 
    home.style.display = "block";
}

function hidePages() {
    var home = document.querySelector(".homePage");    
    var esPage = document.querySelector(".energySaving");
    home.style.display = "none";
    esPage.style.display = "none";
    var navItems = document.getElementsByClassName("nav-link");
    for(navItem of navItems)
    {
        navItem.classList.remove("active");
    }
}