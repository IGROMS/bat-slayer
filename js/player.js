class Player {
  constructor() {
    this.ctx = ctx;
    this.width = 252;
    this.height = 54;
    this.x = 30;
    this.y = this.ctx.canvas.height - this.height;
    this.vy = 0;
    this.vx = 0;
    this.g = 1;
    this.maxY = this.ctx.canvas.height;
    this.actions =  {
      up : false,
      right: false,
      left: false,
      shoot : false,
    }
    this.isJumping = false;

    this.img = new Image();
    this.img.src = "/img/Hero/player_sprite.png";
    this.img.frames = 14;
    this.img.frameIndex = 0;
    this.tick = 0;
    this.setListeners()
  }

  draw() {
    if (this.actions.right){
      this.ctx.drawImage(
        this.img,
        0,
        this.img.frameIndex * this.img.height / this.img.frames,
        this.img.width / 5,
        this.img.height / this.img.frames,
        this.x,
        this.y,
        this.width,
        this.height)
      } else if (this.actions.up) {
      this.ctx.drawImage(
        this.img,
        252,
        this.img.frameIndex * this.img.height / this.img.frames,
        this.img.width / 5,
        this.img.height / this.img.frames,
        this.x,
        this.y,
        this.width,
        this.height)
    } else {
      this.ctx.drawImage(
        this.img,
        0,
        this.img.frameIndex * this.img.height / this.img.frames,
        this.img.width / 5,
        this.img.height / this.img.frames,
        this.x,
        this.y,
        this.width,
        this.height)
    }
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
    if (this.x + this.width >= this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width - this.width
    }
  }

  animate() {
    this.tick++
    if (this.actions.up){
      if(this.tick >= 8) {
        this.tick = 0
        this.img.frameIndex++
        }
      if(this.img.frameIndex >= 8){
        this.img.frameIndex = 0;
      }}
    if (this.actions.right){
      if(this.tick >= 4) {
        this.tick = 0
        this.img.frameIndex++
        }
      if(this.img.frameIndex >= 4){
        this.img.frameIndex = 0;
      }}

  }

  setListeners() {
    document.onkeydown = e => this.switchAction(e.keyCode, true)
    document.onkeyup = e => this.switchAction(e.keyCode, false)
  }

  applyActions() {
    if( this.isFloor() && this.actions.up) {
      this.vy = -20
    } else if(this.actions.right) {
      this.vx = 4
    } else if(this.actions.left) {
      this.vx = -4
    } else {
      this.vx = 0;
    }
  }

  switchAction(key, apply) {
    switch(key) {
      case UP:
        /* if (!this.isJumping){
          this.actions.up = apply;
          this.isJumping = true
          setTimeout(() => {
            this.isJumping = false
          }, 1100)
        } */
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