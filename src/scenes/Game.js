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
    this.grunt = new Grunt(this, 600, 330, 'grunt')

    //grunts--------------------------------------------------------------------
    // this.grunt = this.physics.add.group({
    //   classType: Grunt,
    //   key: 'grunt',
    //   repeat: 5,
    //   setXY: { x: 64, y: 64, stepX: 70, stepY: 30 },
    //   setDisplaySize: {width: this.displayWidth, height: this.displayHeight}
    // });

    // //set camera to follow character
    this.cameras.main.startFollow(this.player, true);

    //collisions----------------------------------------------------------------
    this.physics.add.overlap(this.player, this.grunt, this.grunt.onFight, null, this.grunt);
  }

  //update game state*************************************************************
  update() {
    this.player.controls(this.keys, this.spacebar);

  }
}
