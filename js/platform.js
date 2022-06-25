class Platform {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = -2
    }

    draw() {
        this.ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
          )
    }

    move() {
        this.x += this.vx
    
        if (this.x + this.w <= 0) {
          this.x = 0
        }
    }

    collide(player) {
        const collideX = player.x + 70 >= this.x && player.x + 34 <= this.x + this.width;
        const collideY = player.y <= this.y + this.height && player.y + player.height >= this.y;
        return collideX && collideY;
      }

    collideTop(player) {
        return player.y + player.height >= this.y && player.y + player.height < this.y + this.height
    }

    collideBottom(player) {
        return player.y < this.y + this.height && player.y > this.y
    }

}