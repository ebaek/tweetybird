
const CONSTANTS = {
    BIRD_WIDTH: 50,
    BIRD_HEIGHT: 20,
    GRAVITY: 0.05,
    FLAP_VELOCITY: 8,
    MAX_VEL: 12
};

export default class Bird {
    constructor(dimensions) {
        
        this.dimensions = dimensions;
        this.pos_x = this.dimensions.width / 3;
        this.pos_y = this.dimensions.height / 2;
        this.velocity = 0;
    }

    drawBird(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    animate(ctx) {
        this.move();
        this.drawBird(ctx);
    }

    move() {
        // position of bird increases by current velocity
        this.pos_y += this.velocity;

        // increment velocity by gravity
        this.velocity += CONSTANTS.GRAVITY;

        // if bird moves too fast, reset velocity to the max
        if (this.velocity > CONSTANTS.MAX_VEL) this.velocity = CONSTANTS.MAX_VEL;

    }

    flap() {
        this.velocity = -1 * CONSTANTS.FLAP_VELOCITY;
    }
}


