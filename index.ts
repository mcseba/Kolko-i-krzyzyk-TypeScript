class Board {
    table: Array<Cell>;
    turn: boolean = true; // true dla 'X', false dla 'O'

    readonly text = document.getElementById('moves');
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

    constructor (Table: Array<Cell>) {
        this.table = Table;
    }

    PlayerMove() {
        if (this.turn == true) { // X ma ruch
            this.table.forEach(element => {
                element.move = 'X';
            });
            this.turn = false;
            this.text.innerHTML = "Ruch: O"
        } else {
            this.table.forEach(element => {
                element.move = 'O';
            });
            this.turn = true;
            this.text.innerHTML = "Ruch: X"
        }   
    }
}

class Cell {
    cell: HTMLElement;
    move: string;

    constructor (button: HTMLElement) {
        this.cell = button;
        this.cell.addEventListener('click', this.Mark);
    }

    handleClick(move: string) {
        this.move = move;
    }

    Mark() {
        this.cell.innerText = this.move;
        console.log('done');
    }
}

const table: Array<Cell> = [];

const cell1 = new Cell(document.getElementById('buttonCell1'));
const cell2 = new Cell(document.getElementById('buttonCell2'));
const cell3 = new Cell(document.getElementById('buttonCell3'));
const cell4 = new Cell(document.getElementById('buttonCell4'));
const cell5 = new Cell(document.getElementById('buttonCell5'));
const cell6 = new Cell(document.getElementById('buttonCell6'));
const cell7 = new Cell(document.getElementById('buttonCell7'));
const cell8 = new Cell(document.getElementById('buttonCell8'));
const cell9 = new Cell(document.getElementById('buttonCell9'));

table.push(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9);

const Game = new Board(table);