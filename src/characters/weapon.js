/*******************************************************************************


Weapon Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'

export default class Weapon extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		//attributes****************************************************************
		//basic attributes
		this.combat = 1;
		this.damage = 4;
		this.setDepth(3);
	}
	/*Weapon Methods*************************************************************/


}
