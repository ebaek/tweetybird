import Bird from './bird';
import Level from './level';

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.clickListener();
    this.restart();
  }

  gameOver() {
    if (this.level.gameOver(this.bird.getBounds())){
      this.running = false;
      return true;
    } else {
      return false;
    }
  }

  click() {
    // if the game hasn't started yet or isn't over, play
    if (!this.running) {
      this.play(); 
    }
    this.bird.flap();
  }

  clickListener() {
    this.ctx.canvas.addEventListener("mousedown", this.click.bind(this));
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  animate() {
    if (!this.gameOver()){
      this.level.animate(this.ctx);
      this.bird.animate(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    } else {
      // alert("game over!")
    }
    
  }

  restart() {
    this.running = false;

    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);

    this.animate();
  }

  play() {
    this.running = true;
    this.animate();
  }
}