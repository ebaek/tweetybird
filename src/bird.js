
const CONSTANTS = {
    BIRD_WIDTH: 100,
    BIRD_HEIGHT: 75,
    GRAVITY: 0.4,
    FLAP_VELOCITY: -6,
    TERMINAL_VEL: 12,
    SPRITE_WIDTH: 929,
    SPRITE_HEIGHT: 635,
};

export default class Bird {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.pos_x = this.dimensions.width * (0.25);
        this.pos_y = this.dimensions.height * (0.38);
        this.velocity = 0;

        this.birdSprite = new Image();
        this.birdSprite.src = "./images/bird.png";

        this.animation = [{ sX: 0, sY: 0 }, { sX: 929, sY: 0 }, { sX: 1858, sY: 0},
            { sX: 0, sY: 635 }, { sX: 929, sY: 635 }, { sX: 1858, sY: 635},
            { sX: 0, sY: 1270 }, { sX: 929, sY: 1270}];        
    }

    drawBird(ctx, frame){
        ctx.save();
        let bird = this.animation[frame];
        
        ctx.drawImage(this.birdSprite, bird["sX"], bird["sY"], CONSTANTS.SPRITE_WIDTH, CONSTANTS.SPRITE_HEIGHT, this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
        ctx.restore();
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
        //calibrate boundaries to irregular shape of bird
        const topRight = [this.pos_x + CONSTANTS.BIRD_WIDTH - 10, this.pos_y + 2];
        const bottomMid = [this.pos_x + CONSTANTS.BIRD_WIDTH - 10, this.pos_y + CONSTANTS.BIRD_HEIGHT - 15];

        return [topRight, bottomMid];
    }
}


