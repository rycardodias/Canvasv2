const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .9
canvas.height = canvas.width * .5

// variaveis de tamanhos
// let borderSize = canvas.width * .04
let globalRadius = canvas.width * .025;
const bounceForce = -0.7;
const frictionForce = 0.99 // percentage
const maxForce = 25
let positionArray = []; //posição dos buracos

//calculo alinhamento bolas
let line1X = canvas.width * 0.75 - globalRadius * 2
let line2X = canvas.width * 0.75
let line3X = canvas.width * 0.75 + globalRadius * 2
let line4X = canvas.width * 0.75 + globalRadius * 4
let line5X = canvas.width * 0.75 + globalRadius * 6

let line1Y = canvas.height * 0.5 - globalRadius * 4 - 4
let line2Y = canvas.height * 0.5 - globalRadius * 3 - 3
let line3Y = canvas.height * 0.5 - globalRadius * 2 - 2
let line4Y = canvas.height * 0.5 - globalRadius - 1
let line5Y = canvas.height * 0.5
let line6Y = canvas.height * 0.5 + globalRadius + 1
let line7Y = canvas.height * 0.5 + globalRadius * 2 + 2
let line8Y = canvas.height * 0.5 + globalRadius * 3 + 3
let line9Y = canvas.height * 0.5 + globalRadius * 4 + 4

let ballPressed = 0
let ballsMoving = 0

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

    }

})

let ballArray = []
//declarar bolas
ballArray.push(new Ball(canvas.width * 0.25, line5Y, 'white', 0));
ballArray.push(new Ball(line3X, line3Y, 'gold', 1));
ballArray.push(new Ball(line5X, line7Y, 'blue', 2));
ballArray.push(new Ball(line4X, line4Y, 'red', 3));
ballArray.push(new Ball(line5X, line3Y, 'purple', 4));
ballArray.push(new Ball(line5X, line1Y, 'orangered', 5));
ballArray.push(new Ball(line4X, line8Y, 'forestgreen', 6));
ballArray.push(new Ball(line2X, line6Y, 'maroon', 7));
ballArray.push(new Ball(line3X, line5Y, 'black', 8));
ballArray.push(new Ball(line1X, line5Y, 'gold', 9));
ballArray.push(new Ball(line4X, line6Y, 'blue', 10));
ballArray.push(new Ball(line5X, line9Y, 'red', 11));
ballArray.push(new Ball(line2X, line4Y, 'purple', 12));
ballArray.push(new Ball(line5X, line5Y, 'orangered', 13));
ballArray.push(new Ball(line4X, line2Y, 'forestgreen', 14));
ballArray.push(new Ball(line3X, line7Y, 'maroon', 15));

ballArray.push(new Ball(globalRadius, globalRadius + 10, 'maroon', 17));

function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}

function checkCollision(ball0, ball1) {
    var dx = ball1.x - ball0.x,
        dy = ball1.y - ball0.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    //collision handling code here
    if (dist < ball0.radius + ball1.radius) {
        //calculate angle, sine, and cosine
        var angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),
            //rotate ball0's position
            pos0 = { x: 0, y: 0 }, //point
            //rotate ball1's position
            pos1 = rotate(dx, dy, sin, cos, true),
            //rotate ball0's velocity
            vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),
            //rotate ball1's velocity
            vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),
            //collision reaction
            vxTotal = vel0.x - vel1.x;
        vel0.x = (2 * vel1.x) /
            2;
        vel1.x = vxTotal + vel0.x;
        //update position
        var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
            overlap = (ball0.radius + ball1.radius) - Math.abs(pos0.x - pos1.x);
        pos0.x += vel0.x / absV * overlap;
        pos1.x += vel1.x / absV * overlap;

        pos0.x += vel0.x;
        pos1.x += vel1.x;
        //rotate positions back
        var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
            pos1F = rotate(pos1.x, pos1.y, sin, cos, false);
        //adjust positions to actual screen positions
        ball1.x = ball0.x + pos1F.x;
        ball1.y = ball0.y + pos1F.y;
        ball0.x = ball0.x + pos0F.x;
        ball0.y = ball0.y + pos0F.y;
        //rotate velocities back
        var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
            vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
        ball0.vx = vel0F.x;
        ball0.vy = vel0F.y;
        ball1.vx = vel1F.x;
        ball1.vy = vel1F.y;
    }
}

function checkHoleCollision(ball) {
    const distanceHall = ball.radius * 2
    if (ball.x <= distanceHall ||
        ball.y <= distanceHall ||
        ball.x >= canvas.width - distanceHall ||
        ball.y >= canvas.height - distanceHall
    ) {
        positionArray.forEach(element => {
            var dx = element.x - ball.x,
                dy = element.y - ball.y,
                dist = Math.sqrt(dx * dx + dy * dy);


            if (dist < distanceHall) {
                return ball.hidden = true

            }
        })

        // ballArray.pop()
        // ballArray.splice(this.number - 1)

    }

}

let hiddenBallArray = [];

let player1Playing = true
let player2Playing = false

function gameRules() {
    hiddenBallArray = ballArray.filter(element => element.hidden === true)

    //branca dentro do buraco, reposiciona no ponto central
    if (hiddenBallArray.find(element => element.number === 0)) {
        ballArray[0].x = canvas.width * 0.25
        ballArray[0].y = canvas.height * 0.5
        ballArray[0].vx = 0
        ballArray[0].vy = 0
        ballArray[0].hidden = false
        // troca de jogador
        player1Playing = !player1Playing
        player2Playing = !player2Playing
        //TODO coloca bola em cima da mesa
    }

    if (player1Playing) {
        if (hiddenBallArray.filter(element => element.number < 9).length === 8) {
            console.log("venceu")
        }
        // console.log(hiddenBallArray.filter(element => element.number < 8))
    }

}

(function drawFrame() {
    window.requestAnimationFrame(drawFrame)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#155843';
    ctx.fillRect(globalRadius, globalRadius, canvas.width - globalRadius * 2, canvas.height - globalRadius * 2)
    //adicionar linha
    ctx.moveTo(canvas.width * 0.25, 0)
    ctx.lineTo(canvas.width * 0.25, canvas.height);
    ctx.stroke();
    //adicionar buracos
    drawHoles()

    //verifica se entram nos buracos
    ballArray.forEach(element => ((element.vx !== 0 || element.vy !== 0) && !element.hidden) && checkHoleCollision(element))

    ballArray.forEach((element, index) => {
        if (!element.hidden) {
            ballsMoving = 0
            if (element.vx !== 0 || element.vy !== 0) ballsMoving = 1

            for (let j = index + 1; j < ballArray.length; j++) {
                let obj = ballArray[j]
                !obj.hidden && checkCollision(element, obj)
            }
        }
        element.move()
    });

    ballsMoving = 0 && gameRules()
})();



function drawHoles() {
    positionArray.push({ x: 0 + globalRadius, y: 0 + globalRadius })
    positionArray.push({ x: canvas.width / 2, y: 0 + globalRadius })
    positionArray.push({ x: canvas.width - globalRadius, y: 0 + globalRadius })
    positionArray.push({ x: 0 + globalRadius, y: canvas.height - globalRadius })
    positionArray.push({ x: canvas.width / 2, y: canvas.height - globalRadius })
    positionArray.push({ x: canvas.width - globalRadius, y: canvas.height - globalRadius })

    positionArray.forEach(element => {
        ctx.beginPath();
        ctx.arc(element.x, element.y, globalRadius, 0, (Math.PI * 2), false);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    })
}




