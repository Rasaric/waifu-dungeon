/*******************************************************************************


Pathfinding


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import EasyStar from 'EasyStarJs'

export default class Pathfinding {
  constructor(scene) {
    let dungeon = scene.dungeonMap.grid;
    scene.finder = new EasyStar.js();
  }

  //Pathfinder *****************************************************************
  //parse grid for walkable cells-----------------------------------------------
  mapParse(scene){
    scene.getTileID = function(x,y){
      var tile = scene.dungeonMap.grid.getTileAt(x, y);
      // find output of getTileAt
      return tile.index;
    };

    var grid = [];
    for(var y = 0; y < scene.dungeonMap.cols; y++){
      var col = [];
      for(var x = 0; x < scene.dungeonMap.rows; x++){
        // In each cell we store the ID of the tile, which corresponds
        // to its index in the tileset of the map ("ID" field in Tiled)
        col.push(x);
        // figure out what info is required HERE
        // col.push(Game.getTileID(x,y));
      }
      grid.push(col);
    }
    scene.finder.setGrid(grid);
    let acceptableTiles = [];
    for(var i = 0; i < scene.dungeonMap.grid.length; i++){
      if(scene.dungeonMap.grid[i].empty==true){acceptableTiles.push(i)};
    }
    scene.finder.setAcceptableTiles(acceptableTiles);
  }
}
