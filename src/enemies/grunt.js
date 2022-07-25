/*******************************************************************************


Enemy Constructor - Grunt


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
export default class Grunt extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture)
		this.scene = scene

		//sprite attributes*********************************************************
		this.displayWidth= 64;
		this.displayHeight= 64;
		this.scene.physics.world.enable(this);
		this.setCollideWorldBounds(true);
    this.setImmovable(false);
    scene.add.existing(this);

		//attributes****************************************************************
		//basic attributes
		this.name= 'Grunt';
		//stats
		this.health = 1;
		this.combat = 5;
		this.dodge = 1;
		this.damage = 8;
		this.weapon = "Rusted Sword";
		this.armor = 1;
		this.armorName = "tattered robes"
		this.cooldown = false;
	}

	/*character Methods**********************************************************/

	//attack----------------------------------------------------------------------
	onFight(target, attacker){
		//prevent grunt from attack spamming
		if (attacker.cooldown==true) {return;
		}	else {
			attacker.cooldown = true;
			setTimeout(() => {attacker.cooldown=false},1000)
		}
		//knockback
		target.isKnockedback = 'disable';
		target.setVelocity(0);
		let xAngle = (target.x-attacker.x)*10;
		let yAngle = (target.y-attacker.y)*10;
		target.body.velocity.x = xAngle;
		target.body.velocity.x = yAngle;

		//Phaser.Game.scene.keyboard.enabled = false;
		target.setVelocityY(yAngle);
		target.setVelocityX(xAngle);

		// this.time.addEvent({ delay: 300, callback: yourFunc, callbackScope: this });
		setTimeout(() => {target.isKnockedback = 'enable';},100);

		//roll for atack, defense and damage
		let atkRoll = Math.floor(Math.random()*10)+attacker.combat;
		let defRoll = Math.floor(Math.random()*10)+target.dodge;
		let damageRoll = Math.floor(Math.random()*attacker.damage);

		//check values and resolve combat outcome
		if (atkRoll>defRoll) {
			let damageDealt = damageRoll-target.armor;
			if (damageDealt<=0) {console.log(`${attacker.name} barely glanced ${target.name}'s ${target.armorName}`);}
			else{
				target.health = target.health-damageDealt;
				if(target.health<=0){
					console.log(`${attacker.name} killed ${target.name} with her ${attacker.weapon}!`);
					target.isAlive=false;
				} else {
					console.log(`${attacker.name} attacked ${target.name} for ${damageDealt} damage with their ${attacker.weapon}, ${target.name} has ${target.health}hp left`);
				}
			}
		} else {
			console.log(`${target.name} dodged ${attacker.name}'s attack`);
		}
	}
  //AI--------------------------------------------------------------------------
  //AI will go here likely but for now its a sandbag
}
