class Board {
    table: Array<HTMLElement>;
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

    constructor (Table: Array<HTMLElement>) {
        this.table = Table;
    }
   
}

class Cell {
    cell: HTMLElement;
    move: string = 'X';

    constructor (button: HTMLElement) {
        this.cell = button;
        console.log('utworzono');
    }

    Mark() {
        console.log(this.cell);
        this.cell.innerHTML = this.move;
    }
}

const table: Array<HTMLElement> = [];

const Cell1 = new Cell(document.getElementById('buttonCell1'));
const Cell2 = new Cell(document.getElementById('buttonCell2'));
const Cell3 = new Cell(document.getElementById('buttonCell3'));
const Cell4 = new Cell(document.getElementById('buttonCell4'));
const Cell5 = new Cell(document.getElementById('buttonCell5'));
const Cell6 = new Cell(document.getElementById('buttonCell6'));
const Cell7 = new Cell(document.getElementById('buttonCell7'));
const Cell8 = new Cell(document.getElementById('buttonCell8'));
const Cell9 = new Cell(document.getElementById('buttonCell9'));

table.push(Cell1.cell, Cell2.cell, Cell3.cell, Cell4.cell, Cell5.cell, Cell6.cell, Cell7.cell, Cell8.cell, Cell9.cell);

const Game = new Board(table);