var Board = (function () {
    function Board(table, textMove) {
        this.move = 'X';
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.startGame = false;
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.table = table;
        this.textMove = textMove;
    }
    Board.prototype.handleClick = function (x, y) {
        var i = 3 * (x - 1) + (y - 1);
        if (this.startGame == true) {
            if (this.move == 'X' && this.board[i] == 0) {
                this.table[i].cell.innerHTML = this.move;
                this.board[i] = 1;
                this.move = 'O';
                this.textMove.innerHTML = this.move;
                this.checkIfWin();
            }
            else if (this.move == 'O' && this.board[i] == 0) {
                this.table[i].cell.innerHTML = this.move;
                this.board[i] = 2;
                this.move = 'X';
                this.textMove.innerHTML = this.move;
                this.checkIfWin();
            }
            else {
                alert('To pole jest już zajęte!');
            }
        }
        else {
            alert('Kliknij START aby zacząć.');
        }
    };
    Board.prototype.Start = function () {
        if (this.startGame == false) {
            this.startGame = true;
        }
        else {
            alert('Gra jest w trakcie rozgrywki!');
        }
    };
    Board.prototype.Reset = function () {
        for (var i = 0; i < this.table.length; i++) {
            this.board[i] = 0;
            this.table[i].cell.innerHTML = "";
            this.table[i].cell.style.backgroundColor = "white";
        }
        this.move = 'X';
        this.textMove.innerHTML = this.move;
        this.startGame = true;
    };
    Board.prototype.checkIfWin = function () {
        var _this = this;
        this.winningConditions.forEach(function (element) {
            if (_this.board[element[0]] == 1) {
                if (_this.board[element[1]] == 1) {
                    if (_this.board[element[2]] == 1) {
                        _this.table[element[0]].cell.style.backgroundColor = "green";
                        _this.table[element[1]].cell.style.backgroundColor = "green";
                        _this.table[element[2]].cell.style.backgroundColor = "green";
                        _this.alertWin('X');
                    }
                }
            }
            else if (_this.board[element[0]] == 2) {
                if (_this.board[element[1]] == 2) {
                    if (_this.board[element[2]] == 2) {
                        _this.table[element[0]].cell.style.backgroundColor = "green";
                        _this.table[element[1]].cell.style.backgroundColor = "green";
                        _this.table[element[2]].cell.style.backgroundColor = "green";
                        _this.alertWin('O');
                    }
                }
            }
        });
    };
    Board.prototype.alertWin = function (win) {
        alert('Gratulacje! Gra skończona, wygrał Player' + win);
        this.textMove.innerHTML = "Wygrał Player: " + win;
        this.startGame = false;
    };
    return Board;
}());
var Cell = (function () {
    function Cell(button) {
        this.cell = button;
    }
    return Cell;
}());
var button1 = document.getElementById('buttonCell1');
var button2 = document.getElementById('buttonCell2');
var button3 = document.getElementById('buttonCell3');
var button4 = document.getElementById('buttonCell4');
var button5 = document.getElementById('buttonCell5');
var button6 = document.getElementById('buttonCell6');
var button7 = document.getElementById('buttonCell7');
var button8 = document.getElementById('buttonCell8');
var button9 = document.getElementById('buttonCell9');
var text = document.getElementById('moves');
var start = document.getElementById('start');
var reset = document.getElementById('reset');
var Cell11 = new Cell(button1);
var Cell12 = new Cell(button2);
var Cell13 = new Cell(button3);
var Cell21 = new Cell(button4);
var Cell22 = new Cell(button5);
var Cell23 = new Cell(button6);
var Cell31 = new Cell(button7);
var Cell32 = new Cell(button8);
var Cell33 = new Cell(button9);
var GameBoard = new Board([Cell11, Cell12, Cell13, Cell21, Cell22, Cell23, Cell31, Cell32, Cell33], text);
start.onclick = function () { return GameBoard.Start(); };
reset.onclick = function () { return GameBoard.Reset(); };
Cell11.cell.onclick = function () { return GameBoard.handleClick(1, 1); };
Cell12.cell.onclick = function () { return GameBoard.handleClick(1, 2); };
Cell13.cell.onclick = function () { return GameBoard.handleClick(1, 3); };
Cell21.cell.onclick = function () { return GameBoard.handleClick(2, 1); };
Cell22.cell.onclick = function () { return GameBoard.handleClick(2, 2); };
Cell23.cell.onclick = function () { return GameBoard.handleClick(2, 3); };
Cell31.cell.onclick = function () { return GameBoard.handleClick(3, 1); };
Cell32.cell.onclick = function () { return GameBoard.handleClick(3, 2); };
Cell33.cell.onclick = function () { return GameBoard.handleClick(3, 3); };
