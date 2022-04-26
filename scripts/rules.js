let player1Playing = true;
let player1BallGroup = 0 // group 0 - 1 to 7 || group 1 - 9 to 15
let winner = 0; // 1- player 1, 2 - player 2

function gameRules() {
    let hiddenBallArray = ballArray.filter(element => element.hidden === true)

    let white = hiddenBallArray.find(e => e.number === 0)
    let black = hiddenBallArray.find(e => e.number === 8)

    //branca dentro do buraco, reposiciona no ponto central
    if (white) {
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
        if (black && balls.length < 8 || black && white) winner = 2

        // Entram todas excepto branca // VENCE
        if (balls.length === 8 && !white) winner = 1

    } else {
        let balls = hiddenBallArray.filter(e => (e.number > 7 && e.number !== 0))

        //Entra PRETA com bolas em falta OU entra preta e branca
        if (black && balls.length < 8 || black && white) winner = 1

        // Entram todas excepto branca // VENCE
        if (balls.length === 8 && !white) winner = 2
    }

    

}