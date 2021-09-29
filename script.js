console.log("hi");

const player = (name, mark) => {
    let pname = name;
    let pmark = mark;
    let playerTurn = false;
    let playerWon = false;
    const getName = () => pname;
    const getMark = () => pmark;
    const setName = (newName) => { pname = newName; };
    const getTurn = () => playerTurn;
    const setTurn = (turn) => { playerTurn = turn };
    const getWon = () => playerWon;
    const setWon = (won) => {playerWon=won;};
    return { getName, setName, getMark, getTurn, setTurn, getWon, setWon};
}

const game = ((player1, player2) => {
    const gameArray = [['', '', ''],
                       ['', '', ''],
                       ['', '', '']];
    let gameWon=false;
    player1.setTurn(true);
    let legalMoves=0;
    const gameBox = document.querySelector('.gamebox');
    const gameBoard = gameBox.querySelector('.gameboard');
    const field = Array.from(gameBoard.querySelectorAll('.field'));
    const restart= gameBox.querySelector('.restart');
    const playerTurn=gameBox.querySelector('.player-turn');
    const winner=gameBox.querySelector('.winner');
    const player1Name=gameBox.querySelector('.player1');
    const player2Name=gameBox.querySelector('.player2');
    const render = () => {
        for (let i = 0; i < field.length; i++) {
            field[i].textContent = gameArray[Math.floor(i/3)][i%3];
        }
        player1Name.textContent=`${player1.getName()}`;
        player2Name.textContent=`${player2.getName()}`;
        playerTurn.textContent=`${player1.getTurn()?player1.getName():player2.getName()}'s turn`;
        if((!gameWon)&&legalMoves===9){
            winner.textContent="Tie";
        }
        else if(player1.getWon()){
            winner.textContent=`${player1.getName()} won`;
        }
        else if(player2.getWon()){
            winner.textContent=`${player2.getName()} won`;
        }
    }

    const input = (e) => {
        let index = e.target.dataset.index;
        if (gameArray[Math.floor(index/3)][index%3] === '') {
            if (player1.getTurn()) {
                gameArray[Math.floor(index/3)][index%3] = player1.getMark();
                player1.setTurn(false);
                player2.setTurn(true);
            }
            else {
                gameArray[Math.floor(index/3)][index%3] = player2.getMark();
                player1.setTurn(true);
                player2.setTurn(false);
            }
            legalMoves++
            gameWon=gameLogic(index);
            render();
        }
    }

    const bindEvents = () => {
        field.forEach(element => {
            element.addEventListener('click', (e) => { 
                if((!gameWon)&&legalMoves<9){
                input(e); 
                }
            });
        });

        restart.addEventListener('click', () =>{
            reloadGame();
        });

        player1Name.addEventListener('click',()=>{
            let name=prompt("Player 1 name");
            if(name!==null&&Number(name)!==0){
                player1.setName(name);
            }
            render();
        });

        player2Name.addEventListener('click',()=>{
            let name=prompt("Player 2 name");
            if(name!==null&&Number(name)!==0){
                player2.setName(name);
            }
            render();
        });
    }

    const gameLogic=(index)=>{
        if(gameArray[Math.floor(index/3)][0]===gameArray[Math.floor(index/3)][1]&&
           gameArray[Math.floor(index/3)][1]===gameArray[Math.floor(index/3)][2]){
               if(!player1.getTurn()){
                   player1.setWon(true);
               }
               else{
                player2.setWon(true);
               }
               return true;
           }
        if(gameArray[0][index%3]===gameArray[1][index%3]&&
            gameArray[1][index%3]===gameArray[2][index%3]){
                if(!player1.getTurn()){
                    player1.setWon(true);
                }
                else{
                 player2.setWon(true);
                }
                return true;
        }
        if(((gameArray[0][0]===gameArray[1][1]&&gameArray[1][1]===gameArray[2][2])||
            (gameArray[0][2]===gameArray[1][1]&&gameArray[1][1]===gameArray[2][0]))&&gameArray[1][1]!==''){
            if(!player1.getTurn()){
                player1.setWon(true);
            }
            else{
             player2.setWon(true);
            }
            return true;
        }
        return false;
    };

    const reloadGame= () => {
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                gameArray[i][j]='';
            }
        }
        gameWon=false;
        player1.setTurn(true);
        player2.setTurn(false);
        legalMoves=0;
        player1.setWon(false);
        player2.setWon(false);
        winner.textContent='';
        render();
    };

    const init = () => {
        render();
        bindEvents();
    }
    return { init };
})(player("Player1", "O"), player("Player2", "X"));

game.init();