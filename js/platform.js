class Platform {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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