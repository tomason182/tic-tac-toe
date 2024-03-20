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

    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };


    const allEqualsInRow = (array) => {

        let isEqual; 

        for (let i = 0; i < array.length; i++) {

            row = array[i];
            

            for (let j = 0; j < row.length; j++){
                
                initialValue = row[0].getValue();

                if(row[j].getValue() === initialValue && initialValue !== 0) {
                    isEqual = true;
                }else{
                    isEqual = false;
                    break;
                }
            }
            
            if (isEqual === true){
                
                return isEqual;
            }            
        }        
        return isEqual;
    }
    
    
    const allEqualsInColumns = (array) => {
      
        let isEqual;
        for(let j = 0; j < array[0].length; j++) {
            initialValue = array[0][j].getValue();
        
            for (let i = 0; i < array.length; i++) {
                if(array[i][j].getValue() === initialValue && initialValue !== 0){
                    isEqual = true;
                }else{
                    isEqual = false;
                    break;
                }
            }
            if (isEqual === true){
                return isEqual;
            }
        }
        return isEqual;
    }

    const allEqualsInDiagonal = (array) => {
        initialLeftValue = array[0][0].getValue();
        initialRightValue = array[0][2].getValue();
        middleValue = array[1][1].getValue();
        lastLeftValue = array[2][0].getValue();
        lastRightValue = array[2][2].getValue();

        if (initialLeftValue === middleValue && initialLeftValue === lastRightValue && initialLeftValue !== 0){
            return true;
        }else if(initialRightValue === middleValue && initialRightValue === lastLeftValue && initialRightValue !== 0) {
            return true;
        }else{
            return false;
        }

    }
  

    const playRound = (row, column) => {
        
        const boardArray = board.getBoard();
        
        if (boardArray[row][column].getValue() === 0) {

            /* Only console display */
            console.log(
            `Dropping ${getActivePlayer().name}'s token into colum ${column} and row ${row}`
            );               

            board.cellSelection(row, column, getActivePlayer().token);

           if (allEqualsInRow(boardArray) === true || allEqualsInColumns(boardArray) || 
                allEqualsInDiagonal(boardArray)) {

                alert(`${getActivePlayer().name} WIN!!`)
           }

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



