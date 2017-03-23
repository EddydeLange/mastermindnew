var colors=['lightBlue','red','green','purple','yellow','pink','orange','lightGreen'];
var rowsCode;
var levelGame = 0;
var chosenColor = [];
var rows;
var errorsCode;
var maxColumns;

function loadHtml() {
    document.getElementById("gameTable").innerHTML = '';
    //Creates buttons
    levelButtons();
    //Choose level function
    chooseLevel();
}

//create html for the game
function createGame() {
    //Calls functions
    createRowsColumns();
    createOptionsColors()
    //Creates code to guess
    var codeToGuess = createCode();
    clickColors(codeToGuess);
}

//Create buttons with level
function levelButtons() {
    var createButtonsChoose = '';

    var title = document.createElement("H1");
    title.innerHTML = "Level";
    document.getElementById("colorsToChoose").appendChild(title);

    var buttonsChoose = document.createElement("p");
    buttonsChoose.innerHTML = "Pogingen: ";
    document.getElementById("colorsToChoose").appendChild(buttonsChoose);

    var inputRows = document.createElement("input");
    inputRows.id = 'numberOfRows';
    inputRows.type = 'number';
    inputRows.value = '5';
    inputRows.min = '1';
    inputRows.max = '10';
    buttonsChoose.appendChild(inputRows);

    //Creates button for the levels
    var levelText = 0;
    var buttons = document.createElement("div");
    for (var level = 0; level <= colors.length; level++) {
        if (level >= 2) {
            levelText++;
            var buttonTag = document.createElement("button");
            buttonTag.className = "levelButton";
            buttonTag.innerHTML = levelText;
            buttonTag.value = level;

            buttons.appendChild(buttonTag);
        }
    }
    document.getElementById("colorsToChoose").appendChild(buttons);
}

function chooseLevel() {
    rowsCode = document.getElementById('numberOfRows').value;
    //Change input rows
    document.getElementById('numberOfRows').onchange = function() {
        rowsCode = changeRows();
    };

    //Calls function with the colors
    var buttons = document.getElementsByTagName("button");
    for (var b = 0; b < buttons.length; b++) {
        //Button on click level
        buttons[b].onclick = function(e) {
            //Value in var
            levelGame = this.value;
            //Calls function
            createGame()
        };
    }
}

function changeRows() {
    //Get value input
    rowsCode = document.getElementById('numberOfRows').value;
    if (rowsCode > 10 || rowsCode < 1) {
        rowsCode = 10;
    }
    return rowsCode
}

function createRowsColumns() {
    //creating var's
    var answersUser = '';
    //Creates 10 rows
    for (var i = 0; i < rowsCode; i++) {
        //How much rows 2,3....
        answersUser += '<tr id="rows'+i+'" data-done="false">';
            //Creates cirkels where color could put in
            for (var t = 0; t < levelGame; t++) {
                var ColumnsRows = 'rows'+ i +'columns' + t +'';
                answersUser += '<td id="'+ ColumnsRows +'" class="table-responsive"></td>';
            }
            maxColumns = t;
            //Creates td with error if position color is correct or not
            for (var a = 0; a < levelGame; a++) {
                var ColumnsError = 'rows'+ i +'columnsError' + a +'';
                answersUser += '<td id="'+ ColumnsError +'" class="smallCircles table-responsive"></td>';
            }
        answersUser += '</tr>';
    }
    //Put in UI
    document.getElementById("gameTable").innerHTML = answersUser;
}

