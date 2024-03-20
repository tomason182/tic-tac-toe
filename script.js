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

    const cellSelection = (row ,column ,player) => {
        
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player);
        }       
    };

    //prints the board in the console. Just for testing purpose.
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {getBoard, cellSelection, printBoard}
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
            token: 1
        },
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

    /*Not necesary function. Only console display*/
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };


    const allEqualsInRow = (array) => {
      
        for (i = 0; i < array.length; i++) {

            const row = array[i]

            for(j = 0; j < row.length; j++ ) {
                
                if (row[j] !== row[0]) {
                    return false;
                }  
            }

            if (row[0] !== 0){
                return true;
            }   
            
        }
            
    }
    

    const allEqualsInColumns = (array) => {


        array.forEach((row, i) =>{
            row.forEach((column, j) => {
                firtsElementColumn = array[0][j];
                if (array[i][j] === firtsElementColumn && firtsElementColumn !== 0){
                    return true;
                }
            })
        })

    }

    const playRound = (row, column) => {
        
        const boardArray = board.getBoard();
        
        if (boardArray[row][column].getValue() === 0) {

            /*Only console display*/
            console.log(
            `Dropping ${getActivePlayer().name}'s token into colum ${column} and row ${row}`
            );


            board.cellSelection(row, column, getActivePlayer().token);

            if (allEqualsInRow(boardArray) === true || allEqualsInColumns(boardArray) === true) {

                console.log(`The winner is ${getActivePlayer().name}`)   
            
            }          


            /* Here we shoudl add logic to check for a winner */

            switchPlayerTurn();
            printNewRound();
        }      
    
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const game = GameController();
    const playerturnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerturnDiv.textContent =`${activePlayer.name}'s turn...`;

        board.forEach((row, indexRow) => {
            row.forEach((cell, indexColumn) =>{
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = indexRow;
                cellButton.dataset.column = indexColumn;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedColumn || !selectedRow)  return; 
    
        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

boardDiv.addEventListener("click", clickHandlerBoard);

updateScreen();

}

ScreenController()



