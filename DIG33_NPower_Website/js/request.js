var screenSmall;

var appliances = new Array();

var request = new XMLHttpRequest();
// eligibility API accessed.
request.open('GET', 'https://npower-s1.herokuapp.com/eligibility');
request.onload = function () {
    // JSON string parsed and stores
    var eQuestions = JSON.parse(request.responseText);
    var questions = new Array();
    // for loop used to loop through each question obtained from the JSON.
    for (x = 0; x < eQuestions.length; x++) {
        // Options array created with options iterated and added.
        options = new Array();
        for (i = 0; i < eQuestions[x].options.length; i++) {
            options[i] = eQuestions[x].options[i];
        }
        // New question object created and added to questions array.
        q = new Question(eQuestions[x]._id, eQuestions[x].heading, eQuestions[x].questionNumber, options, eQuestions[x].questionType);
        questions.push(q);
    }
    populateEligibity(questions);
};

var requestAppliance = new XMLHttpRequest();
// eligibility API accessed.
request.open('GET', 'https://npower-s2.herokuapp.com/appliance');
request.onload = function () {
    // JSON string parsed and stores
    var eAppliance = JSON.parse(request.responseText);
    for (x = 0; x < eAppliance.length; x++) {
        // New question object created and added to questions array.
        a = new Appliance(eAppliance[x]._id, eAppliance[x].applianceName, eAppliance[x].description, eAppliance[x].room, eAppliance[x].consumption);
        appliances.push(a);
    }
};

function getTile(appliance)
{
    for(x = 0; x < appliances.length; x++)
    {
        if(appliance.id == appliances[x].name)
        {
            removeTiles();
            appliance.classList.add("impProdTile")
            appliance.classList.remove("infoDotKithen1");
            var comsumpImg;
            if(appliances[x].consumption < 100)
            {
                comsumpImg = 'images/consumption-low.svg';
            }
            else if(appliances[x].consumption < 200)
            {
                comsumpImg = 'images/consumption-mid.svg';
            }
            else if(appliances[x].consumption < 300)
            {
                comsumpImg = 'images/consumption-mid-high.svg';
            }
            else
            {
                comsumpImg = 'images/consumption-high.svg';
            }
            appliance.innerHTML = '<div class="prodTileType">' +
            '<h2 class="prodTileTypeText">' + appliances[x].room + '</h2>' +
            '</div>' +
            '<h2 class="consumption">' + appliances[x].consumption + '<p class="consumptionText">kWh/year</p></h2>' +
            '<img class="consumptionSymbol" src="' + comsumpImg + '">' +
            '<div class="productTiles">' +
            '<div class="row productGrid productNameGrid">' +
            '<div class="col-sm-8 prodName">' +
            '<h1 class="productName">' + appliances[x].name + '</h1>' +
            '</div>' +
            '<div class="col-sm-4">' +
            '<img class="productImage" src="images/product 4.png">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<p class="productDescription">' + appliances[x].description + '</p>'
        }
    }
}

function removeTiles()
{
    var dots = document.getElementsByClassName("infoDot");
    for(dot of dots)
    { 
        dot.classList.remove("impProdTile");
        dot.innerHTML = "";
    }
}

