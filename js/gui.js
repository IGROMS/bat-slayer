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
  }
}