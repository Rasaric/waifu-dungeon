/*******************************************************************************


Game Logic


*******************************************************************************/
//required**********************************************************************
import Phaser from 'phaser'

// import { debugDraw } from '../utils/debug'
// import { createLizardAnims } from '../anims/EnemyAnims'
// import { createCharacterAnims } from '../anims/CharacterAnims'
// import { createChestAnims } from '../anims/TreasureAnims'
//
// import Lizard from '../enemies/Lizard'


import Character from '../characters/character'

//initiate game instance********************************************************
export default class Game extends Phaser.Scene {

	constructor()	{
		super('game')
	}
//preload

	preload() {
    }

    create() {
      this.keys = this.input.keyboard.addKeys("W,A,S,D,E,F");
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      this.inventory = [];
      //import floor sprite
      this.add.image(600, 430, 'floor');

      //import player sprite****************************************************
      this.player = new Character(this, 600, 430, 'player');

      // //set camera to follow character
       this.cameras.main.startFollow(this.player, true);

    }

//update game state*************************************************************
	update(keys) {
	 this.player.controls(this.keys, this.spacebar);
  }
}
