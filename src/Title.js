import io from 'socket.io-client'
import Player from './Player'


export default new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Title() {
        Phaser.Scene.call(this, { key: 'title' });
    },

    preload: function() {
        this.load.image('enter', 'assets/enter.png');
        this.load.image('start', 'assets/start.png');
    },

    create: function() {
        var host = '10.138.184.24'
        if (window.mobilecheck()){
            var title = this.add.text(640, 150, 'ENTER CODE:', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            var container = document.getElementById("container");
            var input = document.createElement("input");
            console.log(input)
            input.type = "number"
            container.appendChild(input);
            var enter = this.add.sprite(640, 400, "enter").setInteractive()
            enter.setDisplaySize(380, 100)
            window.g.socket = io.connect('http://' + host + ':5000');
            window.g.socket.on('joinroom', function(data) {
                window.g.colour = data.colour
                input.parentNode.removeChild(input);
                this.scene.start('controller')
            }.bind(this))
            enter.on('pointerdown', function(){
                window.g.socket.emit('controller', {data: input.value});
            })
            //var socket = io.connect('http://' + document.domain + ':' + location.port);
        }
        else {
            var title = this.add.text(640, 150, 'SUPER SMASH FENCE', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            var code = 54679
            var codeText = this.add.text(640, 250, 'CODE: -----', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            codeText.setOrigin(0.5, 0.5)
            window.g.socket = io.connect('http://' + host + ':5000');
            window.g.socket.on('connect', function() {
                console.log("connect")
                window.g.socket.emit('start', {'data': 'desktop'});
            });
            window.g.socket.on('getcode', function(data) {
                codeText.setText('CODE: ' + data.data)
                console.log(data.data)
            })

            window.g.socket.on('direction', function(data) {
                window.g.players[data.colour].move(data)
            })

            window.g.socket.on('newplayer', function(data) {
                window.g.players[data.colour] = new Player(this, 100, 100, data.colour)
            }.bind(this))

            var start = this.add.sprite(640, 400, "start").setInteractive()

            start.on('pointerdown', function(){
                this.scene.start('game')
            }, this)
        }
        title.setOrigin(0.5, 0.5)
        
    },

    update: function() {
        for (var k in window.g.players) {
            window.g.players[k].update()
        }
    }
});
