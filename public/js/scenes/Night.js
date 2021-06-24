class Night extends Phaser.Scene {
    constructor() {
        super("night-phase")
    }

   create() {
        
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.cameras.main.setBackgroundColor('#17202A');
        this.add.text(10, 10, 'Night Phase', {fill: '#EAEDED'});
        this.input.on('pointerdown', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.time.delayedCall(1000, () => {
                this.scene.start('daybreak')
            })
        })
    }
}

