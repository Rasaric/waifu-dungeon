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
		this.knockbackSpeed = 5;
		this.combat = 1;
		this.dodge = 1;
		this.damage = 2;
		this.armor = 1;
		this.rangeW = 64;
		this.rangeH = 64;
		this.name = "weapon";
	}
	/*Weapon Methods*************************************************************/


}
