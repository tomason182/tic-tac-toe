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
    const result = gameResult(board);

    const printNewBoard = () => {
        console.log(board.printBoard());
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

        

        if (board.printBoard()[row][column] === undefined){
            board.setToken(row, column, getActivePlayer().token);
            printNewBoard();
            
            if (result.tiedGame()) {
                console.log("El juego esta empatado");
            }
            if (result.allEqualRows() || result.allEqualColumns()) {
                console.log(`El ganador es el: ${getActivePlayer().name}`);
            }
           
            switchPlayer();        
        }
    }    

    return {
        switchPlayer,
        getActivePlayer,
        playRound,
        printNewBoard
    }
}

function gameResult (board) {  
    
    

    const tiedGame = () => {
        const currentBoard = board.printBoard();
        const allCellsFull = (cell) => cell !== undefined && cell !== null;
        return currentBoard.every(row => row.every(allCellsFull))    }

    const allEqualRows = () => {
        const currentBoard = board.printBoard();
        for (let i = 0; i < currentBoard.length; i ++){
            if (currentBoard[i].every((cell) => cell === currentBoard[i][0]) && currentBoard[i][0] !== undefined){
                return true;
            }                
        }
        return false;
    }

    const allEqualColumns = () => {
        const currentBoard = board.printBoard();
        for (let i = 0; i < currentBoard[0].length; i++){
            let column = []
            for (let j = 0; j < currentBoard.length; j++) {
                column.push(currentBoard[j][i]);
            }
            if(column.every((cell)=> cell === column[0]) && column[0] !== undefined){
                return true;
            }     
        }
        return false;
    }

    return {
       tiedGame,
       allEqualRows,
       allEqualColumns
    }
}

const game = gameController()
