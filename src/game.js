import Bird from './bird';
import Level from './level';


export default class TweetyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };

    this.currentScore = 0;

    this.frame = 0
    this.frames = 0;

    this.restartButton = { x: 200, y: 250, width: 90, height: 50 }

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
    debugger
    this.ctx.canvas.addEventListener('click', (evt) => {
      const mousePos = this.getMousePos(evt);

      if (this.isInside(mousePos, this.restartButton) && this.gameOver()) {
        this.restart();
      } else {
        this.click();
      }
    }, false);

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

    //update the score when the bird flies a bit past the start of the pipe
    let firstPipeEnd = this.level.pipes[0]["pos"] + 40;
    if(birdPos === firstPipeEnd ){
      this.currentScore++;
    }
  }

  loop(){
    if(!this.gameOver()){
      this.update();
      this.draw();
      this.frames++;
    } else {
      this.drawGameOver();
    }
    requestAnimationFrame(this.loop.bind(this));
  }

  // test this 
  drawGameOver() {
    //white background, blue border box
    this.ctx.strokeStyle = "#71C5CF";
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 10;
    this.ctx.rect(37, 50, this.dimensions.width - 60, this.dimensions.height/2 - 50);
    this.ctx.stroke();
    this.ctx.fill();

    //game over
    this.ctx.font = '58px Bungee Shade';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Game Over", 45, 175);

    //restart button
    const restartButton = new Image();
    restartButton.src = "./images/button.png"
    this.ctx.drawImage(restartButton, this.restartButton["x"], this.restartButton["y"], this.restartButton["width"], this.restartButton["height"]);
  }

  restart() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.running = true;
    this.currentScore = 0;

    debugger
    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);
  }

}