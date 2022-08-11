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
		this.combat = 2;
		this.damage = 2;
		this.knockbackSpeed = 10;
		this.rangeW = 64;
		this.rangeH = 256;
		this.name = "weapon";
		this.attackCooldown = 200;
	}
	/*Weapon Methods*************************************************************/
}
