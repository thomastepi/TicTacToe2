let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
var ctx = document.getElementById('chart');

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

player1_score = 0;
player2_score = 0;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            if(currentPlayer == X_TEXT){
                player1_score++
                if(player1_score == 3){
                    create_chart(player1_score, player2_score)
                }
                //console.log(player1_score, player2_score);
            } else {
                player2_score++
                if(player1_score == 3){
                    create_chart(player1_score, player2_score)
                }
            }
            console.log(player1_score, player2_score);
            return
        }  
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

function create_chart(p1_score, p2_score){
    var x = ['X_TEXT', 'O_TEXT'];
    var y = [p1_score, p2_score];
    var z = ['red', 'green']
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: x,
        datasets: [{
          label: 'Players scores compared',
          data: y,
          backgroundColor: z
        }]
      },
      options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
        }]
        }
    }
    })
  }

startGame()