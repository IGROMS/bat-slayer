class Player {
  constructor() {
    this.ctx = ctx;
    this.width = 252;
    this.height = 54;
    this.x = 30;
    this.y = this.ctx.canvas.height - this.height  - FLOOR;
    this.vy = 0;
    this.vx = 0;
    this.g = 1;
    this.maxY = this.ctx.canvas.height - FLOOR;
    this.actions =  {
      up : false,
      right: false,
      left: false,
      shoot : false,
    }
    this.isJumping = false;

    this.img = new Image();
    this.img.src = "/img/Hero/player_sprite.png";
    this.img.xFrames = 5;
    this.img.yFrames = 14;
    this.img.yFrameIndex = 0;
    this.img.xFrameIndex = 0;
    this.tick = 0;
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
    return this.y + this.height + FLOOR >= this.maxY && this.vy >= 0; 
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
        this.img.yFrameIndex++
        }
      if(this.img.yFrameIndex >= 8){
        this.img.yFrameIndex = 0;
      }}
    if (this.actions.right){
      if(this.tick >= 4) {
        this.tick = 0
        this.img.yFrameIndex++
        }
      if(this.img.yFrameIndex >= 4){
        this.img.yFrameIndex = 0;
      }}
  }

  setListeners() {
    document.onkeydown = e => this.switchAction(e.keyCode, true)
    document.onkeyup = e => this.switchAction(e.keyCode, false)
  }

  applyActions() {
    if(this.isFloor() && this.actions.up && !this.isJumping) {
      this.img.xFrameIndex = 1
      this.vy = -20
      this.isJumping = true
      // this.actions.up = false
    } else if(this.actions.right) {
      this.img.xFrameIndex = 0
      this.vx = 4
    } else if(this.actions.left) {
      this.img.xFrameIndex = 0
      this.vx = -4
    } else {
      this.vx = 0;
    }
    if(this.isJumping && this.isFloor() && this.img.yFrameIndex === 7) {
      this.actions.up = false;
      this.isJumping = false;
      this.img.yFrameIndex = 0;
      this.img.xFrameIndex = 0;
    }
  }

  switchAction(key, apply) {
    switch(key) {
      case UP:
        if (apply) {
          this.actions.up = apply;
        }
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