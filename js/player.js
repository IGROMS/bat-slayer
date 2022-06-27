class Player {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 252;
    this.height = 54;
    this.x = 30;
    this.y = this.ctx.canvas.height - this.height  - FLOOR;
    this.vy = 0;
    this.vx = 0;
    this.g = 1;
    this.maxY = this.ctx.canvas.height - FLOOR;
    this.maxX = this.ctx.canvas.width / 2;
    this.actions =  {
      up : false,
      right: false,
      left: false,
      shoot : false,
    }
    this.isJumping = false;
    this.health = 20;
		this.strength = 1

    this.img = new Image();
    this.img.src = "/img/Hero/player_sprite.png";
    this.img.xFrames = 5;
    this.img.yFrames = 14;
    this.img.yFrameIndex = 0;
    this.img.xFrameIndex = 0;
    this.img.maxY = 5
    this.tick = 0;
    this.isFlooring = false
    this.setListeners()
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.width / 5 * this.img.xFrameIndex,
      this.img.height / 14 * this.img.yFrameIndex,
      this.img.width / 5,
      this.img.height / 14,
      this.x,
      this.y,
      this.width,
      this.height)
    this.animate()
  }

  isFloor() {
    return this.y + this.height >= this.maxY && this.vy >= 0; 
  }

  move() {
    this.applyActions()

    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.g;
    if(this.isFloor()) {
      this.y = this.maxY - this.height;
      this.vy = 0;
    }
    if (this.x <= 0){
      this.x = 0
    }
    if (this.x >= this.maxX) {
      this.x = this.maxX
    }
  }

  animate() {
      this.tick++

    if (this.img.xFrameIndex === 1 && this.isFloor()) {
      this.img.yFrameIndex = 5
      this.img.maxY = 7
      this.isFlooring = true
      setTimeout(() => {
        this.isFlooring = false
        this.img.xFrameIndex = 0
        this.img.maxY = 5
      }, 50)
      this.img.yFrameIndex = 6
    }

    if (this.isFloor() && !this.isFlooring && !this.actions.right){
      this.img.xFrameIndex = 0
      this.img.yFrameIndex = 0
    } else {
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
    } 

    if (this.actions.right && this.isFloor()) {
        if (this.img.yFrameIndex >= 7){
          this.img.yFrameIndex = 0;
        }
        if (this.tick >= 8) {
          this.tick = 0
          this.img.yFrameIndex++
        }
      }
        
    
  }

  setListeners() {
    document.onkeydown = e => this.switchAction(e.keyCode, true)
    document.onkeyup = e => this.switchAction(e.keyCode, false)
  }

  applyActions() {
    if(this.actions.up && this.isFloor() && !this.isJumping) {
      this.vy = -18
      this.isJumping = true
    } else if(this.actions.right) {
      this.isJumping = false;
      this.actions.up = false;
      this.vx = 3  
    } else if(this.actions.left) {
      this.isJumping = false;
      this.actions.up = false;
      this.vx = -3
    } else {
      this.isJumping = false
      this.vx = 0;
    }

  }

  switchAction(key, apply) {
    switch(key) {
      case UP:
        this.actions.up = apply;
        break;
      case RIGHT:
        this.actions.right = apply;
        break;
      case LEFT:
        this.actions.left = apply;
        break;
    }
  }
}