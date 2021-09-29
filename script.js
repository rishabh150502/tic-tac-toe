console.log("hi");

const player = (name, mark) => {
    let pname = name;
    let pmark = mark;
    let playerTurn = false;
    const getName = () => pname;
    const getMark = () => pmark;
    const setName = (newName) => { pname = newName; };
    const getTurn = () => playerTurn;
    const setTurn = (turn) => { playerTurn = turn };
    return { getName, setName, getMark, getTurn, setTurn };
}

const game = ((player1, player2) => {
    const gameArray = [['', '', ''],
                       ['', '', ''],
                       ['', '', '']];
    player1.setTurn(true);
    let legalMoves=0;
    const gameBoard = document.querySelector('.gameboard');
    const field = Array.from(gameBoard.querySelectorAll('.field'));

    const render = () => {
        for (let i = 0; i < field.length; i++) {
            field[i].textContent = gameArray[Math.floor(i/3)][i%3];
        }
    }

    const input = (e) => {
        console.log(e.target);
        let index = e.target.dataset.index;
        console.log(index);
        if (gameArray[Math.floor(index/3)][index%3] === '') {
            if (player1.getTurn()) {
                gameArray[Math.floor(index/3)][index%3] = player1.getMark();
                player1.setTurn(false);
                player2.setTurn(true);
                render();
            }
            else {
                gameArray[Math.floor(index/3)][index%3] = player2.getMark();
                player1.setTurn(true);
                player2.setTurn(false);
                render();
            }
            legalMoves++
            gameLogic(index);
            console.log(legalMoves);
        }
    }

    const bindEvents = () => {
        field.forEach(element => {
            element.addEventListener('click', (e) => { input(e); });
        });
    }

    const gameLogic=(index)=>{
        if(gameArray[Math.floor(index/3)][0]===gameArray[Math.floor(index/3)][1]&&
           gameArray[Math.floor(index/3)][1]===gameArray[Math.floor(index/3)][2]){
               alert('win');
               return true;
           }
        if(gameArray[0][index%3]===gameArray[1][index%3]&&
            gameArray[1][index%3]===gameArray[2][index%3]){
                alert('win');
                return true;
        }
        if(((gameArray[0][0]===gameArray[1][1]&&gameArray[1][1]===gameArray[2][2])||
            (gameArray[0][2]===gameArray[1][1]&&gameArray[1][1]===gameArray[2][0]))&&gameArray[1][1]!==''){
            alert('win');
            return true;
        }
    };
    const init = () => {
        render();
        bindEvents();
    }
    return { init };
})(player("player1", "O"), player("player2", "X"));

game.init();