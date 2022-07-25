/*******************************************************************************


Game Logic


*******************************************************************************/
//required**********************************************************************
import Phaser from 'phaser'
import Character from '../characters/character'
import Grunt from '../enemies/grunt'

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
    this.add.image(600, 430, 'floor');

    //import player sprite------------------------------------------------------
    this.player = new Character(this, 600, 430, 'player');

    //single grunt for testing
    //this.grunt = new Grunt(this, 600, 300, 'grunt');

    //grunts--------------------------------------------------------------------
    this.grunts = this.physics.add.group({ classType: Grunt });

    // //set camera to follow character
    this.cameras.main.startFollow(this.player, true);
  }

  //update game state***********************************************************
  update() {
    //update inputs-------------------------------------------------------------
    this.player.controls(this.keys, this.spacebar);

    //spawn grunts -------------------------------------------------------------
    if(this.grunts.countActive(true)<=20) {
      //generate a grunt a safe distance from the player
      //generate an angle
      let angle = (Math.random()*Math.PI*2);

      //generate a point within a taurus
      let radiusX = Math.cos(angle) * ((Math.random()*300)+200);
      let radiusY = Math.sin(angle) * ((Math.random()*300)+200);;

      //player relative coordinate
      let playerPositionX = this.player.x + radiusX;
      let playerPositionY = this.player.y + radiusY;

      this.grunt = this.grunts.create(playerPositionX, playerPositionY, 'grunt');
      this.grunt.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, this.grunts, this.grunt.onFight, null, this);
    }
  }
}
