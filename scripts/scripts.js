const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .9
canvas.height = canvas.width * .5

// variaveis de tamanhos
let globalRadius = canvas.width * .02;
const bounceForce = -0.7;
const frictionForce = 1 || 0.985 // percentage

window.addEventListener('mousedown', mouse => {
    ballArray[0].move()
    ballArray[1].move()
})

let ballArray = []
//declarar bolas
ballArray.push(new Ball(100, 100, 'red', 1));
ballArray.push(new Ball(300, 100, 'blue', 2));
ballArray.push(new Ball(400, 100, 'yellow', 3));
ballArray.push(new Ball(300, 500, 'pink', 4));


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

        // pos0.x += vel0.x;
        // pos1.x += vel1.x;
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

(function drawFrame() {
    window.requestAnimationFrame(drawFrame)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ballArray.forEach((element, index) => {
        for (let j = index + 1; j < ballArray.length; j++) {
            let obj = ballArray[j]
            checkCollision(element, obj)

        }
        element.move()
    });

})();

