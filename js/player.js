class Player {
  constructor() {
    this.ctx = ctx;
    this.width = 50;
    this.height = 50;
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

  setListeners() {
    document.onkeydown = e => this.switchAction(e.keyCode, true)
    document.onkeyup = e => this.switchAction(e.keyCode, false)
  }

  applyActions() {
    if( this.isFloor() && this.actions.up) {
      this.vy = -20
    } else if(this.actions.right) {
      this.vx = 8
    } else if(this.actions.left) {
      this.vx = -8
    } else {
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