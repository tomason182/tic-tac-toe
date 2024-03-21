function gameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        getCellsValues =  board.map((row) => row.map((cell) => cell.getValue()))
        return getCellsValues;
    }

    return {
        getBoard,
        printBoard
    };
}

function Cell() {
    let value;

    addToken = (playerToken) => {
        value = playerToken;
    }

    getValue = () => value;

    return {
        addToken,
        getValue
    }
}

const game = gameBoard();
