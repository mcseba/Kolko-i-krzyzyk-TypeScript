var Cell = (function () {
    function Cell(cell) {
        this.cell = cell;
    }
    Cell.prototype.setValue = function (value) {
        this.cellValue = value;
        value === 1 ? this.cell.innerHTML = 'X' : this.cell.innerHTML = 'O';
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
            var _loop_1 = function (y) {
                var cell = row.insertCell(y);
                cell.className = "cell";
                var newCell = new Cell(cell);
                newCell.cellValue = 0;
                this_1.cells[i] = newCell;
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
        }
        else if (this.start === true && cell.cellValue != 0) {
            alert('This cell is already clicked! Pick another option.');
        }
        else
            this.scoreText.innerHTML = "Move: Click START button to start!";
    };
    Board.prototype.Start = function () {
        if (this.start == false) {
            console.log('START');
            this.start = true;
            this.currentMove = 1;
            this.scoreText.innerHTML = "Move: X";
        }
    };
    Board.prototype.Reset = function () {
        this.cells.forEach(function (element) {
            element.cell.innerHTML = '';
            element.cellValue = 0;
        });
        this.start = false;
        this.currentMove = 0;
        this.scoreText.innerHTML = 'Move: ';
    };
    return Board;
}());
var board = new Board(5);
