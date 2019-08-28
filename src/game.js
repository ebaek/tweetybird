import Bird from './bird';
import Level from './level';

const CONSTANTS = {
  RST_WIDTH: 90,
  RST_HEIGHT: 50,
}


export default class TweetyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height - 100 };

    this.currentScore = 0;

    this.frame = 0
    this.frames = 0;

    this.initialGame = true;

    this.restartButton = { x: this.dimensions["width"]/2 - CONSTANTS.RST_WIDTH/2, y: this.dimensions.height * (0.43), width: CONSTANTS.RST_WIDTH, height: CONSTANTS.RST_HEIGHT }
    this.canvas = canvas;

    this.restart();
    this.clickListener();
  }

  gameOver() {
    return this.level.gameOver(this.bird.getBounds()) ? true : false;
  }

  click() {
    this.bird.flap(); 
  }

  getMousePos(event) {
    var rect = this.ctx.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
  }

  clickListener() {
    this.ctx.canvas.addEventListener('click', (evt) => {
      const mousePos = this.getMousePos(evt);

      if (this.isInside(mousePos, this.restartButton) && this.gameOver()) {
        this.restart();
      } else {
        if (this.initialGame === true) this.initialGame = false;
        this.click();
      }
    }, false);
  }

  draw(){
    this.level.drawPipes(this.ctx);
    this.bird.drawBird(this.ctx, this.frame);
    this.level.drawBases(this.ctx);
    this.drawScore(this.ctx, this.currentScore);
  }

  drawScore(ctx, score) {
    ctx.font = '58px Bungee Shade';
    ctx.fillText(score, this.dimensions.width/2 - 20, 100);
  }

  update(){
    this.level.movePipes();
    this.level.moveBases();
    this.birdUpdate();
    this.bird.move();
    this.scoreUpdate();
  }

  birdUpdate() {
    this.frame += this.frames % 5 === 0 ? 1 : 0;
    this.frame = this.frame % this.bird.animation.length;
  }

  scoreUpdate() {
    let birdPos = this.bird.getBounds()[0][0];

    //update the score when the bird flies a bit past the start of the pipe
    let firstPipeEnd = this.level.pipes[0]["pos"] + 40;
    if(birdPos === firstPipeEnd ){
      this.currentScore++;
    }
  }

  loop(){
    // draw background 
    this.level.drawBackground(this.ctx);

    if(!this.gameOver()){
      if (!this.initialGame){
        this.update();
        this.draw();
      } else {
        this.initialGameLoop();
      }
      this.frames++;
    } else {
      this.level.moveBases();
      this.level.drawBases(this.ctx);
      this.drawGameOver();
    } 
    this.animation = requestAnimationFrame(this.loop.bind(this));
  }

  initialGameLoop(){
    this.drawScore(this.ctx, this.currentScore);
    this.bird.drawBird(this.ctx, this.frame);

    this.level.moveBases();
    this.level.drawBases(this.ctx);

    this.birdUpdate();
  }

  drawGameOver() {
    //white background, blue border box
    this.ctx.strokeStyle = "#71C5CF";
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 10;
    this.ctx.rect(37, 70, this.dimensions.width - 60, this.dimensions.height/2 - 50);
    this.ctx.stroke();
    this.ctx.fill();


    this.ctx.moveTo(this.dimensions.width / 2, 20);
    this.ctx.textAlign = "center";

    //game over
    this.ctx.font = '58px Bungee Shade';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Game Over", this.dimensions.width / 2, 120);


    //restart button
    const restartButton = new Image();
    restartButton.src = "./images/button.png";
    this.ctx.drawImage(restartButton, this.restartButton["x"], this.restartButton["y"], this.restartButton["width"], this.restartButton["height"]);

    //draw final score
    this.ctx.font = '58px Bungee Shade';
    
    // this.ctx.fillText(this.currentScore, this.dimensions.width / 2 - 20, 200);
    this.ctx.fillText(this.currentScore, this.dimensions.width/2, 200);
  }

  restart() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    // this.running = true;

    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);

    cancelAnimationFrame(this.animation)
    this.currentScore = 0;

    this.loop();
  }

}