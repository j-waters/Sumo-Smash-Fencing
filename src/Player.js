export default new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize: function Player(scene, x, y, colour) {
		this.colour = colour
		this.scene = scene

		this.image = scene.add.graphics()
		this.image.fillStyle(this.colour.replace('#', '0x'), 1)
		this.image.fillCircle(50, 50, 50)

		this.x = x
		this.y = y

		this.image.x = this.x
		this.image.y = this.y

		this.speed = {x:0, y:0}
	},

	move: function(delta) {
		this.speed.x = delta.x * 0.1
		this.speed.y = delta.y * 0.1

		if (Math.abs(this.speed.x) < 2){
			this.speed.x = 0
		}
		if (Math.abs(this.speed.y) < 2){
			this.speed.y = 0
		}
	},

	update: function(){
		this.x += this.speed.x
		this.y += this.speed.y

		this.image.x = this.x
		this.image.y = this.y
	}
})