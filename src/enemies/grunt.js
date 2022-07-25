/*******************************************************************************


Enemy Constructor - Grunt


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'

export default class Grunt extends Base {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture, dH, dW, weapon, armor, kbS);

		this.displayWidth = 64;
		this.displayHeight = 64;
		this.weapon = 'bare hands';
		this.armorName = 'nude body';
		this.knockbackSpeed = 10;
	}

	/*Grunt Methods**************************************************************/

  //AI--------------------------------------------------------------------------
  //AI will go here likely but for now its a sandbag
}
