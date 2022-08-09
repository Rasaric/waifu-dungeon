/*******************************************************************************


Character Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'

//PreLoader class***************************************************************
export default class PreLoader extends Phaser.Scene {
	constructor() {
		super('preloader')
	}

	preload() {
		//load assets to the game***************************************************
		this.load.image('floor', 'images/floor.jpg');
		this.load.image('tile', 'images/tile.jpg');
		this.load.image('empty', 'images/empty.jpg');
    this.load.image('player', 'images/warlord-helmet.png');
		this.load.image('grunt', 'images/grunt.png');
		this.load.image('trap', 'images/trap.png');
		this.load.image('chest', 'images/chest.png');
		this.load.image('open-chest', 'images/open-chest.png');

		//JSON data ****************************************************************
		this.load.json('loot', 'json/lootList.json');
		this.load.json('traps', 'json/trapList.json');
    }

    create() {
			this.scene.start('game')
    }
}
