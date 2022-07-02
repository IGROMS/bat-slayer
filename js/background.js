class Background {
  constructor(ctx, src) {
    this.ctx = ctx

    this.x = 0
    this.y = 0
    this.h = this.ctx.canvas.height
    this.w = 4544

    this.vx = -3

    this.img = new Image()
    this.img.src = src
    this.movements = {
      right: false
    }
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
      this.x += this.vx
      if (this.x + this.w  <= 1080) {
        this.vx = 0
      }
  }

  onKeyEvent(event) {
    const status = event.type === 'keydown'

    switch (event.keyCode) {
      case RIGHT:
        this.movements.right = status
        break;
    
      default:
        break;
    }
  }
}

class BackgroundBack {
    constructor(ctx, src) {
      this.ctx = ctx
  
      this.x = 0
      this.y = 0
      this.h = this.ctx.canvas.height
      this.w = 4544
  
      this.vx = -0.5
  
      this.img = new Image()
      this.img.src = src
      this.movements = {
        right: false
      }
    }
  
    draw() {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  
    move() {
        this.x += this.vx
        if (this.x + this.w  <= 1080) {
          this.vx = 0
        }
    }
  
    onKeyEvent(event) {
      const status = event.type === 'keydown'
  
      switch (event.keyCode) {
        case RIGHT:
          this.movements.right = status
          break;
      
        default:
          break;
      }
    }
  }

  class BackgroundClouds {
    constructor(ctx, src) {
      this.ctx = ctx
  
      this.x = 0
      this.y = 0
      this.h = this.ctx.canvas.height
      this.w = 4544
  
      this.vx = -1.5
  
      this.img = new Image()
      this.img.src = src
      this.movements = {
        right: false
      }
    }
  
    draw() {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  
    move() {
        this.x += this.vx
        if (this.x + this.w  <= 1080) {
          this.vx = 0
        }
    }
  
    onKeyEvent(event) {
      const status = event.type === 'keydown'
  
      switch (event.keyCode) {
        case RIGHT:
          this.movements.right = status
          break;
      
        default:
          break;
      }
    }
  }