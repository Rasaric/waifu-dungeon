/*******************************************************************************


Character Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'
import Weapon from '../characters/weapon'
export default class Character extends BaseCharacter {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture, dH, dW, weapon, armor, kbS);
		//attributes****************************************************************
		//basic attributes
		this.inventory = [];
		this.isAlive = true;

		//stats
		this.health = 10;
		this.dodge = 1;
		this.armor = 1;
		this.weapon = "bare hands"
		this.setDepth(3);
		this.facing = "up";

	}

	/*character Methods**********************************************************/

	//controls--------------------------------------------------------------------
	controls(keys, space, scene){
		if (scene.player.isKnockedback == true || scene.player.isAlive == false){
			return;
		} else {
			scene.player.setVelocity(0);
			scene.weapon.setVelocity(0);
			//horizontal movement
			if (keys.A.isDown) {
				scene.weapon.setVelocityX(-600);
				scene.player.setVelocityX(-600);
				scene.player.facing = "left";
			} else if (keys.D.isDown) {
				scene.weapon.setVelocityX(600);
				scene.player.setVelocityX(600);
				scene.player.facing = "right";
			}
			//vertical movement
			if (keys.W.isDown) {
				scene.weapon.setVelocityY(-600);
				scene.player.setVelocityY(-600);
				scene.player.facing = "up";
			} else if (keys.S.isDown) {
				scene.weapon.setVelocityY(600);
				scene.player.setVelocityY(600);
				scene.player.facing = "down";
			}
			if (scene.vision){
	      scene.vision.x = scene.player.x;
	      scene.vision.y = scene.player.y;
	    }

			//interaction*************************************************************
			//attack------------------------------------------------------------------
			if(Phaser.Input.Keyboard.JustDown(space)){
				let positionX = scene.player.x;
				let positionY = scene.player.y;

				switch (scene.player.facing) {
					case "left": positionX = positionX-64;
					scene.weapon.angle = 270;
						break;
					case "right": positionX = positionX+64;
					scene.weapon.angle = 90;
						break;
					case "up": positionY = positionY-64;
					scene.weapon.angle = 0;
						break;
					case "down": positionY = positionY+64;
					scene.weapon.angle = 180;
						break;
				}

				if (scene.player.cooldown==true) {
					return;
				}	else {
					scene.player.cooldown = true;
					scene.weapon.x = positionX;
					scene.weapon.y = positionY;
					scene.weapon.setActive(true).setVisible(true);
					scene.time.addEvent({ delay: scene.weapon.attackCooldown, callback: () => {
						scene.player.cooldown=false;
						scene.weapon.setActive(false).setVisible(false);
					}, callbackScope: this });
				}
			}
			//open inventory----------------------------------------------------------
			if(Phaser.Input.Keyboard.JustDown(keys.E)){
				if (this.inventory.length == 0) {
					console.log('broke ass nigga got nothin');
					return;
				} else {
					let invDump = [];
					for (let i = 0; this.inventory.length > i; i++){
						invDump.push(this.inventory[i].name);
					}
					console.log(`player has: ${invDump}`);
				}
			}
		}

	}
	// add item to inventory******************************************************
	addItem(item){
		this.inventory.push(item);
		console.log(`player obtained ${item.name}`);
	}
}
