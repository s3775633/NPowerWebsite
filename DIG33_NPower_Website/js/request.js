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
request.send();

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

// Constructor for a question
function Question(id, number, options, type)
{
    this.id = id;
    this.number = number;
    this.options = options,
    this.type = type;
}