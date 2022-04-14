const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .9
canvas.height = canvas.width * .5

// variaveis de tamanhos
let globalRadius = canvas.width * .025;
const bounceForce = -0.7;
const frictionForce =  0.985 // percentage

window.addEventListener('mousedown', mouse => {
    ballArray[0].move()
    ballArray[1].move()
})

let ballArray = []
//declarar bolas
ballArray.push(new Ball(100, 100, 'red'));
ballArray.push(new Ball(300, 100, 'blue'));
ballArray.push(new Ball(400, 100, 'yellow'));
ballArray[0].vx = 10
ballArray[0].vy = 10
ballArray[1].vx = 15


function calculateBallColision(ball0, ball1) {
    let dx = ball1.x - ball0.x,
        dy = ball1.y - ball0.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < ball0.radius + ball0.radius) {
        var angle = Math.atan2(dy, dx),
            sin = Math.sin(angle),
            cos = Math.cos(angle),
            //rotate ball0's velocity
            vx0 = ball0.vx * cos + ball0.vy * sin,
            vy0 = ball0.vy * cos - ball0.vx * sin,
            //rotate ball1's velocity
            vx1 = ball1.vx * cos + ball1.vy * sin,
            vy1 = ball1.vy * cos - ball1.vx * sin,
            //collision reaction
            vxTotal = vx0 - vx1;

        vx0 = (vx0 + 2 * vx1);
        vx1 = vxTotal + vx0;

        ball0.vx = vx0 * cos - vy0 * sin;
        ball0.vy = vy0 * cos + vx0 * sin;
        ball1.vx = vx1 * cos - vy1 * sin;
        ball1.vy = vy1 * cos + vx1 * sin;
    }
}

(function drawFrame() {
    window.requestAnimationFrame(drawFrame)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ballArray.forEach((element, index) => {
        for (let j = index + 1; j < ballArray.length; j++) {
            let obj = ballArray[j]
            calculateBallColision(element, obj)
        }
        element.move()
    });

})();

