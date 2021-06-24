class Daybreak extends Phaser.Scene {
    constructor() {
        super("daybreak")
    }

    preload() {
        this.load.image('daybreak', '../../images/daybreak.png')
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.image(1000, 400, 'daybreak')
        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.time.delayedCall(1000, () => {
                    this.scene.start('day-phase')
                })
            })
        })
    }
}