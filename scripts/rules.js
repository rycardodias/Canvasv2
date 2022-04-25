let hiddenBallArray = [];
let player1Playing = true;
let winner = 0; // 1- player 1, 2 - player 2

function gameRules() {
    hiddenBallArray = ballArray.filter(element => element.hidden === true)

    let branca = hiddenBallArray.find(e => e.number === 0)

    //branca dentro do buraco, reposiciona no ponto central
    if (branca) {
        ballArray[0].x = canvas.width * 0.25
        ballArray[0].y = canvas.height * 0.5
        ballArray[0].vx = 0
        ballArray[0].vy = 0
        ballArray[0].hidden = false
        // troca de jogador
        player1Playing = !player1Playing
    }

    if (player1Playing) {
        let balls = hiddenBallArray.filter(e => (e.number < 9 && e.number !== 0))

        //Entra PRETA com bolas em falta OU entra preta e branca
        if (balls.find(e => e.number === 8) && balls.length < 8 || balls.find(e => e.number === 8) && branca) winner = 2

        // Entram todas excepto branca // VENCE
        if (balls.length === 8 && !branca) winner = 1

    } else {
        let balls = hiddenBallArray.filter(e => (e.number > 7 && e.number !== 0))

        //Entra PRETA com bolas em falta OU entra preta e branca
        if (balls.find(e => e.number === 8) && balls.length < 8 || balls.find(e => e.number === 8) && branca) winner = 1

        // Entram todas excepto branca // VENCE
        if (balls.length === 8 && !branca) winner = 2
    }

    winner !== 0 && alert(`Venceu o jogador ${winner} !!!`)
}