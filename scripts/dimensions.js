let scale = 1
let initialWidth = window.innerWidth

canvas.width = window.innerWidth * .8
canvas.height = canvas.width * .5

let globalRadius = canvas.width * .025;

window.addEventListener('resize', () => {
    //calculo nova escala da janela
    scale = window.innerWidth / initialWidth
    initialWidth = window.innerWidth

    canvas.width *= scale
    canvas.height *= scale
    globalRadius *= scale
})