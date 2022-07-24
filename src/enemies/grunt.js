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
	onFight(target, grunt){
		//prevent grunt from attack spamming
		if (this.cooldown==true) {return;
		}	else {
			this.cooldown = true;
			setTimeout(() => {this.cooldown=false},1000)
		}
		//knockback**NOT WORKING
		target.setVelocityY(-1000);
		setTimeout(()=>target.setVelocityY(0),300);

		//roll for atack, defense and damage
		let atkRoll = Math.floor(Math.random()*10)+this.combat;
		let defRoll = Math.floor(Math.random()*10)+target.dodge;
		let damageRoll = Math.floor(Math.random()*this.damage);

		//check values and resolve combat outcome
		if (atkRoll>defRoll) {
			let damageDealt = damageRoll-target.armor;
			if (damageDealt<=0) {console.log(`${this.name} barely glanced ${target.name}'s ${target.armorName}`);}
			else{
				target.health = target.health-damageDealt;
				if(target.health<=0){
					console.log(`${this.name} killed ${target.name} with her ${this.weapon}!`);
					target.isAlive=false;
				} else {
					console.log(`${this.name} attacked ${target.name} for ${damageDealt} damage with their ${this.weapon}, ${target.name} has ${target.health}hp left`);
				}
			}
		} else {
			console.log(`${target.name} dodged ${this.name}'s attack`);
		}
	}
  //AI--------------------------------------------------------------------------
  //AI will go here likely but for now its a sandbag
}
