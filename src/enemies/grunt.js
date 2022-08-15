/*******************************************************************************


Enemy Constructor - Grunt


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
import BaseCharacter from '../characters/baseCharacter'

export default class Grunt extends BaseCharacter {
	constructor(scene, x, y, texture, dH, dW, weapon, armor, kbS) {
		super(scene, x, y, texture, dH, dW, weapon, armor, kbS);

		this.displayWidth = 64;
		this.displayHeight = 64;
		this.weapon = 'rusty sword';
		this.armorName = 'tattered robes';
		this.knockbackSpeed = 10;
		this.attackCooldown = 1000;
	}

	/*Grunt Methods**************************************************************/

	//AI--------------------------------------------------------------------------
	fakePathfind(player, grunt){
		let toX = player.x;
		let toY = player.y;
		let fromX = grunt.x;
		let fromY = grunt.y;
		if (Math.abs(toX-fromX)<600 && Math.abs(toY-fromY)<600){
			if(toX>fromX){
				grunt.setVelocityX(300);
			} else if(toX<fromX){
				grunt.setVelocityX(-300);
			}

			if(toY>fromY){
				grunt.setVelocityY(300);
			} else if(toY<fromY){
				grunt.setVelocityY(-300);
			}
		} else {
			grunt.setVelocity(0);
		}
	}


// 	onPatrol(scene, enemy){
// 		//determine current coordinates and where to go-----------------------------
// 		var x = scene.player.x;
// 		var y = scene.player.y;
// 		var toX = Math.floor(x/scene.dungeonMap.w);
// 		var toY = Math.floor(y/scene.dungeonMap.w);
// 		var fromX = Math.floor(enemy.x/scene.dungeonMap.w);
// 		var fromY = Math.floor(enemy.y/scene.dungeonMap.w);
// 		console.log(`going from ${fromX}, ${fromY} to ${toX}, ${toY}`);
//
// 		scene.finder.findPath(fromX, fromY, toX, toY, function( path ) {
// 			console.log(path);
// 			if (path === null) {
// 				console.warn("Path was not found.");
// 			} else {
// 				console.log(path);
// 				scene.moveCharacter(path);
// 			}
// 		});
// 		scene.finder.calculate();
// 	}
//
// 	moveCharacter (scene, path){
//     // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
//     var tweens = [];
//     for(var i = 0; i < path.length-1; i++){
//         var ex = path[i+1].x;
//         var ey = path[i+1].y;
//         tweens.push({
//             targets: scene.player,
//             x: {value: ex*scene.dungeonMap.w, duration: 200},
//             y: {value: ey*scene.dungeonMap.w, duration: 200}
//         });
//     }
//
//     scene.tweens.timeline({
//         tweens: tweens
//     });
// };
}
