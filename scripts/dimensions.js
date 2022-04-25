let scale = 1
let currentWidth = window.innerWidth

canvas.width = window.innerWidth * .8
canvas.height = canvas.width * .5

let globalRadius = canvas.width * .025;

window.addEventListener('resize', () => {
    //calculo nova escala da janela
    scale = window.innerWidth / currentWidth
    currentWidth = window.innerWidth

    canvas.width *= scale
    canvas.height *= scale
    globalRadius *= scale

    ballArray.forEach(element => {
        element.scale = scale
    })

    // drawTable()

})