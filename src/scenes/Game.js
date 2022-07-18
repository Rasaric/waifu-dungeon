import Phaser from 'phaser'

// import { debugDraw } from '../utils/debug'
// import { createLizardAnims } from '../anims/EnemyAnims'
// import { createCharacterAnims } from '../anims/CharacterAnims'
// import { createChestAnims } from '../anims/TreasureAnims'
//
// import Lizard from '../enemies/Lizard'
//
// import '../characters/Faune'
// import Faune from '../characters/Faune'
//
// import { sceneEvents } from '../events/EventsCenter'
// import Chest from '../items/Chest'
let player = "";
let keys = "";
let inventory = [];

export default class Game extends Phaser.Scene {
	// private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	// private faune!: Faune
  //
	// private knives!: Phaser.Physics.Arcade.Group
	// private lizards!: Phaser.Physics.Arcade.Group
  //
	// private playerLizardsCollider?: Phaser.Physics.Arcade.Collider

	constructor()
	{
		super('game')
	}

	preload()
    {
		// this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
      //import floor sprite
      this.add.image(600, 430, 'floor');

      //import player sprite, configure colision and set fixed height & width
      player = this.physics.add.sprite(600, 430, 'player');
      player.setCollideWorldBounds(true);
      player.displayWidth= 64;
      player.displayHeight= 64;
      //populate inputs
      keys = this.input.keyboard.addKeys("W,A,S,D,E,F");
    }

	// private handlePlayerChestCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	// {
	// 	const chest = obj2 as Chest
	// 	this.faune.setChest(chest)
	// }
  //
	// private handleKnifeWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	// {
	// 	this.knives.killAndHide(obj1)
	// }
  //
	// private handleKnifeLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	// {
	// 	this.knives.killAndHide(obj1)
	// 	this.lizards.killAndHide(obj2)
	// }
  //
	// private handlePlayerLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	// {
	// 	const lizard = obj2 as Lizard
  //
	// 	const dx = this.faune.x - lizard.x
	// 	const dy = this.faune.y - lizard.y
  //
	// 	const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
  //
	// 	this.faune.handleDamage(dir)
  //
	// 	sceneEvents.emit('player-health-changed', this.faune.health)
  //
	// 	if (this.faune.health <= 0)
	// 	{
	// 		this.playerLizardsCollider?.destroy()
	// 	}
	// }

	update() {
    player.setVelocity(0);
      //horizontal movement
    if (keys.A.isDown) {
      player.setVelocityX(-160);
    } else if (keys.D.isDown) {
      player.setVelocityX(160);
    }
  //vertical movement
    if (keys.W.isDown) {
      player.setVelocityY(-160);
    } else if (keys.S.isDown) {
      player.setVelocityY(160);
    }

    if (keys.E.isDown) {
      //open inventory
      console.log('inventory screen:' + inventory);
    }
    if (keys.F.isDown) {
      //open inventory
      console.log('attack!');
    }
	}
}
