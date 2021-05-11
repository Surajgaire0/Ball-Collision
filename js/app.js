import Ball from './ball.mjs';

let canvas, ctx, ballArr = [], N = 10;
let colors = ['red', 'green', 'yellow', 'blue'];

//random number generator, both inclusive
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let points = [
    { x: 60, y: 58 },
    { x: 180, y: 80 },
    { x: 185, y: 190 },
    { x: 540, y: 60 },
    { x: 300, y: 60 },
    { x: 300, y: 180 },
    { x: 420, y: 180 },
    { x: 60, y: 320 },
    { x: 180, y: 320 },
    { x: 500, y: 268 }
];

//it is once run when content is loaded
let start = () => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    let color, velocityX, velocityY, radius, ball_instance;
    for (let i = 0; i < N; i++) {
        color = colors[getRandom(0, colors.length - 1)];
        velocityX = getRandom(-3, 3);
        velocityY = getRandom(-3, 3);
        radius = getRandom(5, 40);

        ball_instance = new Ball(radius, color, points[i].x, points[i].y, velocityX, velocityY);
        ballArr.push(ball_instance);
    }

    loop();
}

//update function
let update = () => {
    ballArr.forEach(ball => {
        ball.update();
        ball.handleCollisionWithWall(canvas);
    })

    for (let i = 0; i < ballArr.length; i++) {
        for (let j = i + 1; j < ballArr.length; j++) {
            ballArr[i].handleCollisionWithAnotherBall(ballArr[j]);
        }
    }
}

//draw function
let draw = () => {
    ballArr.forEach(ball => {
        ball.draw(ctx);
    })
}

//loop
let loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(loop);
}

document.addEventListener('DOMContentLoaded', start);