
const CONSTANTS = {
    BIRD_WIDTH: 100,
    BIRD_HEIGHT: 75,
    GRAVITY: 0.3,
    FLAP_VELOCITY: -8,
    TERMINAL_VEL: 12,
    SPRITE_WIDTH: 929,
    SPRITE_HEIGHT: 635,
};

export default class Bird {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.pos_x = this.dimensions.width / 3;
        this.pos_y = this.dimensions.height / 2;
        this.velocity = 0;

        // const downFlap = new Image();
        // downFlap.src = "./images/bluebird-downflap.png";
        
        // const midFlap = new Image();
        // midFlap.src = "./images/bluebird-midflap.png";

        // const upFlap = new Image();
        // upFlap.src = "./images/bluebird-upflap.png";

        // this.birdAnimation = [upFlap, midFlap, downFlap, midFlap];

        this.sprite = new Image();
        this.sprite.src = "./images/bird.png";

        this.animation = [{ sX: 0, sY: 635 }, { sX: 929, sY: 635 }, { sX: 1858, sY: 635},
            { sX: 0, sY: 1270 }, { sX: 929, sY: 1270 }, { sX: 1858, sY: 1270},
            { sX: 0, sY: 1905 }, { sX: 929, sY: 1905}];        
    }

    // drawBird(ctx, birdImg) {
    //     ctx.save();
    //     ctx.drawImage(birdImg, this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    //     ctx.restore();
    // }

    drawBird(ctx, frame){
        let bird = this.animation[frame];
        ctx.drawImage(this.sprite, bird["sX"], bird["sY"], CONSTANTS.SPRITE_WIDTH, CONSTANTS.SPRITE_HEIGHT, this.pos_x, this.pos_y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    animate(ctx, frame) {
        // this.frame += frame % 5 === 0 ? 1 : 0;

        // this.drawBird(ctx, frame);
        // const pastFlap = this.birdAnimation.shift()
        // this.birdAnimation.push(pastFlap);
        // this.move();
    }

    update(frame, frames) {
        frame += frames % 5 === 0 ? 1 : 0;
        frame = frame % this.animation.length;

        this.move();
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
        const topRight = [this.pos_x + CONSTANTS.BIRD_WIDTH - 5, this.pos_y + 2];
        const bottomMid = [this.pos_x + CONSTANTS.BIRD_WIDTH, this.pos_y + CONSTANTS.BIRD_HEIGHT - 2];

        return [topRight, bottomMid];
    }
}


