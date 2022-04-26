function calculateDistanteToWhite(mouse) {
    let rect = canvas.getBoundingClientRect()
    let x = mouse.clientX - rect.left
    let y = mouse.clientY - rect.top

    let dx = ballArray[0].x - x,
        dy = ballArray[0].y - y,
        dist = Math.sqrt(dx * dx + dy * dy)

    return dist
}

window.addEventListener('mousedown', mouse => {

    if (winner !== 0) {
        // calcular click novo jogo 
        let rect = canvas.getBoundingClientRect()
        let x = mouse.clientX - rect.left
        let y = mouse.clientY - rect.top

        if (x > (canvas.width / 1.5 - canvas.width * .1) && x < canvas.width / 1.5 + canvas.width * .2
            && y > canvas.height / 2 - canvas.height * .05 && y < canvas.height / 2 + canvas.height * .05) {
            
            buildGame()
        }
    }

    if (ballsMoving === 1) return

    if (calculateDistanteToWhite(mouse) < globalRadius) {
        ballPressed = 1
    }

})

window.addEventListener('mouseup', mouse => {
    if (ballsMoving === 1) return
    if (ballPressed === 1) {
        ballPressed = 0
        //calcular angulo
        let rect = canvas.getBoundingClientRect()
        let x = mouse.clientX - rect.left
        let y = mouse.clientY - rect.top

        let dx = ballArray[0].x - x,
            dy = ballArray[0].y - y,
            angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),

            //rotate ball0's velocity
            vel0 = rotate(ballArray[0].vx, ballArray[0].vy, sin, cos, true)

        //collision reaction
        vel0.x = calculateDistanteToWhite(mouse) * 0.15

        //rotate velocities back
        var vel0F = rotate(vel0.x, vel0.y, sin, cos, false);

        if (vel0F.x > 0) {
            ballArray[0].vx = vel0F.x < maxForce ? vel0F.x : maxForce;
        } else {
            ballArray[0].vx = vel0F.x > -maxForce ? vel0F.x : -maxForce;
        }

        if (vel0F.y > 0) {
            ballArray[0].vy = vel0F.y < maxForce ? vel0F.y : maxForce;
        } else {
            ballArray[0].vy = vel0F.y > -maxForce ? vel0F.y : -maxForce;
        }

        //bola foi jogada
        played = true
    }

})