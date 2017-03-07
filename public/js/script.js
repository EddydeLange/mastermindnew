//Choose level
function chooseLevel() {
    //Array with all the colors
    var colors=['lightBlue','red','green','purple','yellow'];
    var buttonsChoose = '<h1>level</h1>';
    var levelText = 0;
    //Creates button for the levels
    for (var level = 0; level <= colors.length; level++) {
        if (level >= 2) {
            levelText++;
            buttonsChoose += '<button class="levelButton" value="'+level+'" type="button">'+levelText+'</button> '
        }
    }
    //put in UI
    document.getElementById("colorsToChoose").innerHTML = buttonsChoose;

    var buttons = document.getElementsByTagName("button");
    for (var b = 0; b < buttons.length; b++) {
        //Button on click level
        buttons[b].onclick = function(e) {
            //Value in var
            var levelGame = this.value;
            //Calls function and send params
            loadHtml(colors, levelGame)
        };
    }
}

//Load html for the game
function loadHtml(colors, levelGame) {
    //creating var's
    var colorsChoses = '';
    var answersUser = '';
    var whenBreak = 0;
    var columnsCode = 10;
    //Creates 10 rows
    for (var i = 0; i < columnsCode; i++) {
        //How much rows 2,3....
        answersUser += '<tr>';
            for (var t = 0; t < levelGame; t++) {
                var ColumnsRows = 'columns'+ i +'rows' + t +'';
                answersUser += '<td id="'+ ColumnsRows +'" class="table-responsive"></td>';
            }
        answersUser += '</tr>';
    }
    //Creates for every color in array an own td
    colors.forEach(function(color) {
        whenBreak++
        colorsChoses += '<td id="'+color+'" class="'+color+' table-responsive"></td>';
        if (whenBreak == levelGame) {
            //adds break for better styling
            colorsChoses += '<br>';
            //Sets 0
            whenBreak = 0;
        }
    });
    //Put in UI
    document.getElementById("colorsToChoose").innerHTML = colorsChoses;
    document.getElementById("gameTable").innerHTML = answersUser;

    //Calls function
    var codeToGuess = createCode(colors, levelGame);
    clickColors(colors, levelGame, codeToGuess, columnsCode);
}

//Create code to guess by the user
function createCode(colors, levelGame) {
    var newCode = [];
    for (var g = 0; g < levelGame; g++) {
        //Get random value out array en push it in other aray
        newCode.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return newCode;
}

//Check code user with code computer
function checkCode(codeToGuess, chosenColor) {
    console.log(chosenColor);
    for(var placeVal = codeToGuess.length; placeVal--;) {
        if(codeToGuess[placeVal] !== chosenColor[placeVal])
            return false;
    }
    return true;
}

function clickColors(colors, levelGame, codeToGuess, columnsCode) {
    var columns = 0;
    var rows = 0;
    var paragraphText = document.createElement('h2');
    var chosenColor = [];

    console.log(codeToGuess);
    //Foreach color in array creating click function
    colors.forEach(function(color) {
        document.getElementById(color).onclick = function() {

            //check if your dont cross the limit of columns
            if (columns < columnsCode) {

                var elementId = "columns"+columns+"rows"+rows;
                var currElement = document.getElementById(elementId);
                //Changes classname
                currElement.className = color;
                //add chosen color in an array
                chosenColor.push(color);
                rows++

                if (rows == levelGame) {
                    correctcode = checkCode(codeToGuess, chosenColor);
                    //Correct code
                    if (correctcode == true) {
                        //function nodig
                        location.href = "http://localhost/Jaar%202/mastermind/mastermind/index";

                    } else { //Inorrect code
                        
                        //empty array
                        chosenColor = [];
                        //Add text to element
                        paragraphText.textContent = 'Incorrect';
                        document.getElementById("gameTable").appendChild(paragraphText);

                        //new column
                        columns++
                        rows = 0;

                        if (columnsCode == columns) {
                            //Add text to element
                            paragraphText.textContent = 'Game-Over';
                            document.getElementById("gameTable").appendChild(paragraphText);
                        }
                    }
                }
            }
        }
    });
}

chooseLevel();
