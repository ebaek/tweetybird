
const CONSTANTS = {
    BIRD_WIDTH: 50,
    BIRD_HEIGHT: 35,
    GRAVITY: 0.3,
    FLAP_VELOCITY: -8,
    TERMINAL_VEL: 12,
};

export default class Bird {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.pos_x = this.dimensions.width / 3;
        this.pos_y = this.dimensions.height / 2;
        this.velocity = 0;

        const downFlap = new Image();
        downFlap.src = "./images/bluebird-downflap.png";
        const midFlap = new Image();
        midFlap.src = "./images/bluebird-midflap.png";
        const upFlap = new Image();
        upFlap.src = "./images/bluebird-upflap.png";

        this.currentLoopIdx = 0;
        this.frameCount = 0;

        this.birdAnimation = [upFlap, midFlap, downFlap];
    }

    drawBird(ctx, birdImg) {
        ctx.drawImage(birdImg, this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    // animate(ctx) {
    //     this.drawBird(ctx, this.birdAnimation[0]);
        
    //     const pastFlap = this.birdAnimation.shift()
    //     this.birdAnimation.push(pastFlap);
    //     this.move();
    // }

    animate(ctx) {
        this.frameCount += 1;

        if(this.frameCount < 15) {
            ctx.requestAnimationFrame(animate(ctx));
            return;
        }

        this.frameCount = 0;
        ctx.clearFrame()
    }

    move() {
        // position of bird increases by current velocity
        this.pos_y += this.velocity;

        // increment velocity by gravity
        this.velocity += CONSTANTS.GRAVITY;

        // if bird moves too fast, reset velocity to the max
        if (this.velocity > CONSTANTS.TERMINAL_VEL) this.velocity = CONSTANTS.TERMINAL_VEL;

    }

    flap() {
        this.velocity = CONSTANTS.FLAP_VELOCITY;
    }

    getBounds() {
        const topLeft = [this.pos_x, this.pos_y];
        const bottomRight = [this.pos_x + CONSTANTS.BIRD_WIDTH, this.pos_y + CONSTANTS.BIRD_HEIGHT];

        return [topLeft, bottomRight];
    }
}


