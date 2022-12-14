/* 
DESIGN


display module 
    handles dom elements
    updates dom 
    interacts with game module
    add event listener to tictactoe cells and updates game array


Game module
    turn function
    isThereWinner
    Array of inputted values
    interacts with player object
    interacts with display module
    checks if a player has "x" or "o" and assigns the other to another player

player object
    player sign: x or o 


*/

const displayGame = (() => {

    const gameContainer = document.querySelector("#gameContainer");
    const gridColumns = new Array();
    const gridRows = new Array();


//creates and sets cells
for(let i = 0; i < 3; i++){

    gridColumns[i] = document.createElement("div");
    gridColumns[i].classList.add("gridColumns");
    gridColumns[i].id = "col" + i;
    gameContainer.appendChild(gridColumns[i]);

    gridColumns[i].style.display = "flex";
    gridColumns[i].style.flexDirection = "column";

    for(let x = 0; x < 3; x++){

        gridRows[x] = document.createElement("div");
        gridRows[x].classList.add("gridRowDiv");
        gridRows[x].id = "col" + i + "row" + x;
        gridColumns[i].appendChild(gridRows[x]);
    }
}

/*
    move this to game module, because i am displaying based on game logic.
    unless i find a way to make the two modules communicate, in which case,
    i would handle the display aspect here and the logic aspect there.
 */

})();

//player factory function
const Player = (num) => {
    let numberOfTurns = 0;
    let playerSymbol =""; 

    //potential for error handling if num is neither 1 or 2. Seems unnecessary
    if(num == 1){
        playerSymbol = "X";
    } else {
        playerSymbol = "O";
    }

    function incrementTurn(){
        this.numberOfTurns += 1;
    }

    return {playerSymbol, numberOfTurns, incrementTurn};
}



const gameModule = (() =>{

    const cells = document.querySelectorAll(".gridRowDiv");
    let gameArr = [[null,null,null],[null,null,null],[null,null,null]];
    const p1 = Player(1);
    const p2 = Player(2);

    //gameArr.fill(new Array(3).fill(null));
    
    function whosTurn(){
        let totalTurns = p1.numberOfTurns + p2.numberOfTurns;
        if(totalTurns % 2 == 0){
            p1.incrementTurn();
            return p1.playerSymbol;
        } else if(totalTurns % 2 == 1){
            p2.incrementTurn();
            return p2.playerSymbol;
        }
    }

    function isThereWinner(playerSym){
        let winner = false;

        for(let i = 0; i < 3; i++){
            if(gameArr[i][0] == playerSym && gameArr[i][1] == playerSym && gameArr[i][2] == playerSym){
                return winner = true;
            }
            if(gameArr[0][i] == playerSym && gameArr[1][i] == playerSym && gameArr[2][i] == playerSym){
                return winner = true;
            }
        }

        if(gameArr[0][0] == playerSym && gameArr[1][1] == playerSym && gameArr[2][2] == playerSym){
            return winner = true;
        }
        if(gameArr[0][2] == playerSym && gameArr[1][1] == playerSym && gameArr[2][0] == playerSym){
            return winner = true;
        }
        return winner = false;
    }   

    isThereWinner();

    function resetGame(){
        gameArr = [[null,null,null],[null,null,null],[null,null,null]];
        for(let i = 0; i < cells.length; i++){
            cells[i].textContent = null;
        }
    }

    for(let i = 0; i < cells.length; i++){

        cells[i].addEventListener("click",() =>{
            let colId = cells[i].id[3];
            let rowId = cells[i].id[7];

            //assigns it to variable first so it doesnt increment twice when invoked
           
            if(gameArr[colId][rowId] == null){
                cells[i].textContent = whosTurn();
                gameArr[colId][rowId] = cells[i].textContent;
            }

            if(isThereWinner(p1.playerSymbol)){
                alert("X wins!");
                resetGame();
                console.log(gameArr)
            } else if(isThereWinner(p2.playerSymbol)){
                alert("O wins!");
                resetGame();
                console.log(gameArr);
            }
        })
    }
  

})();


//next up do turn function and probably use it in display module?





