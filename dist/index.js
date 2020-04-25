var Cell = (function () {
    function Cell(cell) {
        this.cell = cell;
    }
    Cell.prototype.setValue = function (value) {
        this.cellValue = value;
        if (value === 0) {
            this.cell.innerHTML = "";
        }
        else {
            value === 1 ? this.cell.innerHTML = 'X' : this.cell.innerHTML = 'O';
        }
    };
    return Cell;
}());
var Board = (function () {
    function Board(size) {
        var _this = this;
        if (size === void 0) { size = 3; }
        this.currentMove = 0;
        this.start = false;
        this.cells = new Array(size);
        var table = document.getElementById('board');
        var i = 0;
        for (var x = 0; x < size; x++) {
            var row = table.insertRow(x);
            this.cells[x] = [];
            var _loop_1 = function (y) {
                var cell = row.insertCell(y);
                cell.className = "cell";
                var newCell = new Cell(cell);
                newCell.cellValue = 0;
                this_1.cells[x][y] = newCell;
                newCell.cell.addEventListener('click', function () { return _this.makeMove(newCell); }, false);
                i++;
            };
            var this_1 = this;
            for (var y = 0; y < size; y++) {
                _loop_1(y);
            }
        }
        this.scoreText = document.getElementById('score');
        this.startButton = document.getElementById('start');
        this.startButton.addEventListener('click', function () { return _this.Start(); });
        this.resetButton = document.getElementById('reset');
        this.resetButton.addEventListener('click', function () { return _this.Reset(); });
    }
    Board.prototype.makeMove = function (cell) {
        if (this.start === true && cell.cellValue == 0) {
            cell.setValue(this.currentMove);
            if (this.currentMove === 1) {
                this.currentMove = 2;
                this.scoreText.innerHTML = "Move: O";
            }
            else {
                this.currentMove = 1;
                this.scoreText.innerHTML = "Move: X";
            }
            this.checkIfWin();
        }
        else if (this.start === true && cell.cellValue != 0) {
            alert('This cell is already clicked! Pick another option.');
        }
        else
            this.scoreText.innerHTML = "Move: Click START button to start!";
    };
    Board.prototype.Start = function () {
        this.Reset();
        if (this.start == false) {
            console.log('START');
            this.start = true;
            this.currentMove = 1;
            this.scoreText.innerHTML = "Move: X";
        }
    };
    Board.prototype.Reset = function () {
        this.cells.forEach(function (element) {
            element.forEach(function (el) {
                el.setValue(0);
            });
        });
        this.start = false;
        this.currentMove = 0;
    };
    Board.prototype.checkIfWin = function () {
        this.checkVertical();
        this.checkHorizontal();
        this.checkDiagonally();
    };
    Board.prototype.checkVertical = function () {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            count = 0;
            for (var j = 0; j < this.cells.length - 1; j++) {
                if (count === 2) {
                    this.stopGame();
                }
                else {
                    if (this.cells[j][i].cellValue != 0 && this.cells[j][i].cellValue === this.cells[j + 1][i].cellValue) {
                        count++;
                    }
                    else {
                        count = 0;
                    }
                }
            }
        }
    };
    Board.prototype.checkHorizontal = function () {
    };
    Board.prototype.checkDiagonally = function () {
    };
    Board.prototype.stopGame = function () {
        this.currentMove === 1 ? this.scoreText.innerHTML = "O has won the game!" :
            this.scoreText.innerHTML = "X has won the game!";
        this.start = false;
    };
    return Board;
}());
var board = new Board(9);
