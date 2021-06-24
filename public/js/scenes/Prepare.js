class Prepare extends Phaser.Scene {
    constructor() {
        super("prepare")
    }

    preload() {
        this.load.image('prepare', '../../images/night.png')
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.image(1000, 400, 'prepare')
        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('night-phase')
                })
            })
        })
    }
}
