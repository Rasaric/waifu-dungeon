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
	}

	/*Chest Methods**************************************************************/
	onLootGen(scene, chest){
		let lootList = ['panties', 'bra', 'used condom', 'brand new condom', 'big black dildo', 'small pink dildo', 'a book on programming in JS']
		let lootAmount = Math.round(Math.random()*3);
		let i = 0
		while (i<lootAmount){
			let lootIndex = Math.round(Math.random()*lootList.length);
			chest.loot.push(lootList[i]);
			i++
			console.log(chest.loot);
		}
	}
	onOpen(player){
		player.inventory.push(this.loot);
		this.setSprite('open-chest');
	}
	chestGeneration(scene, spawnAmount){
		//generate on a random room-------------------------------------------------
		let randRoom = Math.floor(Math.random()*scene.dungeonMap.rooms.length);
    let coordX=scene.dungeonMap.rooms[randRoom].x+Math.round(Math.random()*((scene.dungeonMap.rooms[randRoom].w/scene.dungeonMap.w)-1))*scene.dungeonMap.w;
    let coordY=scene.dungeonMap.rooms[randRoom].y+Math.round(Math.random()*((scene.dungeonMap.rooms[randRoom].h/scene.dungeonMap.w)-1))*scene.dungeonMap.w;

		// add to physics group-----------------------------------------------------
		scene.chest = scene.chests.create(coordX, coordY, 'chest');

		//add properties------------------------------------------------------------
		this.onLootGen(scene, scene.chest);
		scene.physics.add.collider(scene.player, scene.chest, onOpen(scene.player), this);
	}
}
