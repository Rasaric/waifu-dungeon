/*******************************************************************************


Character Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'

export default class Character extends BaseCharacter {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture, dH, dW, weapon, armor, kbS);
		//attributes****************************************************************
		//basic attributes
		this.inventory = ['water bottle', 'eggs'];
		this.isAlive = true;

		//stats
		this.health = 10;
		this.combat = 1;
		this.dodge = 1;
		this.damage = 4;
		this.armor = 1;

		this.setDepth(3);

	}

	/*character Methods**********************************************************/

	//controls--------------------------------------------------------------------
	controls(keys, space, player){
		if (player.isKnockedback == true || player.isAlive == false){
			return;
		} else {
			player.setVelocity(0);
			//horizontal movement
			if (keys.A.isDown) {
				player.setVelocityX(-600);
			} else if (keys.D.isDown) {
				player.setVelocityX(600);
			}
			//vertical movement
			if (keys.W.isDown) {
				player.setVelocityY(-600);
			} else if (keys.S.isDown) {
				player.setVelocityY(600);
			}

			//interaction---------------------------------------------------------------
			//attack
			if(Phaser.Input.Keyboard.JustDown(space)){
				if (player.cooldown==true) {
					return;
				}	else {
					player.cooldown = true;
					player.onFight('you');
					player.scene.scene.time.addEvent({ delay: 1000, callback: () => {player.cooldown=false}, callbackScope: this });
				}
			}
			//open inventory
			if(Phaser.Input.Keyboard.JustDown(keys.E)){
				console.log('inventory screen:' + player.inventory);
			}
		}

	}
	// add item to inventory------------------------------------------------------
	addItem(item){
		this.inventory.push(item);
	}
}
