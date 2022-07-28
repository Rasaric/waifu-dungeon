/*******************************************************************************


Dungeon Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'

export default class DungeonMap {
  constructor(dungW, dungRows, dungCols, dungAmount, dungSize, dungSizeMin, dungCorridorW) {// 20, 50, 50, 10, 5, 5, 1
    // this.canvas = document.getElementById('game');//create canvas
    // this.canvasContext = canvas.getContext('2d'); //make it 2d
    this.w = dungW; //width of tiles

    this.rows = dungRows; //how many rows of tiles
    this.cols= dungCols; //how many cols of tiles

    this.grid = []; //where we store the map

    this.rooms = []; //where we store the rooms
    this.collide = false; //whether or not the rooms are colliding

    this.amount = dungAmount; //amount of rooms
    this.size = dungSize;	//the actuall size will be a number bettween 5 and 10 | e.g: size+sizeMin
    this.sizeMin = dungSizeMin;

    this.disX; //distance x between rooms
    this.disY; //distance y between rooms
    this.corridorW = dungCorridorW //corridor width
  }

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  onGenerate(scene){
    console.log(`width:${this.w} rows:${this.rows}, columns:${this.cols}, amount of rooms:${this.amount}, size of room:${this.size}, min size:${this.sizeMin}, corridor width:${this.corridorW}`);

    function Cell(dungeon, c, r, x, y){//cell object
      this.c = c //column it is in
      this.r = r //row it is in
      this.x = x //x coord
      this.y = y //y coord
      this.empty = false //empty or full?

      this.show = function(){  //draw the map

        if(this.empty == false) {
          console.log(this.x, this.y, this.c, this.r, dungeon.w, dungeon.w);
          //scene.add.image(this.x, this.y, 'floor');
          // canvasContext.fillStyle = "#323232"
          // canvasContext.fillRect(this.x, this.y, dungeon.w, dungeon.w)//change this to select random tile from tile array
        } else {
          console.log("empty cell " + this.x, this.y);
          // canvasContext.fillStyle = "#696966"
          // canvasContext.fillRect(this.x, this.y, w, w)
        }
      }

      this.carve = function(dungeon, dis, x, y) { //carve out the rooms
        for (var i = 0; i < dungeon.rooms.length; i++) {
          if(this.c >= dungeon.rooms[i].y/dungeon.w && this.c < dungeon.rooms[i].y/dungeon.w+dungeon.rooms[i].h/dungeon.w && this.r >= dungeon.rooms[i].x/dungeon.w && this.r < dungeon.rooms[i].x/dungeon.w+dungeon.rooms[i].w/dungeon.w) {
            this.empty = true
          }
        }
      }

      this.carveH = function(dis,x,y) {//carve out the horizontal corridor
        if(this.r >= x && this.r < x+dis && this.c < y+dungeon.corridorW && this.c > y-dungeon.corridorW)
        {
          this.empty = true
        }
      }
      this.carveV = function(dis,x,y) {//carve out the vertical corridor
        if(this.c >= y && this.c < y+dis && this.r < x+dungeon.corridorW && this.r > x-dungeon.corridorW) {
          this.empty = true
        }
      }
    }


    function makeGrid(dungeon) {//create the array of tiles
      for (var r = 0; r < dungeon.rows; r++) {
        for (var c = 0; c < dungeon.cols; c++) {
          var y = c*dungeon.w
          var x = r*dungeon.w
          var cell = new Cell(dungeon, c, r, x, y);
          dungeon.grid.push(cell);
        }
      }
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    function Room(dungeon, x, y, width, height, i) {//room object
      this.x = (x-1)*dungeon.w; //column
      this.y = (y-1)*dungeon.w; //row
      this.w = width*dungeon.w; //width
      this.h = height*dungeon.w; //height

      this.center = [Math.floor(this.x/dungeon.w+width/2), Math.floor(this.y/dungeon.w+height/2)]//center

      //debug
      this.draw = function() {//draw the number of the room
        console.log("room number " + i, this.x+this.w/2, this.y+this.h/2-20);
        // scene.fillStyle = "white"
        // scene.fillText(i, this.x+this.w/2, this.y+this.h/2-20)
      }
    }

    function createRooms(dungeon) {//create the rooms
      for (var i = 0; i < dungeon.amount; i++) { //for the amount of rooms you want
        var room = new Room(dungeon, Math.floor(Math.random()*dungeon.rows)+1, Math.floor(Math.random()*dungeon.cols)+1, Math.floor(Math.random()*dungeon.size)+dungeon.sizeMin, Math.floor(Math.random()*dungeon.size)+dungeon.sizeMin, i)
        //create a room object ^

        if(i > 0) {//if not the first room
          if(dungeon.rooms[0].x+dungeon.rooms[0].w >= scene.width || dungeon.rooms[0].x <= 0 || dungeon.rooms[0].y+dungeon.rooms[0].h >= scene.height || dungeon.rooms[0].y <= 0) {//if first room is outside the canvas
            dungeon.rooms = [] //restart
            createRooms(dungeon);
            break;
          }

          for (var e = 0; e < dungeon.rooms.length; e++) { //for all the previous rooms
            dungeon.collide = false//they are not colliding

            if(room.x <= dungeon.rooms[e].x+dungeon.rooms[e].w && room.x+room.w >= dungeon.rooms[e].x && room.y <= dungeon.rooms[e].y+dungeon.rooms[e].h && room.y+room.h >= dungeon.rooms[e].y) {//if colliding with previous room
              dungeon.collide = true;//kill room
              i--
              break;
            } else if (room.x+room.w >= scene.width || room.x <= 0 || room.y+room.h >= scene.height || room.y <= 0) { //if outside of canvas
              dungeon.collide = true;//kill room
              i--;
              break;
            }
          }
        }

        if(dungeon.collide == false) {//if they have not collided
          dungeon.rooms.push(room) //add room to the array
          if(i>0) { //make corridors
            hCorridor(dungeon, dungeon.rooms[i-1].center[0], room.center[0], dungeon.rooms[i-1].center[1], room.center[1])
            vCorridor(dungeon, dungeon.rooms[i-1].center[0], room.center[0], dungeon.rooms[i-1].center[1], room.center[1])
          }
        }
      }
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    function hCorridor(dungeon, x1,x2,y1,y2) {//horizontal corridor creator
      if(x1 > x2) {//if the first room is further towards the right then the second one
        dungeon.disX = x1-x2 //find the distance between rooms
        dungeon.disX += 1

        for (var i = 0; i < dungeon.grid.length; i++) {
          dungeon.grid[i].carveH(dungeon.disX, x2, y2)//carve out the corridor
        }
      } else { //if the second room is further towards the right then the first one
        dungeon.disX = x2 - x1 //find the distance between rooms
        dungeon.disX += 1
        for (var i = 0; i < dungeon.grid.length; i++) {
          dungeon.grid[i].carveH(dungeon.disX, x1, y1)//carve out corridor
        }
      }
    }

    function vCorridor(dungeon, x1,x2,y1,y2) {//vertical corridor creator
      var x;

      if(y1 > y2) {//if the first room is further towards the bottom then the second one
        dungeon.disY = y1-y2 //find the distance between rooms
        dungeon.disY += 1

        if(x2+(dungeon.disX-1) > x1+(dungeon.disX-1)) {//find the correct x coord
          x = x2
        } else {
          x = x2+(dungeon.disX-1)
        }

        for(var i = 0; i < dungeon.grid.length; i++) {
          dungeon.grid[i].carveV(dungeon.disY, x, y2)//carve out corridor
        }
      } else{ //if the second room is further towards the bottom then the first one

        dungeon.disY = y2 - y1 //find the distance between rooms
        dungeon.disY += 1

        if(x1+(dungeon.disX-1) > x2+(dungeon.disX-1)) {//find the correct x coord
          x = x1
        } else {
          x = x1+(dungeon.disX-1)
        }

        for (var i = 0; i < dungeon.grid.length; i++) {
          dungeon.grid[i].carveV(dungeon.disY, x, y1)//carve out corridor
        }
      }
    }

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////


    function draw(dungeon) {
      for (var i = 0; i < dungeon.grid.length; i++) {
        dungeon.grid[i].carve(dungeon);//carve out the rooms
        dungeon.grid[i].show();//draw the map
      }

      for (var i = 0; i < dungeon.rooms.length; i++) {
        dungeon.rooms[i].draw();//draw the rooms number
      }
    }

    makeGrid(this)//make map
    createRooms(this)//make rooms
    draw(this)//update
  }
}
