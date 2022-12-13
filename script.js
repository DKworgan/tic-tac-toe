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

const cells = document.querySelectorAll(".gridRowDiv");

    for(let i = 0; i < cells.length; i++){
        cells[i].addEventListener("click",() =>{
            cells[i].textContent = "X";
        })

    }
})();