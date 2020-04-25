/**
 * Class holding one single cell of the board. It enables setting the value of this cell (either X or O).
 */
class Cell {
    cellValue: number;
    cell: HTMLElement;

    constructor (cell: HTMLElement) {
        this.cell = cell;
    }

    setValue(value: number) {
        this.cellValue = value;
        value === 1 ? this.cell.innerHTML = 'X' : this.cell.innerHTML = 'O';       
    }
}

/**
 * Class for managing course of the game. It holds array containing all the cells and shares methods for managing game.
 */
class Board {
    cells: Cell[];
    winningCond: number;
    currentMove: number = 0; // 0 is default, 1 for X, 2 for O
    scoreText: HTMLElement;
    start: boolean = false;
    startButton: HTMLElement;
    resetButton: HTMLElement;

/**
 * @constructor Enables resize of the board. Creates this board and adds event handlers for buttons
 * @param size Size of the board (SIZE x SIZE). Default value equals 3.
 * @param winningCond Defines how many symbols should be in a row to win. Default value equals 3.
 */
    constructor(size: number = 3, winningCond: number = 3) {
        this.cells = new Array(size);
        this.winningCond = winningCond;

        let table = <HTMLTableElement>document.getElementById('board');
        let i = 0;
        for (let x = 0; x < size; x++) {
            let row = table.insertRow(x);

            for (let y = 0; y < size; y++) {
                let cell = <HTMLTableCellElement>row.insertCell(y);
                cell.className = "cell";
                const newCell = new Cell(cell);
                newCell.cellValue = 0;
                this.cells[i] = newCell;
                newCell.cell.addEventListener('click', () => this.makeMove(newCell), false);
                i++
            }
        }
        this.scoreText = document.getElementById('score');
        this.startButton = document.getElementById('start');
        this.startButton.addEventListener('click', () => this.Start());
        this.resetButton = document.getElementById('reset');
        this.resetButton.addEventListener('click', () => this.Reset());
    }

    makeMove(cell: Cell) {
        if (this.start === true && cell.cellValue == 0) {
            cell.setValue(this.currentMove);
            if(this.currentMove === 1) {
                this.currentMove = 2;
                this.scoreText.innerHTML = "Move: O"
            } else {
                this.currentMove = 1;
                this.scoreText.innerHTML = "Move: X";
            }           
        } else if(this.start === true && cell.cellValue != 0) {
            alert('This cell is already clicked! Pick another option.')
        } else
            this.scoreText.innerHTML = "Move: Click START button to start!";

        this.checkIfWin();
    }

    Start() {
        if (this.start == false) {
            console.log('START');
            this.start = true;
            this.currentMove = 1;
            this.scoreText.innerHTML = "Move: X";
        }
    }

    Reset() {
        this.cells.forEach(element => {
            element.cell.innerHTML = '';
            element.cellValue = 0;
        });
        this.start = false;
        this.currentMove = 0;
        this.scoreText.innerHTML = 'Move: ';
    }

    checkIfWin() {
        console.log(this.cells);
    }
}

const board = new Board(5);