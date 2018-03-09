export default new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function Title() {
        Phaser.Scene.call(this, { key: 'title' });
    },

    preload: function() {
        //this.load.image('logo', 'media/logo.png');
    },

    create: function() {
        if (window.mobilecheck()){
            var title = this.add.text(640, 150, 'ENTER CODE:', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            var container = document.getElementById("container");
            var input = document.createElement("input");
            console.log(input)
            input.type = "number"
            container.appendChild(input);
            var enter = this.add.sprite(640, 400, "Button")
        }
        else {
            var title = this.add.text(640, 150, 'SUPER SMASH FENCE', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            var code = 54679
            var codeText = this.add.text(640, 250, 'CODE: ' + code, { fontFamily: 'Arial', fontSize: 64, color: '#ffffff', 'text-align': 'center' });
            codeText.setOrigin(0.5, 0.5)
        }
        title.setOrigin(0.5, 0.5)
        
    },
});
