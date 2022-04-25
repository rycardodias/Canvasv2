function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#155843';
    ctx.fillRect(globalRadius, globalRadius, canvas.width - globalRadius * 2, canvas.height - globalRadius * 2)
    //adicionar linha
    ctx.moveTo(canvas.width * 0.25, 0)
    ctx.lineTo(canvas.width * 0.25, canvas.height);
    ctx.stroke();

    drawHoles()
}


let positionArray = [];

function drawHoles() {
    positionArray = []
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