/*******************************************************************************


Game MAster Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
export default class GameMaster {
	constructor(scene) {
		this.scene = scene;
	}
	/*Battle Methods*************************************************************/

	//attack----------------------------------------------------------------------
	onFight(target, attacker){
		//prevent attack spamming, disble traps-------------------------------------
		if (attacker.cooldown==true || attacker.triggered==true || attacker.active==false) {
			return;
		}	else {
			if (typeof attacker.triggered=="undefined"){
				attacker.cooldown=true;
				attacker.scene.time.addEvent({ delay: attacker.attackCooldown, callback: () => {attacker.cooldown=false; console.log(attacker.name + ' can attack again');}, callbackScope: this });
			} else {
				attacker.triggered = true;
			}
		}

		//knockback-----------------------------------------------------------------
		target.isKnockedback = true;
		target.setVelocity(0);

		// calculate angle----------------------------------------------------------
		let xAngle = (target.x-attacker.x)*attacker.knockbackSpeed;
		let yAngle = (target.y-attacker.y)*attacker.knockbackSpeed;

		// set speed character is knocked back--------------------------------------
		target.setVelocityY(yAngle);
		target.setVelocityX(xAngle);

		// after a moment, return to static-----------------------------------------
		attacker.scene.time.addEvent({ delay: 100, callback:  () => {target.isKnockedback = false;}, callbackScope: this });

		//roll for attack, defense and damage---------------------------------------
		let atkRoll = Math.floor(Math.random()*10)+attacker.combat;
		let defRoll = Math.floor(Math.random()*10)+target.dodge;
		let damageRoll = Math.floor(Math.random()*attacker.damage);

		//check values and resolve combat outcome-----------------------------------

		//compare attack roll to defense roll
		if (atkRoll>defRoll) {

			//calculate damage dealt--------------------------------------------------
			let damageDealt = damageRoll-target.armor;
			if (damageDealt<=0) {

				// if armor absorbs all damage------------------------------------------
				console.log(`${attacker.name} barely glanced ${target.name}'s ${target.armorName}`);
			}	else {
				// deal damage to health------------------------------------------------
				target.health = target.health-damageDealt;

				// if player dies ------------------------------------------------------
				if(target.health<=0){
					console.log(`${attacker.name} killed ${target.name} with her ${attacker.weapon}!`);
					target.setTint(0xff0000);
					target.isAlive = false;
					target.setVelocityX(0);
					target.setVelocityY(0);
				} else {

					//play damage animation ----------------------------------------------
					target.setTint(0xff0000);
					attacker.scene.time.addEvent({ delay: 400, callback: () => {target.setTint(0xffffff);}, callbackScope: this });
					console.log(`${attacker.name} attacked ${target.name} for ${damageDealt} damage with their ${attacker.weapon}, ${target.name} has ${target.health}hp left`);
				}
			}

			// if player dodges attack--------------------------------------------------
		} else {
			console.log(`${target.name} dodged ${attacker.name}'s attack`);
		}
	}

	// chest opening**************************************************************
	onOpen(player, chest){

		//if chest has already been opened, do nothing------------------------------
		if (chest.open == true) {
			return;
		} else {

			// add each item to player inventory--------------------------------------
			console.log(chest.loot);
			for (let i=0; chest.loot.length>i; i++){
				player.addItem(chest.loot[i]);
			}

			// set chest to open------------------------------------------------------
			chest.setTexture('open-chest');
			chest.open = true;
		}
	}

	//spawn methods***************************************************************

	// spawn all the enemies------------------------------------------------------
	spawn(scene, group, player, toSpawn, spawnSprite, spawnDistanceMin, spawnDistanceMax) {
		//random room-------------------------------------------------------------
		let randRoom = Math.floor(Math.random()*scene.dungeonMap.rooms.length);

		// generate coordinates from room-----------------------------------------
		let coordX=scene.dungeonMap.rooms[randRoom].x+Math.floor(Math.random()*((scene.dungeonMap.rooms[randRoom].w/scene.dungeonMap.w)-1))*scene.dungeonMap.w;
		let coordY=scene.dungeonMap.rooms[randRoom].y+Math.floor(Math.random()*((scene.dungeonMap.rooms[randRoom].h/scene.dungeonMap.w)-1))*scene.dungeonMap.w;
		// if out of bounds--------------------------------------------------------
		if(Math.abs(coordX-player.x)<spawnDistanceMin || Math.abs(coordY-player.y)<spawnDistanceMin){
			return;

			//if everything is ok, spawn mobs---------------------------------------
		}	else {
			toSpawn = group.create(coordX, coordY, spawnSprite);
		}
	}

	//generate traps -------------------------------------------------------------
	trapGeneration(scene, spawnThreshold){

		while (scene.traps.countActive(true)<spawnThreshold) {
			let texture = "trap";
			// generate a trap in a random cell in the world--------------------------
			let randCell = Math.round(Math.random()*(scene.dungeonMap.spawnCells.length-1));
			let xCoord = scene.dungeonMap.spawnCells[randCell].x;
			let yCoord = scene.dungeonMap.spawnCells[randCell].y;

			//prevent from spawning inside player cell on generation------------------
			if(xCoord == scene.player.x && yCoord == scene.player.y){
				return;
			}
			scene.trapList.trap.weapon
			scene.trap = scene.traps.create(xCoord, yCoord, texture);

			// set trap properties----------------------------------------------------
			let randomTrap = Math.floor(Math.random()*(scene.trapList.trap.length-1));
			scene.trap.name = scene.trapList.trap[randomTrap].name;
			scene.trap.weapon = scene.trapList.trap[randomTrap].name;
			scene.trap.combat = scene.trapList.trap[randomTrap].trigger;
			scene.trap.damage = scene.trapList.trap[randomTrap].damage;
			// scene.trap.setTexture(scene.trapList.trap[randomTrap].name);

			scene.trap.setImmovable(true);
		}
	}
	//generate chests ------------------------------------------------------------
	chestGeneration(scene, spawnThreshold){
		while (scene.chests.countActive(true)<spawnThreshold) {
			//generate on a random room-----------------------------------------------
			let randRoom = Math.floor(Math.random()*scene.dungeonMap.rooms.length);
			let coordX=scene.dungeonMap.rooms[randRoom].x+Math.round(Math.random()*((scene.dungeonMap.rooms[randRoom].w/scene.dungeonMap.w)-1))*scene.dungeonMap.w;
			let coordY=scene.dungeonMap.rooms[randRoom].y+Math.round(Math.random()*((scene.dungeonMap.rooms[randRoom].h/scene.dungeonMap.w)-1))*scene.dungeonMap.w;

			//place chest in along walls
			let randomWall = Math.floor(Math.random()*3);
			switch (randomWall) {
				case 0:
				coordX = scene.dungeonMap.rooms[randRoom].x;
				break;
				case 1:
				coordY = scene.dungeonMap.rooms[randRoom].y;
				break;
				case 2:
				coordX = scene.dungeonMap.rooms[randRoom].x+scene.dungeonMap.rooms[randRoom].w-scene.dungeonMap.w;
				break;
				case 3:
				coordY = scene.dungeonMap.rooms[randRoom].y+scene.dungeonMap.rooms[randRoom].h-scene.dungeonMap.w;
				break;
			}

			// add to physics group-----------------------------------------------------
			scene.chest = scene.chests.create(coordX, coordY, 'chest');

			//add properties------------------------------------------------------------
			scene.chest.onLootGen(scene, scene.chest);
			scene.chest.setImmovable(true);
		}
	}
}
