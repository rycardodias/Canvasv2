let player1Playing = true;
let player1BallGroup = undefined // group 1 - 1 to 7 || group 2 - 9 to 15
let winner = 0; // 1- player 1, 2 - player 2

let totalSmall = 0; // total small balls
let totalBig = 0; // total big balls

function gameRules() {
    let hiddenBallArray = ballArray.filter(element => element.hidden === true)
    winner = 1
    let white = hiddenBallArray.find(e => e.number === 0)
    let black = hiddenBallArray.find(e => e.number === 8)

    let smallballs = hiddenBallArray.filter(e => (e.number < 9 && e.number !== 0))
    let bigballs = hiddenBallArray.filter(e => e.number > 7)

    if (!player1BallGroup && !white && !black) {
        const number = hiddenBallArray[0].number
        player1BallGroup = number < 8 ? 1 : 2
    }

    let balls
    if (player1Playing) {
        if (player1BallGroup === 1)
            balls = smallballs //hiddenBallArray.filter(e => (e.number < 9 && e.number !== 0))
        else
            balls = bigballs //hiddenBallArray.filter(e => e.number > 7)

        //Entra PRETA com bolas em falta OU entra preta e branca
        if (black && balls.length < 8 || black && white) winner = 2

        // Entram todas excepto branca // VENCE
        if (balls.length === 8 && !white) winner = 1

    } else {
        if (player1BallGroup === 2)
            balls = smallballs //hiddenBallArray.filter(e => (e.number < 9 && e.number !== 0))
        else
            balls = bigballs //hiddenBallArray.filter(e => e.number > 7)

        //Entra PRETA com bolas em falta OU entra preta e branca
        if (black && balls.length < 8 || black && white) winner = 1

        // Entram todas excepto branca // VENCE
        if (balls.length === 8 && !white) winner = 2
    }

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

    verifyPlayerTurn(smallballs, bigballs)
}

function verifyPlayerTurn(smallballs, bigballs) {
    if (totalSmall < smallballs.length) {
        if (player1Playing && player1BallGroup === 2) {
            player1Playing = !player1Playing
        } else if (!player1Playing && player1BallGroup === 1) {
            player1Playing = !player1Playing
        }
        totalSmall++
    }
    else if (totalBig < bigballs.length) {
        if (player1Playing && player1BallGroup === 1) {
            player1Playing = !player1Playing
        } else if (!player1Playing && player1BallGroup === 2) {
            player1Playing = !player1Playing
        }
        totalBig++
    }
}