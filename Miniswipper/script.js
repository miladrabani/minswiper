//get number of bomb
////////////////////////////////
var numBomb = 0;
var ch = 0;
var tbomb = 0;
var modal = document.getElementById('myModal');

function diaplay() {
    modal.style.display = "block";
}

function Hide() {
    modal.style.display = "none";
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
}
document.getElementById("btnEnter").onclick = function () {

    numBomb = Number(slider.value);
    ch = numBomb;
    tbomb = numBomb;
    Hide();
    CreatrArray();
}

//Creat array for plan
////////////////////////////////////

var arrPlan = new Array(20);

function CreatrArray() {

    for (var i = 0; i <= 19; i++) {
        arrPlan[i] = new Array(20);
    }
    FillBomb();
}

function FillBomb() {

    while (numBomb > 0) {
        var row = Math.floor((Math.random() * 19) + 0);
        var col = Math.floor((Math.random() * 19) + 0);
        if (arrPlan[row][col] != "B") {
            arrPlan[row][col] = "B"
            numBomb--;
        }
    }
    //
    for (var i = 0; i <= 19; i++) {
        for (var j = 0; j <= 19; j++) {
            if (arrPlan[i][j] != "B") {
                arrPlan[i][j] = 0;
            }
        }
    }
    for (var i = 0; i <= 19; i++) {
        for (var j = 0; j <= 19; j++) {
            if (arrPlan[i][j] == "B") {
                FillNighborBomb(i, j)
            }
        }
    }
    CreateTable();
}

function FillNighborBomb(row, col) { //////////// find Nighbor Bobmb and fill Number
    //// North
    N(row - 1, col);

    function N(row, col) {
        if (row < 0) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    /////
    ////NorthEast
    NE(row - 1, col + 1);

    function NE(row, col) {
        if (row < 0 || col > 19) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    ///
    //East
    E(row, col + 1);

    function E(row, col) {
        if (col > 19) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    ///
    //SouthEast
    SE(row + 1, col + 1);

    function SE(row, col) {
        if (row > 19 || col > 19) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    ///
    //South
    S(row + 1, col)

    function S(row, col) {
        if (row > 19) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    ///
    //SouthWest
    S(row + 1, col - 1)

    function S(row, col) {
        if (row > 19 || col < 0) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    ///
    //West
    W(row, col - 1)

    function W(row, col) {
        if (col < 0) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }

    ///
    //NorthWest
    NW(row - 1, col - 1)

    function NW(row, col) {
        if (row < 0 || col < 0) {
            return;
        } else if (arrPlan[row][col] != "B") {
            arrPlan[row][col]++;
        }
    }
}

//////////
///////////////////////////////////
//Create Table
//////////////////////////////////
var table = document.getElementById("GameBoard");

function CreateTable() {
    for (var i = 0; i <= 19; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j <= 19; j++) {

            table.appendChild(row);
            var cell = document.createElement("td");
            row.appendChild(cell);
            cell.innerHTML = arrPlan[i][j];
        }
    }
    document.getElementById("disbomb").innerHTML = tbomb;
}

////////////////////////////

////////////////////////////
/////////////////////////////
var bombDet = 0;
document.getElementById("GameBoard").onmousedown = function (e) {
    if (e.button == 2) {
        var target = e.target;
        if (target.className == "" && target != table) {
            target.classList.add("flag");
            document.getElementById("disbomb").innerHTML = --tbomb;
            if (target.innerHTML == "B") {
                ++bombDet;
                if (bombDet == ch) {/////when you win

                    document.getElementById("GameBoard").onclick = null;
                    document.getElementById("GameBoard").onmousedown = null;
                    var audio = new Audio('cheer.mp3');
                    audio.play();
                }
            }
        } else if (target.className == "flag" && target != table) {
            target.classList.remove("flag");
            document.getElementById("disbomb").innerHTML = ++tbomb;
            if (target.innerHTML == "B") {
                bombDet--;
            }
        }

    }
}
/////////////////////////////
var cEvent = document.getElementById("GameBoard").onclick = function (e) {
    var target = e.target;
    if (target.className == "flag") {
        return;
    }
    if (target.innerHTML == "B") {
        var audio = new Audio('Bomb.mp3');
        audio.play();
        ///////
        var table = document.getElementById("GameBoard")
        for (var i = 0; i <= 19; i++) {
            var row = table.children[i];
            for (var j = 0; j <= 19; j++) {

                if (row.children[j].innerHTML == "B" && row.children[j].className == "flag") {
                    row.children[j].classList.add("flag2");
                }
                if (row.children[j].innerHTML == "B") {
                    row.children[j].innerHTML = "";
                    row.children[j].classList.add("Bomb");
                }

            }
        }
        document.getElementById("GameBoard").onclick = null;
        document.getElementById("GameBoard").onmousedown = null;/////when you Lose
    }
    else if (target.innerHTML != "B" && target.innerHTML > 0) {
        target.classList.add("Number");
        var audio = new Audio('click.wav');
        audio.play();
    }
    else if (target.innerHTML == 0) {
        var row = target.parentElement;
        row = row.rowIndex;
        var col = target.cellIndex;
        target.classList.add("Empty");
        var audio = new Audio('em.wav');
        audio.play();
        FindNighborZero(row, col);

        function FindNighborZero(row, col) { //////////// find Nighbor Zero and add Class
            var table = document.getElementById("GameBoard");
            //// North
            if (arrPlan[row][col] != 0 || arrPlan[row][col] != "cheked") {
                N(row - 1, col);

                function N(row, col) {
                    if (row < 0) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    } else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                /////
                ////NorthEast
                NE(row - 1, col + 1);

                function NE(row, col) {
                    if (row < 0 || col > 19) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    } else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                ///
                //East
                E(row, col + 1);

                function E(row, col) {
                    if (col > 19) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    } else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                ///
                //SouthEast
                SE(row + 1, col + 1);

                function SE(row, col) {
                    if (row > 19 || col > 19) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    } else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                ///
                //South
                S(row + 1, col)

                function S(row, col) {
                    if (row > 19) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    }
                    else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                ///
                //SouthWest
                S(row + 1, col - 1)

                function S(row, col) {
                    if (row > 19 || col < 0) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    } else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                ///
                //West
                W(row, col - 1)

                function W(row, col) {
                    if (col < 0) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    } else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }

                ///
                //NorthWest
                NW(row - 1, col - 1)

                function NW(row, col) {
                    if (row < 0 || col < 0) {
                        return;
                    } else if (arrPlan[row][col] == 0) {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Empty");
                        FindNighborZero(row, col);
                    }
                    else if (arrPlan[row][col] >= 0 || arrPlan[row][col] != "cheked" || arrPlan[row][col] != "B") {
                        var colCell = table.children[row];
                        arrPlan[row][col] = "cheked";
                        colCell.children[col].classList.add("Number");
                        return;
                    }
                }
            }
        }
    } else {
        return;
    }
}

///////////////////
//milad rabani
//09357594375