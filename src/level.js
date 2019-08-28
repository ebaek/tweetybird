const CONSTANTS = {
  DISTANCE: 220,
  GAP: 175,
  PIPE_WIDTH: 80,
  PIPE_HEIGHT: 400,
  PLAYABLE: 550,
  MIN_PIPE_HEIGHT: 120,
  PIPE_BETWEEN_DIST: 220,
  PIPE_SPEED: 2.5,
  INITIAL_PIPE_POS: 700,
  BASE_HEIGHT: 100,
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;

    // set the initial distance between pipes
    let firstPipePos = CONSTANTS.INITIAL_PIPE_POS;
    let secondPipePos = firstPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;
    let thirdPipePos = secondPipePos + CONSTANTS.PIPE_WIDTH + CONSTANTS.PIPE_BETWEEN_DIST;

    // set of pipes
    this.pipes = [{pos: firstPipePos, height: this.setPipeHeight()}, 
      {pos: secondPipePos, height: this.setPipeHeight()}, 
      {pos: thirdPipePos, height: this.setPipeHeight()}]
    
    // set of base 
    this.bases = [0, this.dimensions.width, this.dimensions.width * 2];
  }

  drawPipePair(ctx, pipePos, height) {    
    const pipe1 = new Image();
    pipe1.src = "./images/pipe-green2.png";

    const pipe2 = new Image();
    pipe2.src = "./images/pipe-green1.png";

    ctx.drawImage(pipe1, pipePos, height - CONSTANTS.PIPE_HEIGHT, CONSTANTS.PIPE_WIDTH, CONSTANTS.PIPE_HEIGHT);
    
    //draw bottom pipe
    const secondPipePosition = height + CONSTANTS.GAP;

    ctx.drawImage(pipe2, pipePos, secondPipePosition, CONSTANTS.PIPE_WIDTH, CONSTANTS.PIPE_HEIGHT);
  }

  drawPipes(ctx){
    this.pipes.forEach( (pipe) => {
        this.drawPipePair(ctx, pipe["pos"], pipe["height"]);
    })
  }

  movePipes(){
    this.pipes.forEach( (pipe) => {
      pipe["pos"] -= CONSTANTS.PIPE_SPEED;

      //rotate pipe once moves off the screen
      if( pipe["pos"] + CONSTANTS.PIPE_WIDTH === 0) {
        this.pipes.shift();
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

    // generate for playable - gap instead of below
    if(height < CONSTANTS.MIN_PIPE_HEIGHT) {
      height = CONSTANTS.MIN_PIPE_HEIGHT;
    } else if(height > (CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP)){
      height = CONSTANTS.PLAYABLE - CONSTANTS.MIN_PIPE_HEIGHT - CONSTANTS.GAP;
    } 

    return height;
  }

  moveBases() {
    for(let i = 0; i < this.bases.length; i++) {
      this.bases[i] -= CONSTANTS.PIPE_SPEED;

      if(this.bases[i] + this.dimensions.width === 0) {
        this.bases.shift();
        this.bases.push(this.bases[this.bases.length - 1] + this.dimensions.width);
      }
    }
  }

  drawBases(ctx) {
    const base = new Image();
    base.src = "./images/base.png"

    this.bases.forEach( (basePos) => {
      ctx.drawImage(base, basePos, this.dimensions.height, this.dimensions.width, CONSTANTS.BASE_HEIGHT);
    })
  }

  drawBackground(ctx) {
    const background = new Image();
    background.src = "./images/background-night.png";
    
    ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);
  }

  collideWith(birdBounds) {
    for(let i = 0; i < this.pipes.length; i++) {
      if(this.collideWithPipe(birdBounds, i)) return true;
    }
    return false;
  }

  collideWithPipe(birdBounds, i) {
    const birdTopRight = birdBounds[0];
    const birdBottomRight = birdBounds[1];

    const topPipeHeightBounds = [0, this.pipes[i]["height"]];
    const pipeWidthBounds = [this.pipes[i]["pos"], this.pipes[i]["pos"] + CONSTANTS.PIPE_WIDTH];
    const bottomHeightBounds = [this.pipes[i]["height"] + CONSTANTS.GAP, this.dimensions.height];


    //NOTE: FIX THE BOUNDS
    if (this.between(birdTopRight[0], pipeWidthBounds) && this.between(birdBottomRight[0], pipeWidthBounds)) {
      if (birdTopRight[1] <= topPipeHeightBounds[1] || birdBottomRight[1] >= bottomHeightBounds[0]) {
        // if(this.between(birdTopRight[1], topPipeHeightBounds) || this.between(birdBottomRight[1], bottomHeightBounds)) {
        return true;
      }
    }

    return false;
  }

  between(pos, bounds){
    return pos >= bounds[0] && pos <= bounds[1];
  }

  pastPipe(birdBounds) {
    const birdXCoord = birdBounds[0][0];

    if(!this.collideWithPipe(birdBounds, 0) && birdXCoord > this.pipes[0]["pos"]) {
      return true; 
    } else {
      return false;
    }
  }

  gameOver(birdBounds) {
    const birdTopRight = birdBounds[0];
    const birdBottomMid = birdBounds[1];

    if (this.collideWith(birdBounds) || birdTopRight[1] <= 0 || birdBottomMid[1] >= this.dimensions.height) {
      return true;
    } else {
      return false;
    }
  }
}