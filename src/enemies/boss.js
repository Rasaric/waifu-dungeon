/*******************************************************************************


Enemy Constructor - Grunt


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import Grunt from '../enemies/grunt'

export default class Boss extends Grunt {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture, dH, dW, weapon, armor, kbS);

		this.displayWidth = 256;
		this.displayHeight = 256;
		this.health = 20;
		this.combat = 10;
		this.dodge = 5;
		this.damage = 20;
		this.weapon = 'Colossal Club';
		this.armor = 10;
		this.armorName = 'Fat, blubbery skin';
		this.knockbackSpeed = 30;
		this.attackCooldown = 2500;
	}

	/*Grunt Methods**************************************************************/

  //AI--------------------------------------------------------------------------
  //AI will go here likely but for now its a sandbag
}
