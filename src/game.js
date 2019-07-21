import Bird from './bird';
import Level from './level';

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.currentScore = 0;
    this.frame = 0
    this.frames = 0;
    this.clickListener();
    this.restart();
    
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
    // if the game hasn't started yet or isn't over, play
    if (!this.running || !this.level.gameOver(this.bird.getBounds())) {
      this.loop();
      
    }
    this.bird.flap(); 
  }

  clickListener() {
    this.ctx.canvas.addEventListener("mousedown", this.click.bind(this));
  }

  // animate() {
  //   if (!this.gameOver()){
      
  //     this.level.animate(this.ctx);
  //     this.bird.animate(this.ctx);
  //     this.printScore(this.ctx);
  //     requestAnimationFrame(this.animate.bind(this));

  //   } else {
  //     // alert("game over!")
  //   }
  // }

  draw(){
    this.level.drawBackground(this.ctx);
    this.level.drawPipes(this.ctx);
    debugger
    this.bird.drawBird(this.ctx, this.frame);
  }

  update(){
    this.level.movePipes();
    this.bird.update(this.frame, this.frames);
  }

  loop(){
    this.update();
    this.draw();
    this.frames++;
    requestAnimationFrame(this.loop.bind(this));
  }

  restart() {
    this.running = false;

    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);
    // this.animate();
    this.loop();
  }

  printScore(ctx){
    ctx.font = '48px serif';
    ctx.fillText(`${this.currentScore}`, 10, 50);
  }

  // play() {
  //   this.running = true;
  //   // this.animate();
  //   this.loop();

  //   if(this.level.pastPipe(this.bird.getBounds())) {
  //     this.currentScore++;
  //   }
  }


}