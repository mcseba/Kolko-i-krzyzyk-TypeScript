class Board {
    table: Array<Cell>;
    move: string = 'X';
    textMove: HTMLElement; // HTMLowy tekst h3 do wypisywania ruchow i wyniku
    board: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //0 puste pole, 1 dla X, 2 dla O
    startGame: boolean = false;

    readonly winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor (table: Array<Cell>, textMove: HTMLElement) {
        this.table = table;
        this.textMove = textMove;
    }

    handleClick(x: number, y: number) {
        let i = 3*(x - 1) + (y - 1); // do wyszukiwania indeksu w tablicy
    if (this.startGame == true)
    {
        if (this.move == 'X' && this.board[i] == 0) {
            this.table[i].cell.innerHTML = this.move;
            this.board[i] = 1;
            this.move = 'O';
            this.textMove.innerHTML = this.move;
            this.checkIfWin();
        } else if (this.move == 'O' && this.board[i] == 0) {
            this.table[i].cell.innerHTML = this.move;
            this.board[i] = 2;
            this.move = 'X';
            this.textMove.innerHTML = this.move;
            this.checkIfWin();
        } else {
            alert('To pole jest już zajęte!');
        }
    } else {
        alert('Kliknij START aby zacząć.');
    }
    }

    Start() {
        if (this.startGame == false) {
            this.startGame = true;
        } else {
            alert('Gra jest w trakcie rozgrywki!');
        }
    }

    Reset() {
        for (let i = 0; i < this.table.length; i++) {
            this.board[i] = 0;
            this.table[i].cell.innerHTML = "";
            this.table[i].cell.style.backgroundColor = "white";
        }
        this.move = 'X';
        this.textMove.innerHTML = this.move;
        this.startGame = true;
    }

    checkIfWin() {
        this.winningConditions.forEach(element => {
            if (this.board[element[0]] == 1) { // DLA 'X'
                if (this.board[element[1]] == 1) {
                    if (this.board[element[2]] == 1) {
                        this.table[element[0]].cell.style.backgroundColor = "green";
                        this.table[element[1]].cell.style.backgroundColor = "green";
                        this.table[element[2]].cell.style.backgroundColor = "green";
                        this.alertWin('X');
                    }
                }
            } else if (this.board[element[0]] == 2) { // DLA 'O'
                if (this.board[element[1]] == 2) {
                    if (this.board[element[2]] == 2) {
                        this.table[element[0]].cell.style.backgroundColor = "green";
                        this.table[element[1]].cell.style.backgroundColor = "green";
                        this.table[element[2]].cell.style.backgroundColor = "green";
                        this.alertWin('O');
                    }
                }
            }
        });
    }

    alertWin(win: string) {
        alert('Gratulacje! Gra skończona, wygrał Player' + win)
        this.textMove.innerHTML = "Wygrał Player: " + win;
        this.startGame = false;
    }
}

class Cell {
    cell: HTMLElement;
    
    constructor (button: HTMLElement) {
        this.cell = button;
    }
}

const button1 = <HTMLElement>document.getElementById('buttonCell1');
const button2 = <HTMLElement>document.getElementById('buttonCell2');
const button3 = <HTMLElement>document.getElementById('buttonCell3');
const button4 = <HTMLElement>document.getElementById('buttonCell4');
const button5 = <HTMLElement>document.getElementById('buttonCell5');
const button6 = <HTMLElement>document.getElementById('buttonCell6');
const button7 = <HTMLElement>document.getElementById('buttonCell7');
const button8 = <HTMLElement>document.getElementById('buttonCell8');
const button9 = <HTMLElement>document.getElementById('buttonCell9');
let text = document.getElementById('moves');

const start: HTMLButtonElement = <HTMLButtonElement>document.getElementById('start');
const reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById('reset');

let Cell11 = new Cell(button1);
let Cell12 = new Cell(button2);
let Cell13 = new Cell(button3);
let Cell21 = new Cell(button4);
let Cell22 = new Cell(button5);
let Cell23 = new Cell(button6);
let Cell31 = new Cell(button7);
let Cell32 = new Cell(button8);
let Cell33 = new Cell(button9);

let GameBoard = new Board([Cell11, Cell12, Cell13, Cell21, Cell22, Cell23, Cell31, Cell32, Cell33], text);

start.onclick = () => GameBoard.Start();
reset.onclick = () => GameBoard.Reset();
Cell11.cell.onclick = () => GameBoard.handleClick(1, 1);
Cell12.cell.onclick = () => GameBoard.handleClick(1, 2);
Cell13.cell.onclick = () => GameBoard.handleClick(1, 3);
Cell21.cell.onclick = () => GameBoard.handleClick(2, 1);
Cell22.cell.onclick = () => GameBoard.handleClick(2, 2);
Cell23.cell.onclick = () => GameBoard.handleClick(2, 3);
Cell31.cell.onclick = () => GameBoard.handleClick(3, 1);
Cell32.cell.onclick = () => GameBoard.handleClick(3, 2);
Cell33.cell.onclick = () => GameBoard.handleClick(3, 3);

