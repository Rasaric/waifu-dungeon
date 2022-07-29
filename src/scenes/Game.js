/*******************************************************************************


Game Logic


*******************************************************************************/
//required**********************************************************************
import Phaser from 'phaser'
import Character from '../characters/character'
import Grunt from '../enemies/grunt'
import Soldier from '../enemies/soldier'
import Boss from '../enemies/boss'
import DungeonMap from '../map/map'

//initiate game instance********************************************************
export default class Game extends Phaser.Scene {

  constructor()	{
    super('game')
  }
  //preload
  preload() {
  }
  //create**********************************************************************
  create() {
    //populate keys-------------------------------------------------------------
    this.keys = this.input.keyboard.addKeys("W,A,S,D,E,F");
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //import floor sprite-------------------------------------------------------
    //this.add.image(600, 430, 'floor');
    this.dungeonMap = new DungeonMap(64, 100, 100, 10, 8, 5, 2)
    //dungW, dungRows, dungCols, dungAmount, dungSize, dungSizeMin, dungCorridorW
    this.dungeonMap.onGenerate(this);
    let randRoom = Math.floor(Math.random()*this.dungeonMap.rooms.length)
    let coordX=this.dungeonMap.rooms[randRoom].x+(this.dungeonMap.rooms[randRoom].w/2);
    let coordY=this.dungeonMap.rooms[randRoom].y+(this.dungeonMap.rooms[randRoom].h/2);
    //import player sprite------------------------------------------------------
    this.player = new Character(this, coordX, coordY, 'player', 64, 64, 'bare hands', 'nude body', 10, 1000);

    this.dungeonMap.regenCollision(this, this.dungeonMap);
    // //single grunt for testing
    //this.grunt = new Grunt(this, 600, 300, 'grunt',64 , 64, 'rusty sword', 'tattered robes', 10);

    //enemies--------------------------------------------------------------------
    this.grunts = this.physics.add.group({ classType: Grunt });
    this.soldiers = this.physics.add.group({ classType: Soldier });
    this.bosses = this.physics.add.group({ classType: Boss });

    // //set camera to follow character
    this.cameras.main.startFollow(this.player, true);
  }
  //update game state***********************************************************
  update() {
    //update inputs-------------------------------------------------------------
    this.player.controls(this.keys, this.spacebar, this.player);

    //spawn check --------------------------------------------------------------

    // this.player.spawn(this, this.grunts, this.player, this.grunt, 'grunt', 5, 200, 300);
    // this.player.spawn(this, this.soldiers, this.player, this.soldier, 'grunt', 5, 250,300);
    // this.player.spawn(this, this.bosses, this.player, this.boss, 'grunt', 1, 300, 500);
  }
}
