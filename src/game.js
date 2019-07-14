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
    // return this.level.collide(this.bird)
  }

  click() {
    // if the game hasn't started yet, play
    if (!this.running) {
      this.play(); 
    }
    
    this.bird.flap();
  }

  clickListener() {
    this.ctx.canvas.addEventListener("mousedown", this.click.bind(this));
  }

  animate() {
    this.level.animate(this.ctx);
    this.bird.animate(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  
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