class Healthbar {
  constructor(ctx, player) {
    this.ctx = ctx;
    this.player = player;
  }

  draw() {
    if (this.player.health >= 6) {
      this.ctx.fillStyle = "green";
    } else if(this.player.health >= 3) {
      this.ctx.fillStyle = "orange";
    } else {
      this.ctx.fillStyle = "red"
    }
    this.ctx.fillRect (
      50,
      30,
      this.player.health * 20,
      10
    )
    this.ctx.strokeRect (
      50,
      30,
      20*20,
      10
    )
  }
}

class CoinsGUI {
  constructor (ctx, game) {
    this.ctx = ctx;
    this.game = game;

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
      1020,
      20,
      14,
      41)
    this.animate()

    this.ctx.font = "30px Minecraft";
    this.ctx.fillStyle = "#4D514C";
    this.ctx.textAlign = "right";
    this.ctx.fillText(`${this.game.coinCount} / 30`,
      1000,
      48);
  }

  animate() {
    this.tick++
    this.img.xFrameIndex++
    if(this.img.xFrameIndex >= 60){
      this.img.xFrameIndex = 0;
    }
  }
}