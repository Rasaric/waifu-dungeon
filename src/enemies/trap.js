/*******************************************************************************


Enemy Constructor - Trap


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'

export default class Trap extends BaseCharacter {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture);

		this.displayWidth = 64;
		this.displayHeight = 64;
		this.weapon = weapon;
		this.knockbackSpeed = 10;
		this.attackCooldown = 5000;
	}

	/*Trap Methods**************************************************************/

}
