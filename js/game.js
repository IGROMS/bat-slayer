class Game {
  constructor(ctx) {
    this.ctx =  ctx;
    this.coinCount = 0;
    this.intervalId = null;
    this.player = new Player(this.ctx);
    this.tick = 0;
		this.levelIndex = 0;
    this.backgroundBack = new BackgroundBack(this.ctx, LEVELS[this.levelIndex].backgroundBack);
    this.backgroundClouds = new BackgroundClouds(this.ctx, LEVELS[this.levelIndex].backgroundClouds);
    this.background = new Background(this.ctx, LEVELS[this.levelIndex].background);
		this.healthbar = new Healthbar(this.ctx, this.player);
		this.coinsGUI = new CoinsGUI(this.ctx, this)
		this.backgroundMoves = false;
    this.platforms = LEVELS[this.levelIndex].platforms.map(plat => new Platform(this.ctx, ...plat));
    this.coins = LEVELS[this.levelIndex].coins.map(coin => new Coin(this.ctx, ...coin));
    this.bats = LEVELS[this.levelIndex].bats.map(bat => new Bat(this.ctx, ...bat, this.player, this));
  }

  start() {
    this.intervalId = setInterval(() => {
      this.clear()
      this.draw()
      this.move()
      this.checkCollisions()
    }, 1000 / 60)
  }

  gameOver() {
    clearInterval(this.intervalId);
    this.intervalId = null;

		this.ctx.beginPath()
		this.ctx.fillStyle = "#F6C37D";
		this.ctx.fillRect (
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.heigth
    )
		this.ctx.closePath()

		this.ctx.beginPath()
    this.ctx.font = "100px Minecraft";
    this.ctx.fillStyle = "#A5CDA5";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER",
		(this.ctx.canvas.width/2) + 3,
		(this.ctx.canvas.height/2) + 3);
		this.ctx.closePath()
		this.ctx.beginPath()
    this.ctx.font = "100px Minecraft";
    this.ctx.fillStyle = "#4D514C";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER",
      this.ctx.canvas.width/2,
      this.ctx.canvas.height/2);
		this.ctx.closePath()
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
    this.bats.forEach(bat => bat.draw())
		this.healthbar.draw()
		this.coinsGUI.draw()
    //this.platforms.forEach(el => el.draw())
		if(this.player.x >= this.ctx.canvas.width  && this.coinCount >= 30) {
			this.levelIndex++
			this.player.health = 20
			this.levelUp()
		}
  }

  move() {
    if (this.player.x === this.player.maxX && this.player.actions.right && !this.player.isAttacking) {
      this.background.move()
      this.backgroundClouds.move()
      this.backgroundBack.move()
      this.coins.forEach(coin => coin.move())
      //this.bats.forEach(bat => bat.move())
      /* this.bats.forEach(bat => {
        if(bat.sleep){
          bat.move()
        }
      }) */
      this.platforms.forEach(el => el.move())
			this.backgroundMoves = true;
    } else {
			this.backgroundMoves = false;
		}
    if (this.background.x + this.background.w  <= 1080) {
      this.background.vx= 0
      this.backgroundClouds.vx= 0
      this.backgroundBack.vx= 0
      this.coins.vx = 0
      this.platforms.forEach(el => el.vx = 0)
      this.coins.forEach(coin => coin.vx = 0)
      //this.bats.forEach(bat => bat.vx = 0)
      this.player.maxX = this.ctx.canvas.width
    }

    this.bats.forEach((bat, index) => {
      if (this.player.x === this.player.maxX && this.player.actions.right && !this.player.isAttacking && !bat.hasFallen) {
        bat.move()
      } else if (this.background.x + this.background.w  <= 1080 && !bat.hasFallen) {
        bat.vx = 0
      } else {
        bat.freeMove()
      }
			if (bat.x + bat.width <= 0) {
				this.bats.splice(index, 1)
			}
    })

    this.player.move()

  }

  checkCollisions() {
    const platform = this.platforms.find(plat => plat.collide(this.player) && plat.collideTop(this.player))
		const batCollision = this.bats.find((bat, index) => bat.collideAttack(this.player))

    if(platform) {
      this.player.maxY = platform.y;
    } else {
      this.player.maxY = this.ctx. canvas.height - FLOOR
    }

    this.coins.forEach((coin, index) => {
      if (coin.collide(this.player)) {
        this.coins.splice(index, 1)
        this.coinCount ++
      }
    })

    /* if(batCollision) {
      this.batCollision.receiveDamage(this.player.strength);
      if (this.batCollision.health <= 0) {
        this.bats.splice(index, 1)
      }
    } else {
      this.player.maxY = this.ctx. canvas.height - FLOOR
    } */

    this.bats.forEach((bat, index) => {
    	if (this.player.isAttacking && bat.collideAttack(this.player)) {
					//this.bats.splice(index, 1)
          bat.receiveDamage(this.player.strength)
          if (bat.health <= 0) {
            //setTimeout(() => {    ******** Me está quitando todos los murcielagos en lugar de solo el que pego cuando pongo el setTimeout ********
              this.bats.splice(index, 1)
            //}, 500)
          }
					
    	} else if(bat.collide(this.player) && !bat.isHitting) {
				this.player.receiveDamage(bat.strength)
        bat.isHitting = true
        setTimeout(() => {
          bat.isHitting = false
        }, 500)
        if(this.player.health < 0) {
          this.gameOver()
        }
			}
    })

  }

	levelUp() {
		this.coinCount = 0;
		this.player.x = 30;
		this.player.maxX = this.ctx.canvas.width / 2;
		this.backgroundBack = new BackgroundBack(this.ctx, LEVELS[this.levelIndex].backgroundBack);
    this.backgroundClouds = new BackgroundClouds(this.ctx, LEVELS[this.levelIndex].backgroundClouds);
    this.background = new Background(this.ctx, LEVELS[this.levelIndex].background);
		this.platforms = LEVELS[this.levelIndex].platforms.map(plat => new Platform(this.ctx, ...plat));
    this.coins = LEVELS[this.levelIndex].coins.map(coin => new Coin(this.ctx, ...coin));
    this.bats = LEVELS[this.levelIndex].bats.map(bat => new Bat(this.ctx, ...bat, this.player, this));
		this.backgroundBack.x = 0
    this.backgroundClouds.x = 0
    this.background.x = 0
		console.log('backgroundBack', this.backgroundBack.src);
		console.log('background', this.background.src);
	}
}