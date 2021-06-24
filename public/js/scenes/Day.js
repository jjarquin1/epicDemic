class Day extends Phaser.Scene {
    constructor() {
        super("day-phase")
    }

 

   create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.cameras.main.setBackgroundColor('#21618C');
        this.add.text(10, 10, 'Day Phase', {fill: '#EAEDED'});
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