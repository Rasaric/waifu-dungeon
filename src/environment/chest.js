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
		if (scene.lootDeck.length==0) {
			console.log('no more loot can be obtained');
		}	else {

			//generate amount of loot in chest----------------------------------------
			let lootAmount = Math.round(Math.random()*3)+1;

			//draw an amount of loot from deck----------------------------------------
			let i = 0
			while (i<lootAmount){
				let lootIndex = Math.floor(Math.random()*(scene.lootDeck.length-1));
				scene.lootDeck[lootIndex].onDraw(scene, scene.lootDeck[lootIndex]);

				//add drawn loot from deck to chest-------------------------------------
				chest.loot.push(scene.lootDeck[lootIndex])
				i++
			}
		}
	}
}
