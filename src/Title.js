import io from 'socket.io-client'


export default new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Title() {
        Phaser.Scene.call(this, { key: 'title' });
    },

    preload: function() {
        this.load.image('enter', 'assets/enter.png');
    },

    create: function() {
        if (window.mobilecheck()){
            var title = this.add.text(640, 150, 'ENTER CODE:', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            var container = document.getElementById("container");
            var input = document.createElement("input");
            console.log(input)
            input.type = "number"
            container.appendChild(input);
            var enter = this.add.sprite(640, 400, "enter").setInteractive()
            enter.setDisplaySize(380, 100)


            window.g.socket = io.connect('http://127.0.0.1:5000');
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

            
            window.g.socket = io.connect('http://127.0.0.1:5000'); // Triggers connect on server (in Python File)
            window.g.socket.on('connect', function() {
                console.log("connect")
                window.g.socket.emit('start', {'data': 'desktop'});
            });
            window.g.socket.on('getcode', function(data) {
                codeText.setText('CODE: ' + data.data)
            })
        }
        title.setOrigin(0.5, 0.5)
        
    },
});
