let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    pixelArt: true,
    physics:{
        default: "arcade",
        arcade : {
            debug: true
        }
    },
    scene: [Play]
}


let game = new Phaser.Game(config);