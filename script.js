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
            if (result.allEqualRows() || result.allEqualColumns() || result.equalDiagonal()) {
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

    const equalDiagonal = () => {
        const currentBoard = board.printBoard();
        if (currentBoard[0][0] === currentBoard[1][1] && currentBoard[0][0] === currentBoard[2][2] && currentBoard[0][0] !== undefined) {
            return true;
        }else if (currentBoard[0][2] === currentBoard[1][1] && currentBoard [0][2] === currentBoard[2][0] && currentBoard[0][2] !== undefined) {
            return true;
        }
        return false;
    }

    return {
       tiedGame,
       allEqualRows,
       allEqualColumns,
       equalDiagonal
    }
}

function screenDisplay() {

    const board = gameBoard();
    const controller = gameController()
    const boardDiv = document.querySelector('.board');
    const turnDiv = document.querySelector('.turn');

    const updateScreen = () => {
        boardDiv.textContent = "";
        turnDiv.textContent = `It's ${controller.getActivePlayer().name} turn`;


    }

    const createGrid = () => {
        
    }

    return {
        updateScreen,
    }
}

const game = gameController();
const display = screenDisplay();
display.updateScreen()
