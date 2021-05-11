function Ball(radius, color, x, y, velocityX, velocityY) {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = velocityX;
    this.dy = velocityY;

    this.handleCollisionWithWall = (canvas) => {
        if ((this.x + this.radius >= canvas.width) || (this.x - this.radius <= 0)) {
            this.dx = -this.dx;
        }

        if ((this.y + this.radius >= canvas.height) || (this.y - this.radius <= 0)) {
            this.dy = -this.dy;
        }
    };

    this.handleCollisionWithAnotherBall = (anotherBall) => {
        let distance_square = (this.x - anotherBall.x) ** 2 + (this.y - anotherBall.y) ** 2;
        if (Math.sqrt(distance_square) <= this.radius + anotherBall.radius) {
            //assume mass is proportional to radius
            let new_dx1 = (this.dx * (this.radius - anotherBall.radius) + (2 * anotherBall.radius * anotherBall.dx)) / (this.radius + anotherBall.radius);
            let new_dy1 = (this.dy * (this.radius - anotherBall.radius) + (2 * anotherBall.radius * anotherBall.dy)) / (this.radius + anotherBall.radius);

            let new_dx2 = (anotherBall.dx * (anotherBall.radius - this.radius) + (2 * this.radius * this.dx)) / (anotherBall.radius + this.radius);
            let new_dy2 = (anotherBall.dy * (anotherBall.radius - this.radius) + (2 * this.radius * this.dy)) / (anotherBall.radius + this.radius);
            this.dx = new_dx1;
            this.dy = new_dy1;
            anotherBall.dx = new_dx2;
            anotherBall.dy = new_dy2;
        };
    };

    this.update = () => {
        this.x = this.x - this.dx;
        this.y = this.y - this.dy;
    };

    this.draw = ctx => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    };
}

export default Ball;