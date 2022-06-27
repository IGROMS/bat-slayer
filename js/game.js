class Game {
  constructor(ctx) {
    this.ctx =  ctx;
    //this.background = new Background(this.ctx);
    this.intervalId = null;
    this.player = new Player(this.ctx);
    this.tick = 0;
    this.backgroundBack = new BackgroundBack(this.ctx);
    this.background = new Background(this.ctx);
    this.platforms = [
      new Platform(this.ctx, 1002, 286, 129, 96),
      new Platform(this.ctx, 1395, 286, 160, 96),
      new Platform(this.ctx, 1647, 230, 254, 32),
      new Platform(this.ctx, 2096, 286, 62, 96),
      new Platform(this.ctx, 2245, 254, 254, 32),
      new Platform(this.ctx, 2451, 158, 96, 96),
      new Platform(this.ctx, 2658, 288, 32, 94),
      new Platform(this.ctx, 2763, 226, 96, 32),
      new Platform(this.ctx, 2939, 194, 266, 32),
      new Platform(this.ctx, 3366, 286, 96, 96),
      new Platform(this.ctx, 3454, 313, 72, 69),
      new Platform(this.ctx, 3756, 286, 32, 96),
      new Platform(this.ctx, 3894, 234, 517, 32),
      new Platform(this.ctx, 4456, 258, 88, 124),
    ]
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear()
      this.draw()
      this.move()
      this.checkCollisions()
    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.backgroundBack.draw()
    this.background.draw()
    this.player.draw()
    //this.platforms.forEach(el => el.draw())
  }

  move() {
    if (this.player.x === this.player.maxX && this.player.actions.right) {
      this.background.move()
      this.platforms.forEach(el => el.move())
    }
    if (this.background.x + this.background.w  <= 1080) {
      this.background.vx= 0
      this.platforms.forEach(el => el.vx = 0)
      this.player.maxX = this.ctx.canvas.width
    }
    this.player.move()

  }

  checkCollisions() {
    const platform = this.platforms.find(plat => plat.collide(this.player) && plat.collideTop(this.player))

    if(platform) {
      this.player.maxY = platform.y;
    } else {
      this.player.maxY = this.ctx. canvas.height - FLOOR
    }
  }

}