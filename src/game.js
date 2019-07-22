import Bird from './bird';
import Level from './level';

export default class TweetyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.currentScore = 0;

    this.frame = 0
    this.frames = 0;

    this.restart();
    this.clickListener();
  }

  gameOver() {
    if (this.level.gameOver(this.bird.getBounds())){
      this.running = false;
      this.currentScore = 0;
      return true;
    } else {
      return false;
    }
  }

  // test this 
  drawGameOver(){
    ctx.font = '58px Bungee Shade';
    ctx.fillText("Game Over", this.dimensions.width / 2 - 20, 100);
  }

  click() {
    this.bird.flap(); 
  }

  clickListener() {
    this.ctx.canvas.addEventListener("mousedown", this.click.bind(this));
  }

  draw(){
    this.level.drawBackground(this.ctx);
    this.level.drawPipes(this.ctx);
    this.bird.drawBird(this.ctx, this.frame);
    this.drawScore(this.ctx, this.currentScore);
  }

  drawScore(ctx, score) {
    ctx.font = '58px Bungee Shade';
    ctx.fillText(score, this.dimensions.width/2 - 20, 100);
  }

  update(){
    this.level.movePipes();
    this.birdUpdate();
    this.scoreUpdate();
  }

  birdUpdate() {
    this.frame += this.frames % 5 === 0 ? 1 : 0;
    this.frame = this.frame % this.bird.animation.length;

    this.bird.move();
  }

  scoreUpdate() {
    let birdPos = this.bird.getBounds()[0][0];
    let firstPipe = this.level.pipes[0]["pos"];
    if(birdPos === firstPipe ){
      this.currentScore++;
    }
  }

  loop(){
    if(!this.gameOver()){
      this.update();
      this.draw();
      this.frames++;
      requestAnimationFrame(this.loop.bind(this));
    } 
  }

  restart() {
    this.running = false;

    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);
    this.loop();
  }

}