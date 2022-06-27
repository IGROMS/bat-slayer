class Game {
  constructor(ctx) {
    this.ctx =  ctx;
    this.coinCount = 0;
    //this.background = new Background(this.ctx);
    this.intervalId = null;
    this.player = new Player(this.ctx);
    this.tick = 0;
    this.backgroundBack = new BackgroundBack(this.ctx);
    this.backgroundClouds = new BackgroundClouds(this.ctx);
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
      new Platform(this.ctx, 3894, 234, 450, 32),
      new Platform(this.ctx, 4456, 258, 88, 124),
    ];
    this.coins = [
      new Coin(this.ctx, 1036, 245),
      new Coin(this.ctx, 1082, 245),
      new Coin(this.ctx, 1183, 341),
      new Coin(this.ctx, 1229, 341),
      new Coin(this.ctx, 1275, 341),
      new Coin(this.ctx, 1321, 341),
      new Coin(this.ctx, 1421, 245),
      new Coin(this.ctx, 1467, 245),
      new Coin(this.ctx, 1513, 245),
      new Coin(this.ctx, 1622, 341),
      new Coin(this.ctx, 1668, 341),
      new Coin(this.ctx, 1714, 341),
      new Coin(this.ctx, 1760, 341),
      new Coin(this.ctx, 1806, 341),
      new Coin(this.ctx, 1852, 341),
      new Coin(this.ctx, 1898, 341),
      new Coin(this.ctx, 1944, 341),
      new Coin(this.ctx, 1990, 341),
      new Coin(this.ctx, 1676, 189),
      new Coin(this.ctx, 1722, 189),
      new Coin(this.ctx, 1768, 189),
      new Coin(this.ctx, 1814, 189),
      new Coin(this.ctx, 2470, 117),
      new Coin(this.ctx, 2516, 117),
      new Coin(this.ctx, 2949, 153),
      new Coin(this.ctx, 2995, 153),
      new Coin(this.ctx, 3041, 153),
      new Coin(this.ctx, 3087, 153),
      new Coin(this.ctx, 3133, 153),
      new Coin(this.ctx, 3179, 153),
      new Coin(this.ctx, 3918, 191),
      new Coin(this.ctx, 3964, 191),
      new Coin(this.ctx, 4010, 191),
      new Coin(this.ctx, 4056, 191),
      new Coin(this.ctx, 4102, 191),
      new Coin(this.ctx, 4148, 191),
      new Coin(this.ctx, 4194, 191),
      new Coin(this.ctx, 4240, 191),
      new Coin(this.ctx, 4286, 191),

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
    this.backgroundClouds.draw()
    this.background.draw()
    this.player.draw()
    this.coins.forEach(coin => coin.draw())
    //this.platforms.forEach(el => el.draw())
  }

  move() {
    if (this.player.x === this.player.maxX && this.player.actions.right) {
      this.background.move()
      this.backgroundClouds.move()
      this.backgroundBack.move()
      this.coins.forEach(coin => coin.move())
      this.platforms.forEach(el => el.move())
    }
    if (this.background.x + this.background.w  <= 1080) {
      this.background.vx= 0
      this.backgroundClouds.vx= 0
      this.backgroundBack.vx= 0
      this.coins.vx = 0
      this.platforms.forEach(el => el.vx = 0)
      this.coins.forEach(coin => coin.vx = 0)
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

    this.coins.forEach((coin, index) => {
      if (coin.collide(this.player)) {
        this.coins.splice(index, 1)
        this.coinCount ++
        console.log(this.coinCount);

      }
    })

  }
}