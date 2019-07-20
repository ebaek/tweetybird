const CONSTANTS = {
  DISTANCE: 220,
  GAP: 150,
  PIPE_WIDTH: 80,
  PLAYABLE: 640,
  CANVAS_WIDTH: 480,
  MIN_HEIGHT: 50,
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

  }

  drawPipe(ctx, x) {
    ctx.fillStyle = "green";
    const firstPipeHeight = this.setPipeHeight();
    ctx.fillRect(x, 0, CONSTANTS.PIPE_WIDTH, firstPipeHeight);
    
    // ctx.fillStyle = "green";
    const secondPipePosition = 150 + firstPipeHeight;
    ctx.fillRect(x, secondPipePosition, CONSTANTS.PIPE_WIDTH, CONSTANTS.PLAYABLE - secondPipePosition);
    debugger
  }

  generateRandPos() {
    return Math.random(0,1) * CONSTANTS.CANVAS_WIDTH;
  } 

  setPipeHeight(){
    let height = Math.random(0,1) * CONSTANTS.PLAYABLE;

    if(height < CONSTANTS.MIN_HEIGHT) {
      height = CONSTANTS.MIN_HEIGHT;
    } else if(height > (CONSTANTS.PLAYABLE - CONSTANTS.MIN_HEIGHT - CONSTANTS.GAP)){
      height = CONSTANTS.PLAYABLE - CONSTANTS.MIN_HEIGHT - CONSTANTS.GAP;
    } 

    return height;
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx) {
    this.drawBackground(ctx);
    debugger
    this.drawPipe(ctx, this.generateRandPos());
  }

  collide(bird) {

    //check if bird is in frame
    if (bird.pos_y > this.dimensions.height || bird.pos_y < 0) {
      return false;
    } else {
      return true;
    }

  }
}