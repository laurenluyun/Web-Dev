// create object for player 1 and player 2
const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = 3;
let isGameOver = false;

// generic function to update the scores
// if we have multiple opponents, then can use array as the param
function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        
        // when below statement is met, isGameOver is true, cannnot
        // execute the if statement for both players any more
        if (player.score === winningScore) {
           isGameOver = true;
           player.display.classList.add('has-text-success');
           opponent.display.classList.add('has-text-danger');
           player.button.disabled = true;
           opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

// extract winninScore from the selection through change event
// which is whenver the value is changed, the winningscore will be 
// extracted and transformed to integer, and the scores will be reset
winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value)
    reset();
})

p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})

p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})

// not exectuing reset but passsing a param, which will be executed
resetButton.addEventListener('click', reset)

// use for loop to create generic function, works better if we have more players
function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}


