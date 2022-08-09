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
import GameMaster from '../environment/gameMaster'
import Trap from '../environment/trap'
import Item from '../environment/item'
import Chest from '../environment/chest'
//map---------------------------------------------------------------------------
import DungeonMap from '../map/map'

//initiate game instance********************************************************
export default class Game extends Phaser.Scene {

  constructor()	{
    super('game')
  }
  //preload*********************************************************************
  preload() {
  }
  //create**********************************************************************
  create() {
    // create a Game Master-----------------------------------------------------
    this.gameMaster = new GameMaster(this);
    //load JSON data -----------------------------------------------------------
    this.lootList = this.cache.json.get('loot');
    this.trapList = this.cache.json.get('traps');

    // create item deck---------------------------------------------------------
    this.lootDeck = [];
    for (let i = 0; this.lootList.loot.length > i; i++) {
      // create copies of items based on rarity---------------------------------
      while (this.lootList.loot[i].rarity>0){
        this.loot = new Item (this.lootList.loot[i].name, this.lootList.loot[i].url, this.lootList.loot[i].combat, this.lootList.loot[i].dodge, this.lootList.loot[i].damage, this.lootList.loot[i].armor, this.lootList.loot[i].flavor);
        this.lootDeck.push(this.loot);
        this.lootList.loot[i].rarity--
      }
    }

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

    // //set camera to follow character-----------------------------------------
    this.cameras.main.startFollow(this.player, true);

    // //single grunt for testing
    // this.grunt = new Grunt(this, coordX, coordY+100, 'grunt',64 , 64, 'rusty sword', 'tattered robes', 10);

    //enemies-------------------------------------------------------------------
    this.grunts = this.physics.add.group({ classType: Grunt });
    this.soldiers = this.physics.add.group({ classType: Soldier });
    this.bosses = this.physics.add.group({ classType: Boss });
    // enviroment --------------------------------------------------------------
    this.traps = this.physics.add.group({ classType: Trap });
    this.chests = this.physics.add.group({ classType: Chest });
    this.gameMaster.trapGeneration(this, 50);
    this.gameMaster.chestGeneration(this, 30);

    // collisions --------------------------------------------------------------
    this.physics.add.collider(this.player, this.grunts, this.gameMaster.onFight, null, this);
    this.physics.add.collider(this.player, this.soldiers, this.gameMaster.onFight, null, this);
    this.physics.add.collider(this.player, this.bosses, this.gameMaster.onFight, null, this);

    this.physics.add.overlap(this.player, this.traps, this.gameMaster.onFight, null, this);
    this.physics.add.overlap(this.player, this.chests, this.gameMaster.onOpen, null, this);

    // map collisions ----------------------------------------------------------
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.grunts, this.walls);


  }
  //update game state***********************************************************
  update() {
    //update inputs-------------------------------------------------------------
    this.player.controls(this.keys, this.spacebar, this.player);
    //spawn check --------------------------------------------------------------

    this.gameMaster.spawn(this, this.grunts, this.player, this.grunt, 'grunt', 20, 300, 2000);
    this.gameMaster.spawn(this, this.soldiers, this.player, this.soldier, 'grunt', 10, 500, 3000);
    this.gameMaster.spawn(this, this.bosses, this.player, this.boss, 'grunt', 1, 1500, 4000);

  }
}
