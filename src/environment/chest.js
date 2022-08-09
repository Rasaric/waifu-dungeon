/*******************************************************************************


Element Constructor - Chest

*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'

export default class Chest extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);

		this.displayWidth = 64;
		this.displayHeight = 64;
		this.loot = [];
		this.open = false;
	}

	/*Chest Methods**************************************************************/
	onLootGen(scene, chest){
		//generate amount of loot in chest------------------------------------------
		let lootAmount = Math.round(Math.random()*3)+1;

		//draw an amount of loot from deck------------------------------------------
		let i = 0
		while (i<lootAmount){
			let lootIndex = Math.floor(Math.random()*scene.lootDeck.length);
			console.log("index: " + lootIndex);
			console.log("length: " + scene.lootDeck.length);
			scene.lootDeck[lootIndex].onDraw(scene, scene.lootDeck[lootIndex]);
			i++
		}
	}
	onOpen(player, chest){
		//if chest has already been opened, do nothing------------------------------
		if (chest.open == true) {
			return;
		} else {
			// add each item to player inventory--------------------------------------
			for (let i=0; chest.loot.length>i; i++){
				player.inventory.addItem(chest.loot[i]);
			}
			// set chest to open------------------------------------------------------
			chest.setTexture('open-chest');
			chest.open = true;
		}
	}
}
