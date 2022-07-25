/*******************************************************************************


Enemy Constructor - Grunt


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import Grunt from '../enemies/grunt'

export default class Soldier extends Grunt {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture, dH, dW, weapon, armor, kbS);

		this.displayWidth = 88;
		this.displayHeight = 88;
		this.weapon = 'Large Club';
		this.armorName = 'Plate Armor';
		this.knockbackSpeed = 15;
		this.attackCooldown = 800;
		this.health = 10;
		this.combat = 7;
		this.dodge = 5;
		this.damage = 15;
		this.armor = 5;
	}

	/*Grunt Methods**************************************************************/

  //AI--------------------------------------------------------------------------
  //AI will go here likely but for now its a sandbag
}
