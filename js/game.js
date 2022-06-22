class Game {
  constructor(ctx) {
    this.ctx =  ctx;
    //this.background = new Background(this.ctx);
    this.intervalId = null;
    this.player = new Player(this.ctx);
    this.tick = 0
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear()
      //this.addObstacle()
      this.draw()
      //this.checkCollisions()
      this.move()
    }, 1000 / 60)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.player.draw()
  }

  move() {
    this.player.move()
  }

}