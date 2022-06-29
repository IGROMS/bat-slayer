class Bat {
	constructor(ctx, x, y, player) {
		this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.player = player;
		this.health = 2;
    this.strength = 1;

    this.img = new Image();
    this.img.src = "/img/Bat/bat_sprite.png";
    this.img.xFrames = 7;
    this.img.yFrames = 4;
    this.img.yFrameIndex = 0;
    this.img.xFrameIndex = 0;
    this.tick = 0;

    this.width = this.img.width / 7;
    this.height = this.img.height / 4;
	}
	attack(){
    return this.strength
  }
  receiveDamage(damage){
    this.health =- damage;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.width / 7 * this.img.xFrameIndex,
      this.img.height / 4 * this.img.yFrameIndex,
      this.img.width / 7,
      this.img.height / 4,
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

    if (this.x - this.player.x >= 50){
      this.img.yFrameIndex = 0
      this.img.xFrameIndex ++
    } /* else {
      if (!this.isFloor()) {
        this.img.xFrameIndex = 1
      }

      if (this.tick >= 12 && this.img.yFrameIndex !== 4) {
        this.tick = 0
        this.img.yFrameIndex++
      }
      if (this.img.yFrameIndex >= this.img.maxY) {
        this.img.yFrameIndex = 0;
      }
    } */ 

    /* if (this.actions.right && this.isFloor()) {
      if (this.img.yFrameIndex >= 7){
        this.img.yFrameIndex = 0;
      }
      if (this.tick >= 8) {
        this.tick = 0
        this.img.yFrameIndex++
      }
    } */
  }

  collide(player) {
    const collideX = player.x + 70 >= this.x && player.x + 34 <= this.x + this.width;
    const collideY = player.y <= this.y + this.height && player.y + player.height >= this.y;
    return collideX && collideY;
  }

}