import io from 'socket.io-client'
import Controller from './Controller';


export default new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Controller() {
        Phaser.Scene.call(this, { key: 'controller' });
    },

    preload: function() {
		this.load.image('controller/holder', 'assets/controller/holder.png');
		this.load.image('controller/stick', 'assets/controller/stick.png');
    },

    create: function() {
		this.cameras.main.setBackgroundColor(window.g.colour)

		var holder = this.add.image(350, 320, "controller/holder")
        holder.setDisplaySize(500, 500)

        this.stick = this.add.sprite(350, 320, "controller/stick")
        this.stick.setDisplaySize(200, 200)
	}
})