/*******************************************************************************


Enemy Constructor - Grunt


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

	/*character Methods**********************************************************/

	//attack----------------------------------------------------------------------
	onFight(target, attacker){
		//prevent attack spamming
		if (attacker.cooldown==true) {
			return;
		}	else {
			attacker.cooldown = true;
			this.scene.time.addEvent({ delay: attacker.attackCooldown, callback: () => {attacker.cooldown=false; console.log('can attack again');}, callbackScope: this });
		}

		//knockback-----------------------------------------------------------------
		target.isKnockedback = true;
		target.setVelocity(0);

		// calculate angle
		let xAngle = (target.x-attacker.x)*attacker.knockbackSpeed;
		let yAngle = (target.y-attacker.y)*attacker.knockbackSpeed;

		// set speed character is knocked back
		target.setVelocityY(yAngle);
		target.setVelocityX(xAngle);

		// after a moment, return to static
		this.scene.time.addEvent({ delay: 100, callback:  () => {target.isKnockedback = false;}, callbackScope: this });

		//roll for attack, defense and damage---------------------------------------
		let atkRoll = Math.floor(Math.random()*10)+attacker.combat;
		let defRoll = Math.floor(Math.random()*10)+target.dodge;
		let damageRoll = Math.floor(Math.random()*attacker.damage);

		//check values and resolve combat outcome
		if (atkRoll>defRoll) {
			let damageDealt = damageRoll-target.armor;
			if (damageDealt<=0) {
				console.log(`${attacker.name} barely glanced ${target.name}'s ${target.armorName}`);
			}	else {
				target.health = target.health-damageDealt;
				if(target.health<=0){
					console.log(`${attacker.name} killed ${target.name} with her ${attacker.weapon}!`);
					target.setTint(0xff0000);
					target.isAlive = false;
					target.setVelocityX(0);
					target.setVelocityY(0);
				} else {
					target.setTint(0xff0000);
					this.scene.time.addEvent({ delay: 400, callback: () => {target.setTint(0xffffff);}, callbackScope: this });
					console.log(`${attacker.name} attacked ${target.name} for ${damageDealt} damage with their ${attacker.weapon}, ${target.name} has ${target.health}hp left`);
				}
			}
		} else {
			console.log(`${target.name} dodged ${attacker.name}'s attack`);
		}
	}

	// spawn all the enemies------------------------------------------------------
	spawn(scene, group, player, toSpawn, spawnSprite, spawnThreshold, spawnDistanceMin, spawnDistanceMax) {
		if(group.countActive(true)<spawnThreshold) {
			//random room-------------------------------------------------------------
			let randRoom = Math.floor(Math.random()*scene.dungeonMap.rooms.length);

			// generate coordinates from room-----------------------------------------
			let coordX=scene.dungeonMap.rooms[randRoom].x+Math.floor(Math.random()*((scene.dungeonMap.rooms[randRoom].w/scene.dungeonMap.w)-1))*scene.dungeonMap.w;
			let coordY=scene.dungeonMap.rooms[randRoom].y+Math.floor(Math.random()*((scene.dungeonMap.rooms[randRoom].h/scene.dungeonMap.w)-1))*scene.dungeonMap.w;

			// if out of bounds--------------------------------------------------------
			if (coordX <= 0 || coordY <= 0 || coordX >= (scene.dungeonMap.cols*scene.dungeonMap.w) || coordY >= (scene.dungeonMap.cols*scene.dungeonMap.w)){
				return;

				//if too close----------------------------------------------------------
			} else if(Math.abs(coordX-player.x)<spawnDistanceMin || Math.abs(coordY-player.y)<spawnDistanceMin){
				return;

				//if everything is ok, spawn mobs---------------------------------------
			}	else {
				toSpawn = group.create(coordX, coordY, spawnSprite);
				scene.physics.add.collider(player, toSpawn, toSpawn.onFight, null, this);
				scene.physics.add.collider(toSpawn, scene.walls);
			}
		}
	}
	trapGeneration(scene, spawnThreshold){
		if(scene.traps.countActive(true)<spawnThreshold) {
			//let trapId = Math.round(Math.random()*trapList.length);
			// let texture = traplist[trapId].texture;
			let texture = "trap";
			// generate a trap in a random cell in the world--------------------------
			let randCell = Math.round(Math.random()*scene.dungeonMap.spawnCells.length);
			let xCoord = scene.dungeonMap.spawnCells[randCell].x;
			let yCoord = scene.dungeonMap.spawnCells[randCell].y;

			//prevent from spawning inside player cell on generation------------------
			if(xCoord == scene.player.x && yCoord == scene.player.y){
				return;
			}

			scene.trap = scene.traps.create(xCoord, yCoord, texture);

			// set trap properties----------------------------------------------------
			scene.trap.weapon = 'neurotoxin';
			scene.trap.setImmovable(true);
			scene.physics.add.overlap(scene.player, scene.traps, scene.trap.onFight, null, this);
		}
	}
}
