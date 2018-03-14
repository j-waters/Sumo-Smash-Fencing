import Player from './Player'

export default new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Game() {
        Phaser.Scene.call(this, { key: 'game' });
	},

	preload: function(){
		this.load.image('level/1', 'assets/levels/1.png');
	},
	
	create: function() {
		/*window.g.socket.on('direction', function(data) {
			window.g.players[data.colour].move(data)
		})*/
		var back = this.add.image(640, 320, 'level/1')
		for (var i in window.g.players){
			window.g.players[i] = new Player(this, 500, 500, window.g.players[i].colour)
		}
	},

	update: function() {
        for (var k in window.g.players) {
            window.g.players[k].update()
        }
    }
})