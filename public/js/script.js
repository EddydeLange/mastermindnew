var colors=['lightBlue','red','green','purple','yellow','pink','orange','lightGreen'];
var rowsCode;
var levelGame;
var chosenColor = [];
var rows;
var errorsCode;

function loadHtml() {
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
    var buttonsChoose = '<h1>level</h1>';
    buttonsChoose += '<p>Pogingen: <input id="numberOfRows" type="number" value="10" min="1" max="10"></p>';
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

function chooseLevel() {
    rowsCode = 10;
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
                // var indexColor = colorPresent.indexOf([i]['color'][code]);
                // console.log(indexColor);
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
    document.getElementById(elementId).onclick = function() {
        var dataDone = document.getElementById('rows'+rows).getAttribute('data-done');
        if (dataDone !== 'true') {
            //Changes class of color that is chosen
            document.getElementById(this.id).className = "table-responsive";
            chosenColor[columns] = '';
        }
    }
}

function addColor(color, elementId, columns) {
    var changed = false;

    var index = chosenColor.indexOf('');
    if (index !== -1) {
        chosenColor[index] = color;
        //creates class for new position of color
        elementId = "rows"+rows+"columns"+index;
        changed = true;
        columns--
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
    var paragraphText = document.createElement('h2');
    //Foreach color in array creating click function
    colors.forEach(function(color) {
        document.getElementById(color).onclick = function() {
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

                columns++
                if (columns == levelGame) {
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
                        //new column
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
    });
}

function endGame(codeToGuess, correctcode) {
    var text = '';
    //Empty page
    document.getElementById("gameTable").innerHTML = '';
    document.getElementById("colorsToChoose").innerHTML = '';


    answerComText = correctcode === true ? 'Hah... Wait what?!?! Correct?!?!... YOU DEFEATED ME...!' : 'GAME-OVER! HAHA!';

    text += '<h2>'+answerComText+'</h2><br>' +
            '<p>Correct code</p>';

    document.getElementById("gameTable").innerHTML = text;


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
