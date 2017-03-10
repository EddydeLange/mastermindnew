
var rowsCode = 10;
function loadHtml() {
    //Get colors
    colors = colorToChoose();
    //Creates buttons
    levelButtons(colors);
    //Choose level function
    chooseLevel(colors);
}

//create html for the game
function createGame(colors, levelGame, rowsCode) {
    //Calls functions
    createRowsColumns(levelGame, rowsCode);
    createOptionsColors(colors, levelGame)
    //Creates code to guess
    var codeToGuess = createCode(colors, levelGame);
    clickColors(colors, levelGame, codeToGuess, rowsCode);
}

//Create buttons with level
function levelButtons(colors) {
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

//Choose level
function chooseLevel(colors) {
    var rowsCode = 10;
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
            var levelGame = this.value;
            //Calls function and send params
            createGame(colors, levelGame, rowsCode)
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

function createRowsColumns(levelGame, rowsCode) {
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
function checkCode(codeToGuess, chosenColor, rows, colors) {
    var errorsCode = 0;
    var colorRightPlace = [];
    var correctcode = true;

    colors.forEach(function(color) {
        colorRightPlace.push( { color: color, present: 0} );
    });

    for(var placeVal = codeToGuess.length; placeVal--;) {
        //if(codeToGuess[placeVal] == chosenColor[placeVal]) {
            var chosenColorNow = chosenColor[placeVal];
            console.log(chosenColorNow);
            var indexColor = colorRightPlace.indexOf([chosenColorNow]);
            console.log(indexColor);
            if (indexColor !== -1) {
                colorRightPlace[indexColor]['present'] = colorRightPlace[indexColor]['present'] + 1;
            }

        //}
    }
    console.log(colorRightPlace);
    for(var placeVal = codeToGuess.length; placeVal--;) {
        //put id in an val
        var errorElementId = 'rows'+rows+'columnsError'+errorsCode+'';
        //find element with the id
        var errorElement = document.getElementById(errorElementId);

        if(codeToGuess[placeVal] !== chosenColor[placeVal]) {
            correctcode = false;
            //search for value if it exists
            var exists = codeToGuess.indexOf(chosenColor[placeVal]);
            var inArray = colorRightPlace.indexOf(chosenColor[placeVal]);

            if (inArray == -1) {
                if (exists !== -1) {
                    //Give element an class
                    errorElement.className += " errorWhite";
                    errorsCode++
                }
            }

        } else if(codeToGuess[placeVal] == chosenColor[placeVal]) {
            errorElement.className += " errorRed";
            errorsCode++
        }
    }



    document.getElementById('rows'+rows).setAttribute('data-done', 'true');

    return correctcode;
}

//Removes color you selected
function undoColor(rows, elementId, chosenColor, columns) {
    document.getElementById(elementId).onclick = function() {
        var dataDone = document.getElementById('rows'+rows).getAttribute('data-done');
        if (dataDone !== 'true') {
            //Changes class of color that is chosen
            document.getElementById(this.id).className = "table-responsive";
            chosenColor[columns] = '';
        }
    }
}

function addColor(color, chosenColor, elementId, rows, columns) {
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
    //Returned array
    return {
        chosenColor : chosenColor,
        columns : columns
    };
}

function clickColors(colors, levelGame, codeToGuess, rowsCode) {
    var columns = 0;
    var rows = 0;
    var paragraphText = document.createElement('h2');
    var chosenColor = [];
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
                changedAdd = addColor(color, chosenColor, elementId, rows, columns);
                //ChangedAdd is an array
                chosenColor = changedAdd.chosenColor;
                columns = changedAdd.columns;
                //Calls funtion for undo color
                undoColor(rows, elementId, chosenColor, columns);

                columns++
                if (columns == levelGame) {
                    correctcode = checkCode(codeToGuess, chosenColor, rows, colors);
                    //Correct code
                    if (correctcode == true) {
                        //function nodig
                        paragraphText.textContent = 'Correct';
                    } else { //Incorrect code
                        //empty array
                        chosenColor = [];
                        //Add text to element
                        paragraphText.textContent = 'Incorrect';
                        //new column
                        rows++
                        columns = 0;

                        if (rowsCode == rows) {
                            //Add text to element
                            paragraphText.textContent = 'Game-Over';

                            document.getElementById("gameTable").appendChild(paragraphText);

                        }
                    }
                    // var codeWas = document.createElement('h2').textContent = codeToGuess;
                    // document.getElementById("gameTable").appendChild(codeWas);
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
