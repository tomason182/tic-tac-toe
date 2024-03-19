function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board =  [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const selectCell = (column ,row ,player) => {
        
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
        }       
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {getBoard, selectCell, printBoard}
}


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value; 
    
    return {addToken, getValue};
}

function GameController (playerOneName = "Player One", playerTwoName = "Player Two") {

    const board = Gameboard();

    const players = [
        {
            name: playerOneName, 
            token: 1},
        {
            name: playerTwoName,
            token: 2
        }
        ];
    
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (column, row) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into colum ${column}...`
        );          

        board.selectCell(column, row, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();

