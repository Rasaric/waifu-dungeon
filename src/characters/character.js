/*******************************************************************************


Character Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
// import Chest from '../items/Chest'

// import { sceneEvents } from '../events/EventsCenter'

//character builder-------------------------------------------------------------
// declare global {
// 	namespace Phaser.GameObjects 	{
// 		interface GameObjectFactory 		{
// 			character(x: number, y: number, texture: string, frame?: string | number): Player
// 		}
// 	}
// }

// enum HealthState
// {
// 	IDLE,
// 	DAMAGE,
// 	DEAD
// }

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
		this.isKnockedback = 'enable'

		// get health() 	{
		// 	return this.health
		// }
		//collisions****************************************************************
		// this.physics.add.collider(this.player, this.wall);
    // this.physics.add.overlap(this.player, this.chest, function (player, chest) {
    //     goldPickupAudio.play();
    //     chest.destroy();
    // });
	}

	/*character Methods**********************************************************/

	//controls--------------------------------------------------------------------
	controls(keys, space){
		if (this.isKnockedback=='disable'){
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
				if (this.cooldown==true) {return;
				}	else {
					this.cooldown = true;
					this.onFight('you');
					setTimeout(() => {this.cooldown=false},500)
				}
			}
			//open inventory
			if(Phaser.Input.Keyboard.JustDown(keys.E)){
				console.log('inventory screen:' + this.inventory);
			}
		}

	}
	//attack----------------------------------------------------------------------

	onFight(target, player){
		target.setVelocityY(-1000);
		setTimeout(()=>target.setVelocityX(0),100)
		let atkRoll = Math.floor(Math.random()*10)+this.combat;
		let defRoll = Math.floor(Math.random()*10)+target.dodge;
		let damageRoll = Math.floor(Math.random()*this.damage);

		console.log(`attack ${atkRoll}, defense ${defRoll}`)

		if (atkRoll>defRoll) {
			let damageDealt = damageRoll-target.armor;
			console.log('damage: ' + damageDealt);
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

	addItem(item){
		this.inventory.push(item);
	}

	// preUpdate(t: number, dt: number) {
	// 	super.preUpdate(t, dt)
	//
	// 	switch (this.healthState)	{
	// 		case HealthState.IDLE:
	// 			break
	//
	// 		case HealthState.DAMAGE:
	// 			this.damageTime += dt
	// 			if (this.damageTime >= 250){
	// 				this.healthState = HealthState.IDLE
	// 				this.setTint(0xffffff)
	// 				this.damageTime = 0
	// 			}
	// 			break
	// 	}
	// }
}
