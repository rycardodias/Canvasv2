function refreshInterface() {
    //UPPER PANEL
    document.getElementById("player1").style.color = player1Playing ? "red" : "black";
    document.getElementById("player2").style.color = !player1Playing ? "red" : "black";

    document.getElementById("player1").innerText = `${player1BallGroup === 0 ? "(S)" : "(B)"} Player 1 `
    document.getElementById("player2").innerText = ` Player 2 ${player1BallGroup === 0 ? "(B)" : "(S)"}`

    if (winner !== 0) {
        document.getElementById("player1").remove()
        document.getElementById("player2").remove()
        document.getElementById("winner").innerText = `Congratulations, Player ${winner}!`
    }

    //BOTTOM PANEL

    document.getElementById("bounceForce").innerText = `Bounce Force:`
    bounceForce = document.getElementById("bounceForceInput").value

    document.getElementById("frictionForce").innerText = `Friction Force:`
    frictionForce = document.getElementById("frictionForceInput").value




}