export default new Phaser.Class({
    Extends: Phaser.GameObjects.Sprite,
    initialize: function Player(scene, x, y, colour) {
		this.colour = colour
		this.scene = scene

		this.image = scene.add.graphics()
		this.image.fillStyle(this.colour.replace('#', '0x'), 1)
		this.image.fillCircle(40, 40, 40)
		
		this.x = x
		this.y = y

		this.image.x = this.x
		this.image.y = this.y

		this.dead = false

		this.dashing = false

		this.speed = {x:0, y:0}

		this.dashSpeed = {x:0, y:0}
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
		if (!this.dead){
			this.x += this.speed.x * 0.1 + this.dashSpeed.x
			this.y += this.speed.y * 0.1 + this.dashSpeed.y
		}
		
		this.image.x = this.x
		this.image.y = this.y
		this.checkBounds()
	},

	checkBounds: function() {
		if ((this.x < 70 || this.x > 1200 || this.y < 60 || this.y > 580) && !this.dead){
			this.die()
		}
	},
	die: function() {
		this.dead = true
		var tween = this.scene.tweens.add({
			targets: this.image,
			scaleX: 0,
			scaleY: 0,
			//ease: 'Power1',
			duration: 1000
		});
	},

	dash: function(){
		if (!this.dashing){
			this.dashing = true
			this.dashSpeed.x = this.speed.x * 1
			this.dashSpeed.y = this.speed.y * 1
			setTimeout(function(){
				this.dashSpeed = {x:0, y:0}
				this.dashing = false
			}.bind(this), 200)
		}
	}
})