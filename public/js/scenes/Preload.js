class Preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }

    preload() {
        this.load.image('logo', 'Assets/images/outbreak_logo.png')
    }

    create() {
        this.add.image(400, 300, 'logo')
        this.input.on('pointerdown', () => {this.scene.start('night-phase')})
    }
   
}

