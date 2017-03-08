
function loadHtml() {
    //Get colors
    colors = colorToChoose();
    //Creates buttons
    levelButtons(colors);
    //Choose level function
    chooseLevel(colors);
}

//create html for the game
function createGame(colors, levelGame) {
    //How much columns
    var columnsCode = 10;
    //Calls functions
    createRowsColumns(levelGame, columnsCode);
    createOptionsColors(colors, levelGame)
    //Creates code to guess
    var codeToGuess = createCode(colors, levelGame);
    clickColors(colors, levelGame, codeToGuess, columnsCode);
}

//Create buttons with level
function levelButtons(colors) {
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
}

//Choose level
function chooseLevel(colors) {
    //Calls function with the colors
    var buttons = document.getElementsByTagName("button");
    for (var b = 0; b < buttons.length; b++) {
        //Button on click level
        buttons[b].onclick = function(e) {
            //Value in var
            var levelGame = this.value;
            //Calls function and send params
            createGame(colors, levelGame)
        };
    }
}

function createRowsColumns(levelGame, columnsCode) {
    //creating var's
    var answersUser = '';
    //Creates 10 rows
    for (var i = 0; i < columnsCode; i++) {
        //How much rows 2,3....
        answersUser += '<tr>';
            //Creates cirkels where color could put in
            for (var t = 0; t < levelGame; t++) {
                var ColumnsRows = 'columns'+ i +'rows' + t +'';
                answersUser += '<td id="'+ ColumnsRows +'" class="table-responsive"></td>';
            }
            //Creates td with error if position color is correct or not
            for (var a = 0; a < levelGame; a++) {
                var ColumnsError = 'columns'+ i +'rowsError' + a +'';
                answersUser += '<td id="'+ ColumnsError +'" class="smallCircles table-responsive"></td>';
            }
        answersUser += '</tr>';
    }
    //Put in UI
    document.getElementById("gameTable").innerHTML = answersUser;
}

function createOptionsColors(colors, levelGame) {
    //creating var's
    var colorsChoses = '';
    var whenBreak = 0;
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
}

//Check code user with code computer
function checkCode(codeToGuess, chosenColor, columns) {
    var errorsCode = 0;
    var correctcode = true;
    for(var placeVal = codeToGuess.length; placeVal--;) {
        //put id in an val
        var errorElementId = 'columns'+columns+'rowsError'+errorsCode+'';
        //find element with the id
        var errorElement = document.getElementById(errorElementId);

        if(codeToGuess[placeVal] !== chosenColor[placeVal]) {
            correctcode = false;
            //search for value if it exists
            var exists = codeToGuess.indexOf(chosenColor[placeVal]);

            if (exists !== -1) {
                //Give element an class
                errorElement.className += " errorRed";
                errorsCode++
            }
        } else if(codeToGuess[placeVal] == chosenColor[placeVal]) {
            errorElement.className += " errorWhite";
            errorsCode++
        }
    }
    return correctcode;
}

function clickColors(colors, levelGame, codeToGuess, columnsCode) {
    var columns = 0;
    var rows = 0;
    var paragraphText = document.createElement('h2');
    var chosenColor = [];


    //Foreach color in array creating click function
    colors.forEach(function(color) {
        document.getElementById(color).onclick = function() {
            //check if your dont cross the limit of columns
            if (columns < columnsCode) {
                var elementId = "columns"+columns+"rows"+rows;
                //Changes classname
                var currElement = document.getElementById(elementId);
                currElement.className += " "+color;
                //empty text with error
                paragraphText.textContent = '';
                //add chosen color in an array
                chosenColor.push(color);
                rows++

                if (rows == levelGame) {
                    correctcode = checkCode(codeToGuess, chosenColor, columns);
                    //Correct code
                    if (correctcode == true) {
                        //function nodig
                        paragraphText.textContent = 'Correct';
                    } else { //Inorrect code
                        //empty array
                        chosenColor = [];
                        //Add text to element
                        paragraphText.textContent = 'Incorrect';
                        //new column
                        columns++
                        rows = 0;

                        if (columnsCode == columns) {
                            //Add text to element
                            paragraphText.textContent = 'Game-Over';
                        }
                    }
                    document.getElementById("gameTable").appendChild(paragraphText);
                }
            }
        }
    });
}

//Colors
function colorToChoose(colors, levelGame) {
    var colors=['lightBlue','red','green','purple','yellow','pink','orange','lightGreen'];
    return colors;
}

//Create code to guess by the user
function createCode(colors, levelGame) {
    var newCode = [];
    for (var g = 0; g < levelGame; g++) {
        //Get random value out array en push it in other aray
        newCode.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    console.log(newCode);
    return newCode;
}

loadHtml();
