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
		this.equipped = "bare hands"
		this.weapon = "bare hands"
		this.setDepth(3);

	}

	/*character Methods**********************************************************/

	//controls--------------------------------------------------------------------
	controls(keys, space, scene){
		if (scene.player.isKnockedback == true || scene.player.isAlive == false){
			return;
		} else {
			scene.player.setVelocity(0);
			//horizontal movement
			if (keys.A.isDown) {
				scene.player.setVelocityX(-600);
			} else if (keys.D.isDown) {
				scene.player.setVelocityX(600);
			}
			//vertical movement
			if (keys.W.isDown) {
				scene.player.setVelocityY(-600);
			} else if (keys.S.isDown) {
				scene.player.setVelocityY(600);
			}

			//interaction*************************************************************
			//attack------------------------------------------------------------------
			if(Phaser.Input.Keyboard.JustDown(space)){

				if (scene.player.cooldown==true) {
					return;
				}	else {
					scene.player.cooldown = true;
					scene.weapon.x = scene.player.x;
					scene.weapon.y = scene.player.y-64;
					scene.weapon.setActive(true).setVisible(true);
					scene.time.addEvent({ delay: 1000, callback: () => {
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
