/**
 * Class holding one single cell of the board. It enables setting the value of this cell (either X or O).
 */
class Cell {
    cellValue: number;
    cell: HTMLElement;

    constructor (cell: HTMLElement) {
        this.cell = cell;
    }

    /**
     * This method allows for writing value to cell.
     * @param value Specifies the value that is gonna be wrote into cell.
     */
    setValue(value: number) {
        this.cellValue = value;
        if (value === 0) {
            this.cell.innerHTML = "";
        } else {
            value === 1 ? this.cell.innerHTML = 'X' : this.cell.innerHTML = 'O';
        }    
    }
}

/**
 * Class for managing course of the game. It holds array containing all the cells and shares methods for managing game.
 */
class Board {
    /**
     * @property {cells} - Multidimensional array for holding cells
     * @property {currentMove} - 0 is default, 1 for X, 2 for O
     * @property {scoreText} - Display current game status on page
     * @property {start} - False if game can't be started, true after StartButton clicked
     */
    cells: Cell[][];
    currentMove: number = 0;
    scoreText: HTMLElement;
    start: boolean = false;
    startButton: HTMLElement;
    resetButton: HTMLElement;

/**
 * @constructor Enables resize of the board. Creates this board and adds event handlers for buttons.
 * @param size Size of the board (SIZE x SIZE). Default value equals 3.
 */
    constructor(size: number = 3) {
        this.cells = new Array(size);

        let table = <HTMLTableElement>document.getElementById('board');
        let i = 0;
        for (let x = 0; x < size; x++) {
            let row = table.insertRow(x);
            this.cells[x] = [];
            for (let y = 0; y < size; y++) {
                let cell = <HTMLTableCellElement>row.insertCell(y);
                cell.className = "cell";
                const newCell = new Cell(cell);
                newCell.cellValue = 0;
                this.cells[x][y] = newCell;
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

    /**
     * Method linked with every Cell through 'click' event, manages player's move.
     * @param cell Cell that was clicked
     */
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
            this.checkIfWin();       
        } else if(this.start === true && cell.cellValue != 0) {
            alert('This cell is already clicked! Pick another option.')
        } else
            this.scoreText.innerHTML = "Move: Click START button to start!";
    }

    /**
     * Method for starting the game, connected with startButton.
     */
    Start() {
        this.Reset();
        if (this.start == false) {
            console.log('START');
            this.start = true;
            this.currentMove = 1;
            this.scoreText.innerHTML = "Move: X";
        }
    }

    /**
     * Method for resetting the game, connected with resetButton.
     */
    Reset() {
        this.cells.forEach(element => {
            element.forEach(el => {
                el.setValue(0);

            });
        });
        this.start = false;
        this.currentMove = 0;
    }

    /**
     * This methods checks winning conditions after player's move.
     */
    checkIfWin() {
        this.checkVertical();
        this.checkHorizontal();
        this.checkDiagonally();
    }

    checkVertical() {
        let count = 0;

        for (let i = 0; i < this.cells.length; i++) {
            count = 0;
            for (let j = 0; j < this.cells.length - 1; j++) {
                if (count === 2) {
                    this.stopGame();
                } else {
                    if (this.cells[j][i].cellValue != 0 && this.cells[j][i].cellValue === this.cells[j+1][i].cellValue) {
                        count++;
                    } else {
                        count = 0;
                    }
                }
            }
        }
    }

    checkHorizontal() {
        let count = 0;

        
    }

    checkDiagonally() {

    }

    stopGame() {
        this.currentMove === 1 ? this.scoreText.innerHTML = "O has won the game!" :
                                    this.scoreText.innerHTML = "X has won the game!";
        this.start = false;
    }
}

const board = new Board(9);