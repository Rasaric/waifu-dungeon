/*******************************************************************************


Game Logic


*******************************************************************************/
//required**********************************************************************
import Phaser from 'phaser'
import Character from '../characters/character'
//enemies-----------------------------------------------------------------------
import Grunt from '../enemies/grunt'
import Soldier from '../enemies/soldier'
import Boss from '../enemies/boss'
//enviroment--------------------------------------------------------------------
import Trap from '../enemies/trap'
//map---------------------------------------------------------------------------
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

    //map creation--------------------------------------------------------------
    this.dungeonMap = new DungeonMap(64, 100, 100, 10, 8, 5, 2);
    //dungW, dungRows, dungCols, dungAmount, dungSize, dungSizeMin, dungCorridorW
    this.dungeonMap.onGenerate(this);

    // spawning the player------------------------------------------------------
    let randRoom = Math.floor(Math.random()*this.dungeonMap.rooms.length);
    let coordX=this.dungeonMap.rooms[randRoom].x+Math.round(Math.random()*((this.dungeonMap.rooms[randRoom].w/this.dungeonMap.w)-1))*this.dungeonMap.w;
    let coordY=this.dungeonMap.rooms[randRoom].y+Math.round(Math.random()*((this.dungeonMap.rooms[randRoom].h/this.dungeonMap.w)-1))*this.dungeonMap.w;

    //import player sprite------------------------------------------------------
    this.player = new Character(this, coordX, coordY, 'player', 64, 64, 'bare hands', 'nude body', 10, 1000);
    // player properties
    this.physics.add.collider(this.player, this.walls);
    // //set camera to follow character
    this.cameras.main.startFollow(this.player, true);

    // //single grunt for testing
    // this.grunt = new Grunt(this, coordX, coordY+100, 'grunt',64 , 64, 'rusty sword', 'tattered robes', 10);

    //enemies-------------------------------------------------------------------
    this.grunts = this.physics.add.group({ classType: Grunt });
    this.soldiers = this.physics.add.group({ classType: Soldier });
    this.bosses = this.physics.add.group({ classType: Boss });
    // enviroment --------------------------------------------------------------
    this.traps = this.physics.add.group({ classType: Trap });


  }
  //update game state***********************************************************
  update() {
    //update inputs-------------------------------------------------------------
    this.player.controls(this.keys, this.spacebar, this.player);

    //spawn check --------------------------------------------------------------
    this.player.trapGeneration(this, 50);
    this.player.spawn(this, this.grunts, this.player, this.grunt, 'grunt', 20, 300, 2000);
    this.player.spawn(this, this.soldiers, this.player, this.soldier, 'grunt', 10, 500, 3000);
    this.player.spawn(this, this.bosses, this.player, this.boss, 'grunt', 1, 1500, 4000);
  }
}
