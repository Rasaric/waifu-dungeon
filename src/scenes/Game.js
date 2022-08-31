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
import Weapon from '../characters/weapon'
import Vision from '../environment/vision'
//map---------------------------------------------------------------------------
import DungeonMap from '../map/map'
import Pathfinding from '../map/pathfinding'

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
    this.pathfinder = new Pathfinding(this);
    this.pathfinder.mapParse(this);

    // spawning the player------------------------------------------------------
    let randRoom = Math.floor(Math.random()*this.dungeonMap.rooms.length);
    let coordX=this.dungeonMap.rooms[randRoom].x+Math.round(Math.random()*((this.dungeonMap.rooms[randRoom].w/this.dungeonMap.w)-1))*this.dungeonMap.w;
    let coordY=this.dungeonMap.rooms[randRoom].y+Math.round(Math.random()*((this.dungeonMap.rooms[randRoom].h/this.dungeonMap.w)-1))*this.dungeonMap.w;

    //import player sprite------------------------------------------------------
    this.player = new Character(this, coordX, coordY, 'player', 64, 64, 'bare hands', 'nude body', 10, 1000);

    // //set camera to follow character-----------------------------------------
    this.cameras.main.startFollow(this.player, true);

    //fog of war----------------------------------------------------------------
    this.fog = new Vision(this);
    this.fog.fogOfWar(this);

    //enemies-------------------------------------------------------------------
    this.grunts = this.physics.add.group({ classType: Grunt });
    this.soldiers = this.physics.add.group({ classType: Soldier });
    this.bosses = this.physics.add.group({ classType: Boss });
    // enviroment --------------------------------------------------------------
    this.traps = this.physics.add.group({ classType: Trap });
    this.chests = this.physics.add.group({ classType: Chest });

    //single grunt for testing
    //this.grunt = this.grunts.create(coordX, coordY-64, 'grunt');

    //weapon properties --------------------------------------------------------
    this.weapons = this.physics.add.group({ classType: Weapon });
    this.weapon = this.weapons.create(this.player.x, this.player.y, 'bare hands');
    this.weapon.displayWidth = 64;
    this.weapon.displayHeight = 64;
    this.weapon.name = this.player.weapon;
    this.weapon.setActive(false).setVisible(false);
    this.weapon.setImmovable(true);

    // generate enviroment assets ----------------------------------------------
    // this.gameMaster.trapGeneration(this, 20);
    // this.gameMaster.chestGeneration(this, 10);

    // collisions --------------------------------------------------------------
    this.physics.add.collider(this.player, this.grunts, this.gameMaster.onFight, null, this);
    this.physics.add.collider(this.player, this.soldiers, this.gameMaster.onFight, null, this);
    this.physics.add.collider(this.player, this.bosses, this.gameMaster.onFight, null, this);

    this.physics.add.overlap(this.player, this.traps, this.gameMaster.onFight, null, this);
    this.physics.add.overlap(this.player, this.chests, this.gameMaster.onOpen, null, this);

    // map collisions ----------------------------------------------------------
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.grunts, this.walls);
    this.physics.add.collider(this.soldiers, this.walls);
    this.physics.add.collider(this.bosses, this.walls);

    //player combat ------------------------------------------------------------
    this.physics.add.overlap(this.grunts, this.weapons, this.gameMaster.onFight, null, this);
    this.physics.add.overlap(this.soldiers, this.weapons, this.gameMaster.onFight, null, this);
    this.physics.add.overlap(this.bosses, this.weapons, this.gameMaster.onFight, null, this);

    // mob spawning ------------------------------------------------------------
    while(this.grunts.countActive(true) < 20) {this.gameMaster.spawn(this, this.grunts, this.player, this.grunt, 'grunt', 300, 2000)};
    while(this.soldiers.countActive(true) < 10) {this.gameMaster.spawn(this, this.soldiers, this.player, this.soldier, 'grunt', 500, 3000)};
    while(this.bosses.countActive(true) < 1) {this.gameMaster.spawn(this, this.bosses, this.player, this.boss, 'grunt', 1500, 4000)};
  }

  //update game state***********************************************************
  update() {

    //update inputs-------------------------------------------------------------
    this.player.controls(this.keys, this.spacebar, this);
    //this.grunt.fakePathfind(this.player, this.grunt);

    // pathfinding--------------------------------------------------------------
    for (var i=0; this.grunts.children.entries.length>i; i++){
      this.grunts.children.entries[i].fakePathfind(this.player, this.grunts.children.entries[i]);
    }
    for (var i=0; this.soldiers.children.entries.length>i; i++){
      this.soldiers.children.entries[i].fakePathfind(this.player, this.soldiers.children.entries[i]);
    }
    for (var i=0; this.bosses.children.entries.length>i; i++){
      this.bosses.children.entries[i].fakePathfind(this.player, this.bosses.children.entries[i]);
    }

    // this.soldiers.children.forEach(this.soldier.fakePathfind(this.player, this.soldier), this);
    // this.bosses.children.forEach(this.boss.fakePathfind(this.player, this.soldier), this);
    //let destination = this.grunt.onPatrol(this, this.grunt);

    // this.grunt.moveCharacter(this, destination);
  }
}
