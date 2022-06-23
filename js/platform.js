class Platform {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 100;
        this.y = 350;
        this.height = 50;
        this.width = 300;
    }

    draw() {
        this.ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
          )
    }

    collide(player) {
        const collideX = player.x + 70 > this.x && player.x + 34 < this.x + this.width;
        const collideY = player.y < this.y + this.height && player.y + player.height > this.y;
        return collideX && collideY;
      }

    collideTop(player) {
        return player.y + player.height > this.y && player.y + player.height < this.y + this.height
    }

    collideBottom(player) {
        return player.y < this.y + this.height && player.y > this.y
    }

}