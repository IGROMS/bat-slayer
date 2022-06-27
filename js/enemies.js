class Bat {
	constructor(ctx) {
		this.ctx = ctx;
		this.health = 2;
    this.strength = 1;
	}
	attack(){
    return this.strength
  }
  receiveDamage(damage){
    this.health =- damage;
    console.log('hola')
  }

}