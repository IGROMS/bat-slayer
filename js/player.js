class Player {
  constructor() {
    this.ctx = ctx;
    this.width = 100;
    this.height = 100;
    this.x = 30;
    this.y = this.ctx.canvas.height - this.height;
    this.vy = 0;
    this.vx = 0;
    this.g = 0//0.98;
    this.actions =  {
      up : false,
      right: false,
      left: false,
      shoot : false,
    }
    this.setListeners()
  }

  draw() {
    this.ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  isFloor() {
    return this.y + this.h >= this.ctx.canvas.height; 
  }

  move() {
    this.applyActions()
    this.vy += this.g;
    this.y += this.vy;
    this.x += this.vx;
    if(this.isFloor()) {
      this.y = this.ctx.canvas.height - this.h;
      this.vy = 0;
    }
  }

  setListeners() {
    document.onkeydown = e => this.switchAction(e.keyCode, true)
    document.onkeyup = e => this.switchAction(e.keyCode, false)
  }

  applyActions() {
    if(this.y >= 0 && this.actions.up) {
      this.vy += -0.4
    }
    if(this.actions.right) {
      this.vx = 1
    }
    if(this.actions.left) {
      this.vx = -1
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