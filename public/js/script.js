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
    //Creates 10 rows
    for (var i = 0; i < 10; i++) {
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
    clickColors(colors, levelGame);
}


function clickColors(colors, levelGame) {
    var columns = 0;
    var rows = 0;
    //Foreach color in array creating click function
    colors.forEach(function(color) {
        document.getElementById(color).onclick = function() {
            if (rows < levelGame) {
                var elementId = "columns"+columns+"rows"+rows;
                var currElement = document.getElementById(elementId);
                //Changes classname
                currElement.className = color;
            } else {
                columns++
                rows = 0;

                //Er komt hier iets anders alleen dit is effe snel
                var elementId = "columns"+columns+"rows"+rows;
                var currElement = document.getElementById(elementId);
                //Changes classname
                currElement.className = color;
            }
            rows++
        }
    });
}

chooseLevel();
