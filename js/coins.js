class Coin {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 14;
    this.height = 41;
    this.vx = -3

    this.img = new Image();
    this.img.src = "/img/token/fireball.png";
    this.img.xFrames = 60;
    this.img.yFrames = 1;
    this.img.yFrameIndex = 0;
    this.img.xFrameIndex = 0;
    this.tick = 0;
    
}

draw() {
  this.ctx.drawImage(
    this.img,
    this.img.width / 60 * this.img.xFrameIndex,
    0,
    this.img.width / 60,
    this.img.height,
    this.x,
    this.y,
    this.width,
    this.height)
  this.animate()
}

move() {
    this.x += this.vx

    if (this.x + this.w <= 0) {
      this.x = 0
    }
}

animate() {
  this.tick++
  this.img.xFrameIndex++
  if(this.img.xFrameIndex >= 60){
    this.img.xFrameIndex = 0;
  }
}

collide(player) {
    const collideX = player.x + 70 >= this.x && player.x + 34 <= this.x + this.width;
    const collideY = player.y <= this.y + this.height && player.y + player.height >= this.y;
    return collideX && collideY;
  }
}