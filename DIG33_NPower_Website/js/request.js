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
        q = new Question(eQuestions[x]._id, eQuestions[x].questionNumber, options, eQuestions[x].questionType);
        questions.push(q);
    }
    populateEligibity(questions);
};

// function used to populate all questions within the eligibility page
function populateEligibity(questions)
{
    // elements obtained and stored in variables
    var status = document.getElementById('status');
    var income = document.getElementById('income');
    var occupants = document.getElementById('occupants');
    var checkBoxSection = document.getElementById('checkBoxes');

    // for loop used to iterate through all questions
    for(x = 0; x < questions.length; x++)
    {
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
        }
    }
}

var compRequest = new XMLHttpRequest();
compRequest.open('GET', 'https://npower-s1.herokuapp.com/company');
compRequest.onload = function() {
    // JSON string parsed and stores
    var companyInfo = JSON.parse(compRequest.responseText);
    console.log(companyInfo);
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
    var email = document.getElementById('email');
    email.innerHTML = "&nbsp" + company.email;
    var emailButton = document.getElementById('emailButton');
    emailButton.href = "mailto:" + company.email;
    var enqPhone = document.getElementById('enqPhone');
    enqPhone.innerHTML = "&nbsp" + company.enquiryPhone;
    var enqButton = document.getElementById('supportEnq');
    enqButton.href = "tel:" + company.enquiryPhone;
    var supportFault = document.getElementById('supportFault');
    supportFault.href = "tel:" + company.faultPhone;
    var supportEmail = document.getElementById('supportEmail');
    supportEmail.href = "mailto:" + company.email;
}

compRequest.send();
request.send();

// Classes and their constructors
class Question {
    constructor(id, number, options, type) {
        this.id = id;
        this.number = number;
        this.options = options,
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