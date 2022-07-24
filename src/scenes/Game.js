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

    //determine player position, randomize position in safe area
    let playerPositionX = this.player.x + (Math.round(Math.random()) * 2 - 1)*(Math.floor(Math.random()*100))+100;
    let playerPositionY = this.player.y + (Math.round(Math.random()) * 2 - 1)*(Math.floor(Math.random()*100))+100;

    //single grunt for testing
    //this.grunt = new Grunt(this, 600, 300, 'grunt');

    //grunts--------------------------------------------------------------------
    this.grunts = this.physics.add.group({ classType: Grunt });
    // if(this.grunts.countActive(true)<=5) { //if less than 5 grunts
    //   //generate a grunt a safe distance from the player
    //   var playerPositionX = this.player.x + (Math.round(Math.random()) * 2 - 1)*(Math.floor(Math.random()*100))+100;
    //   var playerPositionY = this.player.y + (Math.round(Math.random()) * 2 - 1)*(Math.floor(Math.random()*100))+100;
    //   this.grunt = this.grunts.create(playerPositionX, playerPositionY, 'grunt');
    //   this.grunt.setCollideWorldBounds(true);
    // }

    //this.grunt = this.grunts.create(playerPositionX, playerPositionY, 'grunt');


    // //set camera to follow character
    this.cameras.main.startFollow(this.player, true);

    //collisions----------------------------------------------------------------
    //this.physics.add.overlap(this.player, this.grunts, this.grunt.onFight, null, this.grunt);
  }

  //update game state*************************************************************
  update() {
    this.player.controls(this.keys, this.spacebar);

    if(this.grunts.countActive(true)<=20) { //if less than 5 grunts
      //generate a grunt a safe distance from the player
      //generate an angle
      let angle = (Math.random()*Math.PI*2);

      // console.log("angle: " + angle);
      //set max radius
      let randX = Math.random()*300;
      let randY = Math.random()*300;
      let radiusX = Math.cos(angle) * randX;
      let radiusY = Math.sin(angle) * randY;

      //min radius
      let minRadX = Math.cos(angle) * 200;
      let minRadY = Math.sin(angle) * 200;

      //player relative coordinate
      let playerPositionX = this.player.x + radiusX;
      let playerPositionY = this.player.y + radiusY;

      if(Math.abs(radiusX)<Math.abs(minRadX) || Math.abs(radiusY)<Math.abs(minRadY)){
        //if point in angle is below roo radius
        return;
      } else {
        this.grunt = this.grunts.create(playerPositionX, playerPositionY, 'grunt');
        this.grunt.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.grunts, this.grunt.onFight, null, this.grunt);
         //console.log(randX + " " +  randY);
      }
    }

  }
}
