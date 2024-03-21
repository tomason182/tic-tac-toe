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

    const setToken = (indexRow, indexColumn, Token) => 
    {
        board[indexRow][indexColumn].addToken(Token);
    }

    return {
        getBoard,
        printBoard,
        setToken
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

function gameController() {

    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const board = gameBoard();

    const printNewBoard = () => {
        console.log(board.printBoard())
    }

    const players = [
        {
            name: playerOneName,
            token: 'X'  
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {

        actualBoard =  board.printBoard();
        
        if (actualBoard[row][column] === undefined){
            board.setToken(row, column, getActivePlayer().token);
            switchPlayer();
            printNewBoard();
        }

        

    }    

    return {
        switchPlayer,
        getActivePlayer,
        playRound,
        printNewBoard
    }

}

const game = gameController();
