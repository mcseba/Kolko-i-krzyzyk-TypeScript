/**
 * Class holding one single cell of the board. It enables setting the value of this cell (either X or O).
 */
class Cell {
    /**
     * @property {cellValue} - Holds current value of the cell.
     * @property {cell} - Holds cell element from the table.
     * @property {posX} - Number of the row that this cell is in. (Starts from 0)
     * @property {posY} - Number of the element in the specific row. (Starts from 0)
     */
    cellValue: number;
    cell: HTMLElement;
    posX: number;
    posY: number;

    constructor (cell: HTMLElement, posx: number, posy: number) {
        this.cell = cell;
        this.posX = posx;
        this.posY = posy;
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
                const newCell = new Cell(cell, x, y);
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
            this.checkIfWin(cell.posX, cell.posY);       
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
     * This method checks winning conditions every time cell is clicked.
     * @param indexX Index of row where clicked cell is.
     * @param indexY Index of the element in the specific row.
     */
    checkIfWin(indexX: number, indexY: number) {

        console.log(indexX, indexY)
        
        //vertical check
        let colSum = 0;
        for (let i = 1; i < 3; i++) {
            if (indexX + i <= this.cells.length -1 && this.cells[indexX][indexY].cellValue == this.cells[indexX+i][indexY].cellValue) {
                colSum++;              
            } 
            if (indexX - i >= 0 && this.cells[indexX][indexY].cellValue == this.cells[indexX-i][indexY].cellValue)
            {
                colSum++;
            }
            if (colSum == 2) {
                this.stopGame()
                break;
            };
        }

        //horizontal check
        let rowSum = 0;
        for (let i = 1; i < 3; i++) {
            if (indexY + i <= this.cells.length -1 && this.cells[indexX][indexY].cellValue == this.cells[indexX][indexY + i].cellValue) {
                rowSum++;              
            }
            if (indexY - i >= 0 && this.cells[indexX][indexY].cellValue == this.cells[indexX][indexY - i].cellValue)
            {
                rowSum++;
            }
            if (rowSum == 2) {
                this.stopGame()
                break;
            };
        }

        //diagonal check
        let diagonalSum = 0;
        for (let i = 1; i < 3; i++) {
            if (indexY + i <= this.cells.length -1 && this.cells[indexX][indexY].cellValue == this.cells[indexX + i][indexY + i].cellValue) {
                diagonalSum++;              
            }
            if (indexY - i >= 0 && this.cells[indexX][indexY].cellValue == this.cells[indexX - i][indexY - i].cellValue)
            {
                diagonalSum++;
            }
            if (diagonalSum == 2) {
                this.stopGame()
                break;
            };
        }

        //anti diagonal check
        let antiDiagonalSum = 0;
        for (let i = 1; i < 3; i++) {
            if (this.cells[indexX][indexY].cellValue == this.cells[indexX + i][indexY - i].cellValue) {
                antiDiagonalSum++;              
            }
            if (this.cells[indexX][indexY].cellValue == this.cells[indexX - i][indexY + i].cellValue)
            {
                antiDiagonalSum++;
            }
            if (antiDiagonalSum == 2) {
                this.stopGame()
                break;
            };
        }

    }

    stopGame() {
        this.currentMove === 1 ? this.scoreText.innerHTML = "O has won the game!" :
                                    this.scoreText.innerHTML = "X has won the game!";
        this.start = false;
    }
}

const board = new Board(5);