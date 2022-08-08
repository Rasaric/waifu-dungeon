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

		let lootAmount = Math.round(Math.random()*3)+1;

		let i = 0
		while (i<lootAmount){
			let lootIndex = Math.round(Math.random()*scene.lootList.loot.length);
			chest.loot.push(scene.lootList.loot[lootIndex]);
			i++
		}
	}
	onOpen(player, chest){
		if (chest.open == true) {
			return;
		} else {
			player.inventory.push(chest.loot);
			console.log(`${player.name} recieved ${chest.loot[0].name} and some cringe shit` );
			chest.setTexture('open-chest');
			chest.open = true;
		}
	}
}
