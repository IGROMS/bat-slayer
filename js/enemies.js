class Bat {
	constructor(ctx, x, y, player, game) {
		this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.player = player;
		this.game = game;
		this.health = 1;
    this.strength = 1;
    this.vx = -3;
    this.vy = 0;
		this.sleep = true;
		this.hasFallen = false;

    this.img = new Image();
    this.img.src = "/img/Bat/bat_sprite.png";
    this.img.xFrames = 7;
    this.img.yFrames = 4;
    this.img.yFrameIndex = 0;
    this.img.xFrameIndex = 0;
    this.tick = 0;

    this.width = this.img.width / 7;
    this.height = this.img.height / 4;
    this.isHitting = false
	}
	attack(){
    return this.strength
  }
  receiveDamage(damage){
    this.health =- damage;
  }

  draw() {
    /* this.ctx.fillRect(
      this.x,
      this.y,
      20,
      20
    ) */
    this.ctx.drawImage(
      this.img,
      this.img.width / 7 * this.img.xFrameIndex,
      this.img.height / 4 * this.img.yFrameIndex,
      this.img.width / 7,
      this.img.height / 4,
      this.x,
      this.y,
      this.width,
      this.height
		)

		/* this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.stroke(); */
    this.animate()
  }

  move() {
    this.x += this.vx
    this.y += this.vy

    /* if (this.x <= this.player.x && !this.sleep && !this.hasFallen) {
      console.log('entro');
      this.vx = 0.5
    }
    if (this.x >= this.player.x && !this.sleep && !this.hasFallen) {
      this.vx = -5
    }
    if (this.y <= this.player.y && !this.sleep && !this.hasFallen) {
      this.vy = 0.5
    }
    if (this.y >= this.player.y && !this.sleep && !this.hasFallen) {
      this.vy = -0.5
    } */
  }

  freeMove() {
    if (this.x <= this.player.x && this.hasFallen && this.game.backgroundMoves) {
      this.vx = -2.5
      this.x += this.vx
    }
		if (this.x <= this.player.x && this.hasFallen && !this.game.backgroundMoves) {
      this.vx = 0.5
      this.x += this.vx
    }
    if (this.x >= this.player.x && this.hasFallen && this.game.backgroundMoves) {
      this.vx = -3.5
      this.x += this.vx
    }
		if (this.x >= this.player.x && this.hasFallen && !this.game.backgroundMoves) {
      this.vx = -0.5
      this.x += this.vx
    }
    if (this.y <= this.player.y && this.hasFallen) {
      this.vy = 0.5
      this.y += this.vy
    }
    if (this.y >= this.player.y && this.hasFallen) {
      this.vy = -0.5
      this.y += this.vy
    }
		if (this.x + this.width <= 0) {
			this.vx = 0
			this.vy = 0
		}
  }

  animate() {
    	this.tick++
		
		
      if (this.tick >= 10) {
        this.tick = 0
        this.img.xFrameIndex++
				if (this.sleep && this.img.xFrameIndex >=6) {
					this.img.xFrameIndex = 0
				}

				if (!this.sleep && !this.hasFallen && this.img.xFrameIndex > 6 ) {
					this.img.xFrameIndex = 0
				}

				if (!this.sleep && this.hasFallen && this.img.xFrameIndex > 6 ) {
					this.img.xFrameIndex = 0
				}
      }

			if (this.x - this.player.x <= 200 && this.player.x - (this.x + this.width) <= 50 && this.y < this.player.y && this.sleep) {
				this.img.xFrameIndex = 0
      	this.img.yFrameIndex = 1;
				this.sleep = false;
      }

			if (this.img.xFrameIndex >= 6 && !this.sleep && !this.hasFallen) {
				this.img.yFrameIndex = 2;
				this.hasFallen = true
			
			}
		// 	if (this.img.xFrameIndex >= 6){
    //     this.img.xFrameIndex = 0
    //   if (this.img.xFrameIndex >= 5 ){
    //     this.img.yFrameIndex = 2
		// 		console.log(this.img.yFrameIndex);
		// 		if (this.tick >= 10) {
		// 			this.tick = 0
		// 			this.img.xFrameIndex++
		// 		}
		// 		if (this.img.xFrameIndex >= 6){
		// 			this.img.xFrameIndex = 0
		// 		}
    //   } 

  }

  collide(player) {
    const collideX = player.x + 70 >= this.x && player.x + 34 <= this.x + this.width;
    const collideY = player.y + 24 <= this.y + 62 && player.y + player.height >= this.y + 43;
    return collideX && collideY;
  }

	collideAttack(player) {
    const collideX = player.x + 138 >= this.x && player.x + 70 <= this.x + this.width;
    const collideY = player.y /* + 24 */ <= this.y + 62 && player.y + player.height >= this.y;
    return collideX && collideY;
  }

}