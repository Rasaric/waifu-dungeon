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
		this.scene.physics.world.enable(this);
    this.setImmovable(false);
    this.setCollideWorldBounds(true);
    scene.add.existing(this);

		//attributes****************************************************************
		//basic attributes
		this.name= 'Grunt';
		//stats
		this.health = 1;
		this.combat = 1;
		this.dodge = 1;
		this.damage = 2;
		this.weapon = "Rusted Sword";
		this.armor = 1;
		this.cooldown = false;
	}

	/*character Methods**********************************************************/

	//attack----------------------------------------------------------------------
	onFight(target){
		let atkRoll = Math.floor(Math.random()*10)+this.combat;
		let defRoll = Math.floor(Math.random()*10)+target.dodge;

		console.log(`attack ${atkRoll}, defense ${defRoll}`)

		if (atkRoll>defRoll) {
			damageDealt = target.armor-this.combat;
			if (damageDealt<=0) {console.log(`${this.name} barely glanced ${target.name}'s ${target.armor}`);}
			else{
				target.hp = target.hp-(target.armor-this.combat);
				if(target.hp<=0){
					console.log(`${this.name} killed ${target.name} with her ${this.weapon}!`);
					target.isAlive=false;
				} else {
					console.log(`${this.name} attacked ${target.name} for ${this.damage} damage with their ${this.weapon}, ${target.name} has ${target.hp}hp left`);
				}
			}
		} else {
			console.log(`${target.name} dodged ${this.name}'s attack`);
		}
	}
  //AI--------------------------------------------------------------------------
  //AI will go here likely but for now its a sandbag
}
