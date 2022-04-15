function Ball(x, y, color, number) {
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.ax = 0; this.ay = 0;
    this.radius = globalRadius;
    this.color = color;
    this.number = number

    this.hidden = false

    this.calculateHallColision = () => {
        if (this.x - this.radius < 0 + this.radius) {
            this.x = this.radius + this.radius;
            this.vx *= bounceForce
        } else if (this.x + this.radius > canvas.width - this.radius) {
            this.x = canvas.width - this.radius - this.radius;
            this.vx *= bounceForce
        }
        if (this.y - this.radius < 0 + this.radius) {
            this.y = this.radius + this.radius;
            this.vy *= bounceForce
        } else if (this.y + this.radius > canvas.height - this.radius) {
            this.y = canvas.height - this.radius - this.radius;
            this.vy *= bounceForce
        }
    }

    this.calculateFriction = () => {
        if (Math.abs(this.vx) > 0.2) {
            this.vx *= frictionForce
        } else {
            this.vx = 0;
        }
        if (Math.abs(this.vy) > 0.2) {
            this.vy *= frictionForce
        } else {
            this.vy = 0;
        }
    }

    this.move = () => {
        this.calculateFriction()
        this.calculateHallColision()

        this.x += this.vx;
        this.y += this.vy;

        this.draw();
    }

    this.draw = () => {
        if (this.hidden) return
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), false);
        ctx.closePath();
        ctx.fillStyle = this.hidden ? "#155843": color;
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