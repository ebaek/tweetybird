const CONSTANTS = {
  DISTANCE: 220,
  GAP: 150,
  PIPE_WIDTH: 80,
  PLAYABLE: 640,
  CANVAS_WIDTH: 480,
  MIN_PIPE_HEIGHT: 50,
  PIPE_BETWEEN_DIST: 220,
  PIPE_SPEED: 2,
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    // set the initial distance between pipes
    let firstPipePos = 0;
    let secondPipePos = firstPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;
    let thirdPipePos = secondPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;

    // set of pipes
    this.pipes = [{pos: firstPipePos, height: this.setPipeHeight()}, 
      {pos: secondPipePos, height: this.setPipeHeight()}, 
      {pos: thirdPipePos, height: this.setPipeHeight()}]
  }

  drawPipePair(ctx, pipePos, height) {
    ctx.fillStyle = "green";
    
    //draw top pipe
    ctx.fillRect(pipePos, 0, CONSTANTS.PIPE_WIDTH, height);
    
    //draw bottom pipe
    const secondPipePosition = CONSTANTS.GAP + height;
    ctx.fillRect(pipePos, secondPipePosition, CONSTANTS.PIPE_WIDTH, CONSTANTS.PLAYABLE - secondPipePosition);
  }

  drawPipes(ctx){
    debugger
    this.pipes.forEach( (pipe) => {
        this.drawPipePair(ctx, pipe["pos"], pipe["height"]);
    })
  }

  movePipes(){
    this.pipes.forEach( (pipe) => {
      pipe["pos"] -= CONSTANTS.PIPE_SPEED;
      if(pipe["pos"] === 0) {
        this.pipes.unshift();
        this.generatePipe();
      }
    })
  }

  generatePipe(){
    const lastPipe = this.pipes[this.pipes.length - 1];
    const newPipePos = lastPipe["pos"] + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;
    const newPipeHeight = this.setPipeHeight();
    this.pipes.push({pos: newPipePos, height: newPipeHeight});
  }

  setPipeHeight(){
    let height = Math.random(0,1) * CONSTANTS.PLAYABLE;

    if(height < CONSTANTS.MIN_PIPE_HEIGHT) {
      height = CONSTANTS.MIN_PIPE_HEIGHT;
    } else if(height > (CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP)){
      height = CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP;
    } 

    return height;
  }

  drawBackground(ctx) {
    // ctx.fillStyle = "skyblue";

    // const background = new Image();
    // background.src = "./images/background-night.png";
    ctx.drawImage(background,0,0);
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx) {
    this.drawBackground(ctx);
    this.drawPipes(ctx);
    this.movePipes();
    debugger
  }

  collideWith(bird) {

  }
}