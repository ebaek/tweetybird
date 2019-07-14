export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx) {
    this.drawBackground(ctx);
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