// function used to populate all questions within the eligibility page
function populateEligibity(questions) {
    // elements obtained and stored in variables
    var headings = document.getElementsByClassName('title-heading');
    var status = document.getElementById('status');
    var income = document.getElementById('income');
    var occupants = document.getElementById('occupants');
    var rating = document.getElementById('rating');
    var checkBoxSection = document.getElementById('checkBoxes');
    var radioSection = document.getElementById('radioSection');

    // for loop used to iterate through all questions
    for (x = 0; x < questions.length; x++) {
        headings[x].innerHTML = questions[x].heading;
        // for loop used to iterate through each option within the question.
        for (i = 0; i < questions[x].options.length; i++) {
            // option element created and populated with question option.
            var option = document.createElement('option');
            option.value = questions[x].options[i];
            option.innerHTML = questions[x].options[i];

            // Option assigned to dom element depending on question number.
            if (questions[x].number == 1) {
                status.appendChild(option);
            }
            else if (questions[x].number == 2) {
                income.appendChild(option);
            }
            else if (questions[x].number == 3) {
                occupants.appendChild(option);
            }
            else if (questions[x].number == 4) {
                // Code block created with appropriate styles.
                var codeBlock = ' <div class="rowEG ">' +
                    '<div class="col3Elig">' +
                    '<input type="checkbox" class="egCheck" id="' + questions[x].options[i] + '"name=installations value="' + questions[x].options[i] + '">' +
                    '</div>' +
                    '<div class="col1Elig">' +
                    '<p class="esDescriptionSmall formText">'
                    + questions[x].options[i] +
                    '</p></div>' +
                    '</div>'
                // Code block used to populate checkbox section with nuique data.
                checkBoxSection.innerHTML += codeBlock;
            }
            else if (questions[x].number == 5) {
                var codeBlock = '<input type="radio" checked="true" name="benefits" id="' + questions[x].options[i] + '" value="' + questions[x].options[i] + '">' +
                    '<label>&nbsp;' + questions[x].options[i] + '</label>&nbsp;&nbsp;&nbsp;';
                radioSection.innerHTML += codeBlock;
            }
            else if (questions[x].number == 6) {
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
compRequest.onload = function () {
    // JSON string parsed and stores
    var companyInfo = JSON.parse(compRequest.responseText);
    address = new Address(companyInfo.address.street1, companyInfo.address.street2,
        companyInfo.address.city, companyInfo.address.postcode);
    company = new Company(companyInfo._id, companyInfo.tradingName, companyInfo.companyName,
        address, companyInfo.webAddress, companyInfo.enquiryPhone, companyInfo.faultPhone,
        companyInfo.email, companyInfo.facebook, companyInfo.twitter);
    setCompanyInfo(company);
};

function setCompanyInfo(company) {
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


function elgTest() {
    var formData = new FormData(document.getElementById('elgForm'));
    var elgPageTrue = document.querySelector('.incentiveResult');
    var loader = document.querySelector('.loader');
    var buttonTest = document.getElementById('testButton');
    loader.style.display = "block";
    buttonTest.style.display = "none";
    const params = new URLSearchParams(formData);
    var query = "?" + params.toString();
    console.log(params.toString());
    const response = fetch('https://npower-s2.herokuapp.com/incentive/result/' + query)
        .then(response => response.text())
        .then((response) => {
            var incent = JSON.parse(response);
            elgPageTrue.innerHTML = "";
            elgPageTrue.innerHTML = '<h1 class="resultsTitle">From what you told us, you may be eligible for the following National home energy efficiency grants and schemes.</h1>'
            for (x = 0; x < incent.length; x++) {
                if (incent[x].heading == "Green Homes Grant") {
                    var type = 'green'
                    var svg = '<svg id="ba3e81ab-f8bf-4c8b-bf22-ff862c93b5f3" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.94 28.6"><path d="M7.92,18.14v13.6h20.2V18.14L17.92,10Zm16.7,4.2h0a6.4,6.4,0,1,1-6.4-6.4A6.38,6.38,0,0,1,24.62,22.34Z" transform="translate(-3.03 -3.14)" fill="#87cf80"/><path d="M32.32,14.54,17.92,3.14,3.72,14.54a1.78,1.78,0,1,0,2.2,2.8l12-9.7,12.2,9.7a1.5,1.5,0,0,0,1.1.4,1.75,1.75,0,0,0,1.4-.7A1.85,1.85,0,0,0,32.32,14.54Z" transform="translate(-3.03 -3.14)" fill="#87cf80"/><path d="M19.62,24.34a6.68,6.68,0,0,0,2.9-4.9,6.57,6.57,0,0,0-5.6.7A6.68,6.68,0,0,0,14,25,6,6,0,0,0,19.62,24.34Z" transform="translate(-3.03 -3.14)" fill="#87cf80" opacity="0.84" style="isolation:isolate"/><path d="M22.62,19.54c-.2,0-.3-.1-.5-.1l-8,5.7v.1a6.43,6.43,0,0,0,8.5-5.7Z" transform="translate(-3.03 -3.14)" fill="#87cf80"/></svg>'
                }
                else if (incent[x].heading == "ECO scheme – Affordable Warmth Scheme ") {
                    var type = 'eco'
                    var svg = '<svg id="ae75888d-5826-4ac6-ae9a-acd63080da40" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.12 28.76"><path d="M32.34,14.65,17.91,3.17,3.59,14.65a1.89,1.89,0,0,0-.31,2.54,1.89,1.89,0,0,0,2.54.31L17.91,7.74l12.2,9.76a2.13,2.13,0,0,0,1.12.4,1.82,1.82,0,0,0,1.11-3.25Z" transform="translate(-2.92 -3.17)" fill="#66a8eb"/><path d="M7.85,18.31V31.93H28.18V18.31L17.91,10.18Zm16.77,4.17h0a6.37,6.37,0,0,1-6.4,6.4,6.2,6.2,0,0,1-2.44-.51l1.42-1.93a4.59,4.59,0,0,0,4.68-1.63,4.27,4.27,0,0,0,.2-4.87l-1.83,2.54-2.74-2,1.83-2.54a4.29,4.29,0,0,0-4.58,1.73,4.48,4.48,0,0,0-.2,5l-1.32,1.83a6.65,6.65,0,0,1-1.32-4,6.38,6.38,0,0,1,6.4-6.41A6.29,6.29,0,0,1,24.62,22.48Z" transform="translate(-2.92 -3.17)" fill="#66a8eb"/></svg>'
                }
                else if (incent[x].heading == "Warm Home Discount") {
                    var type = 'warm'
                    var svg = '<svg id="a6a6f26d-d6ac-47c4-ab29-f340d1fd3594" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.08 28.7"><path d="M16,26.7a1.38,1.38,0,0,1-.3-.4,2.84,2.84,0,0,1-.4-1.3v-.1a4.69,4.69,0,0,1,1.1-3.4c2.3-2.9,2.2-4.6,2.2-4.6.2,1,1.2,3.6,0,4.8a1.26,1.26,0,0,0-.4.7.53.53,0,0,0,.4.5,1.48,1.48,0,0,0,.9.1,1.25,1.25,0,0,0,.8-.8,2.77,2.77,0,0,0,.1-.9,7.89,7.89,0,0,0-.2-1.7,26.91,26.91,0,0,1,.9,3.2s.5,3.7-1.6,4.6a4.2,4.2,0,0,1-1.5.1h-.2a2.5,2.5,0,0,1-1.8-.8Z" transform="translate(-2.95 -2.91)" fill="#ce4222"/><path d="M7.83,18v13.6h20.3V18l-10.2-8.1Zm16.8,4.2h0a6.4,6.4,0,1,1-6.4-6.4A6.38,6.38,0,0,1,24.63,22.21Z" transform="translate(-2.95 -2.91)" fill="#ce4222"/><path d="M32.43,14.41,17.93,2.91,3.63,14.41a1.78,1.78,0,0,0,2.2,2.8l12.1-9.7,12.2,9.7a1.5,1.5,0,0,0,1.1.4,1.75,1.75,0,0,0,1.4-.7A1.84,1.84,0,0,0,32.43,14.41Z" transform="translate(-2.95 -2.91)" fill="#ce4222"/></svg>'

                }
                elgPageTrue.innerHTML += '<div class="' + type + '">' +
                    '<div class="rowResult">' +
                    '<div class="col1Result">' +
                    svg +
                    '</div>' +
                    '<div class="col2Result">' +
                    '<h2 class="resultHeading">' + incent[x].heading + '</h2>' +
                    '<p class="resultDescription">' + incent[x].description + '</p>' +
                    '<p class="apply">How to Apply</p>' +
                    '<div class="contactsRow">' +
                    '<div class="col1Contact">' +
                    '<p class="contact"><i class="fa fa-phone fa-2x"></i></p><p class="contact">&nbsp;<a href="tel:' + incent[x].phone + '">' + incent[x].phone + '</a></p>' +
                    '</div>' +
                    '<div class="col2Contact">' +
                    '<p class="contact"><i class="fa fa-laptop fa-2x"></i></p><p class="contact"><a href=' + incent[x].link + '>Online @ GOV.UK</a></p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            }
            console.log(response);
            if (response == "false") {
                loader.style.display = "none";
                buttonTest.style.display = "block";
                elgFalsePage();
            }
            else {
                loader.style.display = "none";
                buttonTest.style.display = "block";
                elgTruePage();
            }
        })
}

function displayAppliance(button) {
    var buttons = document.getElementsByClassName("poductButton");
    for(btn of buttons)
    {
        btn.classList.remove("topButtonPressed");
        btn.classList.add("topButton");
    }
    var tileArea = document.querySelector('.productGrid');
    var mobileTileArea = document.querySelector('.swiper-wrapper');
    var swiper = document.querySelector('.mySwiper');
    if (button == null || button.innerHTML == "All") {
        query = "";
        button = document.querySelector(".allButton");
        button.classList.remove("topButton");
        button.classList.add("topButtonPressed");
    }
    else
    {
        var query = button.innerHTML;
        button.classList.remove("topButton");
        button.classList.add("topButtonPressed");
    }
        const response = fetch('https://npower-s2.herokuapp.com/appliance/' + query.toLowerCase())
            .then(response => response.text())
            .then((response) => {
                var appliances = JSON.parse(response);
                tileArea.innerHTML = "";
                mobileTileArea.innerHTML = "";
                for (x = 0; x < appliances.length; x++) {
                    var comsumpImg;
                    if(appliances[x].consumption < 100)
                    {
                        comsumpImg = 'images/consumption-low.svg';
                    }
                    else if(appliances[x].consumption < 200)
                    {
                        comsumpImg = 'images/consumption-mid.svg';
                    }
                    else if(appliances[x].consumption < 300)
                    {
                        comsumpImg = 'images/consumption-mid-high.svg';
                    }
                    else
                    {
                        comsumpImg = 'images/consumption-high.svg';
                    }
                    if(!screenSmall)
                    {
                    swiper.style.display = "none";
                    tileArea.innerHTML += '<div class="prodCol col-lg-3 col-md-4 col-sm-6 col-xs-12">' +
                        '<div class="prodTile">' +
                        '<div class="prodTileType">' +
                        '<h2 class="prodTileTypeText">' + appliances[x].room + '</h2>' +
                        '</div>' +
                        '<h2 class="consumption">' + appliances[x].consumption + '<p class="consumptionText">kWh/year</p></h2>' +
                        '<img class="consumptionSymbol" src="' + comsumpImg + '">' +
                        '<div class="productTiles">' +
                        '<div class="row productGrid productNameGrid">' +
                        '<div class="col-sm-8 prodName">' +
                        '<h1 class="productName">' + appliances[x].applianceName + '</h1>' +
                        '</div>' +
                        '<div class="col-sm-4">' +
                        '<img class="productImage" src="images/product 4.png">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<p class="productDescription">' + appliances[x].description + '</p>' +
                        '</div>' +
                        '</div>'
                    }
                    else
                    {
                        swiper.style.display = "block";
                        mobileTileArea.innerHTML += '<div class="prodCol swiper-slide">' +
                        '<div class="prodTile">' +
                        '<div class="prodTileType">' +
                        '<h2 class="prodTileTypeText">' + appliances[x].room + '</h2>' +
                        '</div>' +
                        '<h2 class="consumption">' + appliances[x].consumption + '<p class="consumptionText">kWh/year</p></h2>' +
                        '<img class="consumptionSymbol" src="' + comsumpImg + '">' +
                        '<div class="productTiles">' +
                        '<div class="row productGrid productNameGrid">' +
                        '<div class="col-sm-8 prodName">' +
                        '<h1 class="productName">' + appliances[x].applianceName + '</h1>' +
                        '</div>' +
                        '<div class="col-sm-4">' +
                        '<img class="productImage" src="images/product 4.png">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<p class="productDescription">' + appliances[x].description + '</p>' +
                        '</div>' +
                        '</div>'
                    }
                }
                refreshSwiper();
            });
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

class Incentive {
    constructor(id, description, link, phone) {
        this.id = id;
        this.description = description;
        this.link = link;
        this.phone = phone;
    }
}

class Appliance {
    constructor(id, name, description, room, consumption) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.room = room;
        this.consumption = consumption;
    }
}

function resetTiles() {
    var tiles = document.getElementsByClassName('tile');
    for (tile of tiles) {
        removeHover(tile);
    }
}

window.addEventListener("resize", function() {
    var screenWidth = window.innerWidth;
    // If screen width is less than desktop mode size
    if (screenWidth < 576 && !screenSmall) {
        screenSmall = true;
        displayAppliance(null)
    }
    else if (screenWidth >= 576 && screenSmall) {
        screenSmall = false;
        displayAppliance(null)
    }
})

window.onload = function () {
    var screenWidth = window.innerWidth;
    if(screenWidth < 576)
    {
        screenSmall = true;
    }
    else
    {
        screenSmall = false;
    }
}