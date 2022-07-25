/*******************************************************************************


Character Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'

export default class Character extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture)
		this.scene = scene

		//sprite attributes*********************************************************
		this.displayWidth= 64;
		this.displayHeight= 64;
		this.scene.physics.world.enable(this);
    this.setImmovable(false);
    this.setCollideWorldBounds(true);
    scene.add.existing(this);

		//attributes****************************************************************
		//basic attributes
		this.inventory = ['water bottle', 'eggs'];
		this.name= texture;
		//stats
		this.health = 10;
		this.combat = 1;
		this.dodge = 1;
		this.damage = 4;
		this.weapon = "bare hands";
		this.armor = 1;
		this.armorName = "Nude Body"
		this.cooldown = false;
		this.isKnockedback = false;
		this.cooldownSpeed = 500;
		this.isAlive = true;

	}

	/*character Methods**********************************************************/

	//controls--------------------------------------------------------------------
	controls(keys, space){
		if (this.isKnockedback == true || this.isAlive == false){
			return;
		} else {
			this.setVelocity(0);
			//horizontal movement
			if (keys.A.isDown) {
				this.setVelocityX(-160);
			} else if (keys.D.isDown) {
				this.setVelocityX(160);
			}
			//vertical movement
			if (keys.W.isDown) {
				this.setVelocityY(-160);
			} else if (keys.S.isDown) {
				this.setVelocityY(160);
			}

			//interaction---------------------------------------------------------------
			//attack
			if(Phaser.Input.Keyboard.JustDown(space)){
				if (this.cooldown==true) {
					return;
				}	else {
					this.cooldown = true;
					this.onFight('you');
					this.scene.scene.time.addEvent({ delay: 1000, callback: () => {this.cooldown=false}, callbackScope: this });
				}
			}
			//open inventory
			if(Phaser.Input.Keyboard.JustDown(keys.E)){
				console.log('inventory screen:' + this.inventory);
			}
		}

	}
	//attack function-------------------------------------------------------------
	onFight(target, attacker){
		//prevent grunt from attack spamming
		if (attacker.cooldown==true) {return;
		}	else {
			attacker.cooldown = true;
			this.scene.scene.time.addEvent({ delay: 1000, callback: () => {attacker.cooldown=false}, callbackScope: this });
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
		function resetControls() {
			target.isKnockedback = false
		}
		this.scene.scene.time.addEvent({ delay: 100, callback: resetControls, callbackScope: this });
		//setTimeout(() => {target.isKnockedback = false;},100);

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
						target.setVelocity(yAngle);
				} else {
					target.setTint(0xff0000);
					this.scene.scene.time.addEvent({ delay: 400, callback: () => {target.setTint(0xffffff);}, callbackScope: this });
					console.log(`${attacker.name} attacked ${target.name} for ${damageDealt} damage with their ${attacker.weapon}, ${target.name} has ${target.health}hp left`);
				}
			}
		} else {
			console.log(`${target.name} dodged ${attacker.name}'s attack`);
		}
	}

	// add item to inventory------------------------------------------------------
	addItem(item){
		this.inventory.push(item);
	}
}