function createOptionsColors() {
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

function giveMessageRightPositon(codeToGuess, colorPresent) {
    errorsCode = 0;
    //Check if color is on the right position
    for(var placeVal = codeToGuess.length; placeVal--;) {
        //put id in an val
        var errorElementId = 'rows'+rows+'columnsError'+errorsCode+'';
        //find element with the id
        var errorElement = document.getElementById(errorElementId);

        if(codeToGuess[placeVal] == chosenColor[placeVal]) {
            for (var i = 0; i < colorPresent.length; i++) {
                if (colorPresent[i]['present'] !== 0 && colorPresent[i]['color'] == chosenColor[placeVal]) {
                    colorPresent[i]['present'] = colorPresent[i]['present'] - 1;
                    errorElement.className += " errorRed";
                    errorsCode++
                }
            }
        }
    }
    return colorPresent;

}

function giveMessageWrongPositon(codeToGuess, colorPresent) {
    var correctcode = true;
    //Check color is on other position instead of right position
    for(var placeVal = codeToGuess.length; placeVal--;) {
        //put id in an val
        var errorElementId = 'rows'+rows+'columnsError'+errorsCode+'';
        //find element with the id
        var errorElement = document.getElementById(errorElementId);

        if(codeToGuess[placeVal] !== chosenColor[placeVal]) {
            correctcode = false;
            var exists = codeToGuess.indexOf(chosenColor[placeVal]);
            if (exists !== -1) {
                for (var i = 0; i < colorPresent.length; i++) {
                    if (colorPresent[i]['present'] !== 0 && colorPresent[i]['color'] == chosenColor[placeVal]) {
                        colorPresent[i]['present'] = colorPresent[i]['present'] - 1;
                        errorElement.className += " errorWhite";
                        errorsCode++
                    }
                }
            }
        }
    }
    return correctcode;
}

//Check code user with code computer
function checkCode(codeToGuess) {
    var colorPresent = [];

    //Creates literal object with color and how much it is present
    colors.forEach(function(color) {
        colorPresent.push( { color: color, present: 0} );
    });

    //Check how much an color is in the guessed array
    codeToGuess.forEach(function(code) {
        for (var i = 0; i < colorPresent.length; i++) {
            if (colorPresent[i].color == code) {
                colorPresent[i]['present'] = colorPresent[i]['present'] + 1;
            }
        }
    });
    colorPresent = giveMessageRightPositon(codeToGuess, colorPresent);
    correctcode = giveMessageWrongPositon(codeToGuess, colorPresent);


    document.getElementById('rows'+rows).setAttribute('data-done', 'true');

    return correctcode;
}

//Removes color you selected
function undoColor(elementId, columns) {
console.log(elementId);
console.log(columns);
var elementId = "rows"+rows+"columns"+columns;


    document.getElementById(elementId).onclick = function() {

        //get current row that is clicked
        var numberRow = document.getElementById(this.id).parentNode.id;
        numberRow = Number(numberRow.match(/\d+/g));
        var dataDone = document.getElementById('rows'+numberRow).getAttribute('data-done');

        if (dataDone !== 'true') {
            //Changes class of color that is chosen
            document.getElementById(this.id).className = "table-responsive";
            chosenColor[columns] = '';
        }
        if (dataDone == 'progress') {
            //Deletes element
            document.getElementById("checkButtonCode").style.display = "none";
            document.getElementById('rows'+rows).setAttribute('data-done', 'false');
        }
    }
}

function addColor(color, elementId, columns) {
    var dataDone = document.getElementById('rows'+rows).getAttribute('data-done');

    var changed = false;
    //Search for empty spots in array
    var index = chosenColor.indexOf('');
    if (index !== -1) { //If it got an empty spot
        //Put color on empty position
        chosenColor[index] = color;
        //creates class for new position of color
        elementId = "rows"+rows+"columns"+index;
        changed = true;
        columns--;
    }

    //Changes classname
    document.getElementById(elementId).className += " "+color;
    if (changed == false) {
        //add chosen color in an array
        chosenColor.push(color);
    }
    return columns


}

function clickColors(codeToGuess) {
    var columns = 0;
    rows = 0;
    var paragraphText = document.createElement('h4');
    var checkButton;
    //Foreach color in array creating click function
    colors.forEach(function(color) {

        document.getElementById(color).onclick = function() {
            var dataDone = document.getElementById('rows'+rows).getAttribute('data-done');
            //check if your dont cross the limit of rows
            if (rows < rowsCode) {

                //empty text with error
                paragraphText.textContent = '';
                //Creates var current place
                var elementId = "rows"+rows+"columns"+columns;

                //calls function for adding color
                columns = addColor(color, elementId, columns);

                //Calls funtion for undo color
                undoColor(elementId, columns);
                //Go to next column
                columns++
                if (columns == levelGame) {
                    document.getElementById("rows"+rows).setAttribute('data-done', 'progress');
                    checkButton = createCheckButton(columns, levelGame);
                    //click funciion
                    document.getElementById('checkButtonCode').onclick = function() {
                        //Click function

                            checkButton.style.display = "none";
                            correctcode = checkCode(codeToGuess, colors);

                            //Correct code
                            if (correctcode == true) {
                                setTimeout(function () {
                                    endGame(codeToGuess, correctcode);
                                }, 2000);

                            } else { //Incorrect code
                                //empty array
                                chosenColor = [];
                                //Add text to element
                                paragraphText.textContent = 'Incorrect';
                                //new row
                                rows++
                                columns = 0;

                                if (rowsCode == rows) {
                                    paragraphText.textContent = '';
                                    setTimeout(function () {
                                        endGame(codeToGuess, correctcode);
                                    }, 2000);
                                }
                            }

                            document.getElementById("gameTable").appendChild(paragraphText);


                    }
                 }
            }
        }
    });
}


function createCheckButton() {

    checkButton = document.createElement('button');
    checkButton.innerHTML = 'check';
    checkButton.id = 'checkButtonCode';
    document.getElementById("gameTable").appendChild(checkButton);
    return checkButton;
}

function endGame(codeToGuess, correctcode) {
    var text = '';
    var maxLevel = Number(levelGame);
    //Empty page
    document.getElementById("colorsToChoose").innerHTML = '';

    var divElement = document.createElement("div");
    var answerComText = correctcode === true ? 'Hah... Wait what? Correct...!!! <br>YOU DEFEATED ME...!' : 'GAME-OVER! HAHA!';

    var h3Element = document.createElement("h3");
    h3Element.innerHTML = answerComText;
    divElement.appendChild(h3Element);

    var brElement = document.createElement("br");
    divElement.appendChild(brElement);

    var pElement = document.createElement("p");
    pElement.innerHTML = 'Correct code: ';
    divElement.appendChild(pElement);

    for (var i = 0; i < codeToGuess.length; i++) {
        var finalCorrectCode = document.createElement("td");
        finalCorrectCode.className = codeToGuess[i]+ ' table-responsive';
        divElement.appendChild(finalCorrectCode);
    }

    var brElement = document.createElement("br");
    divElement.appendChild(brElement);

    var buttonMenu = document.createElement("button");
    buttonMenu.id = 'menu';
    buttonMenu.innerHTML = 'Menu';
    divElement.appendChild(buttonMenu);

    var buttonRestartLevel = document.createElement("button");
    buttonRestartLevel.id = 'restartLevel';
    buttonRestartLevel.innerHTML = 'Restart level';
    divElement.appendChild(buttonRestartLevel);

    var buttonNextLevel = document.createElement("button");
    buttonNextLevel.id = 'nextLevel';
    buttonNextLevel.innerHTML = 'Next level';
    divElement.appendChild(buttonNextLevel);


    //Add variable with html in element
    document.getElementById("colorsToChoose").appendChild(divElement);

    document.getElementById("restartLevel").addEventListener("click", createGame);
    document.getElementById("nextLevel").onclick = function() {
        levelGame = Number(levelGame);
        levelGame++
        if (colors.length <= levelGame) {
            alert('You reached the max level, Congratulations!')
            loadHtml();
        } else {
            createGame();
        }
    };

    document.getElementById("menu").addEventListener("click", loadHtml);
}

//Create code to guess by the user
function createCode() {
    var newCode = [];
    for (var g = 0; g < levelGame; g++) {
        //Get random value out array en push it in other aray
        newCode.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    console.log(newCode);
    return newCode;
}



loadHtml();
