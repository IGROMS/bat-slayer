class Game {
  constructor(ctx) {
    this.ctx =  ctx;
    //this.background = new Background(this.ctx);
    this.intervalId = null;
    this.player = new Player(this.ctx);
    this.platform = new Platform(this.ctx)
    this.tick = 0
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear()
      //this.addObstacle()
      this.draw()
      this.move()
      this.checkCollisions()
    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.player.draw()
    this.platform.draw()
  }

  move() {
    this.player.move()
  }

  checkCollisions() {
    if(this.platform.collide(this.player)) {
      if(this.platform.collideTop(this.player)) {
        this.player.maxY = this.platform.y
        this.player.y = this.platform.y - this.player.height
      }
    } else {
      this.player.maxY = this.ctx.canvas.height
    }
  }

}