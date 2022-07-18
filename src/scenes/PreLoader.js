import Phaser from 'phaser'

export default class PreLoader extends Phaser.Scene {
	constructor() {
		super('preloader')
	}

	preload() {
		this.load.image('floor', 'images/floor.jpg');
    this.load.image('player', 'images/warlord-helmet.png');
    }

    create() {
			this.scene.start('game')
    }
}
