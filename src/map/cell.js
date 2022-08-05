/*******************************************************************************


Enemy Constructor - Grunt


*******************************************************************************/

//required----------------------------------------------------------------------

import Phaser from 'phaser'

export default class Cell extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, c, r){
    super(scene, x, y, texture);

    this.c = c //column it is in
    this.r = r //row it is in
    this.x = x //x coord
    this.y = y //y coord
    this.empty = false //empty or full?
    let dungeon = scene.dungeonMap
  }
  //draw the map----------------------------------------------------------------
  show (scene){
    if(this.empty == false) {
      // generate outer cells---------------------------------------------------
      scene.floor = scene.walls.create(this.x, this.y, 'empty');
      scene.floor.setImmovable(true);
    } else {
      // rooms cells------------------------------------------------------------
      scene.floor = scene.physics.add.sprite(this.x, this.y, 'tile');
      scene.dungeonMap.spawnCells.push(scene.floor);
    }
  }

  //carve out the rooms---------------------------------------------------------
  carve(dungeon, dis, x, y) {
    for (var i = 0; i < dungeon.rooms.length; i++) {
      if(this.c >= dungeon.rooms[i].y/dungeon.w && this.c < dungeon.rooms[i].y/dungeon.w+dungeon.rooms[i].h/dungeon.w && this.r >= dungeon.rooms[i].x/dungeon.w && this.r < dungeon.rooms[i].x/dungeon.w+dungeon.rooms[i].w/dungeon.w) {
        this.empty = true
      }
    }
  }

  //carve out the horizontal corridor-------------------------------------------
  carveH(dungeon,dis,x,y) {
    if(this.r >= x && this.r < x+dis && this.c < y+dungeon.corridorW && this.c > y-dungeon.corridorW)
    {
      this.empty = true
    }
  }

  //carve out the vertical corridor---------------------------------------------
  carveV(dungeon,dis,x,y) {
    if(this.c >= y && this.c < y+dis && this.r < x+dungeon.corridorW && this.r > x-dungeon.corridorW) {
      this.empty = true
    }
  }
}
