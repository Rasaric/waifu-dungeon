/*******************************************************************************


Character constructor - Generic


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
export default class BaseCharacter extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS, aCd) {
		super(scene, x, y, texture);
		this.scene = scene;

		//sprite attributes*********************************************************
		this.displayWidth= dW;
		this.displayHeight= dH;
		this.scene.physics.world.enable(this);
		//this.setCollideWorldBounds(true);
		this.setImmovable(false);
		scene.add.existing(this);

		//attributes****************************************************************
		//basic attributes
		this.name = texture;
		//stats
		this.health = 1;
		this.combat = 5;
		this.dodge = 1;
		this.damage = 8;
		this.weapon = weapon;
		this.armor = 1;
		this.armorName = armor;
		this.cooldown = false;
		this.isKnockedback = false;
		this.knockbackSpeed = kbS;
		this.attackCooldown = aCd;
	}
}
