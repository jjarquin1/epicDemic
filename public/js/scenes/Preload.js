class Preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }

    preload() {
        this.load.image('logo', '../../images/outbreak_logo.png')
    }

    create() {
        
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.image(1000, 400, 'logo')
        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('prepare')
            })
        })
    }
   
}

