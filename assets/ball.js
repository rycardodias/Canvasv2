function Ball(x, y, color, number) {
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.ax = 0; this.ay = 0;
    this.radius = globalRadius;
    this.color = color;
    this.number = number

    this.calculateHallColision = () => {
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= bounceForce
        } else if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.vx *= bounceForce
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= bounceForce
        } else if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy *= bounceForce
        }
    }

    this.calculateFriction = () => {
        if (Math.abs(this.vx) > 0.001) {
            this.vx *= frictionForce
        }
        if (Math.abs(this.vy) > 0.001) {
            this.vy *= frictionForce
        }
    }

    this.move = () => {
        this.calculateHallColision()

        this.calculateFriction()

        this.x += this.vx;
        this.y += this.vy;


        this.draw();
    }

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), false);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${this.radius}px Arial`;
        ctx.fillText(this.number, this.x, this.y);
        
        if (this.number > 8) {
            ctx.moveTo(this.x - this.radius, this.y)
            ctx.lineTo(this.x + this.radius, this.y);
            ctx.stroke();
        }

    };

}