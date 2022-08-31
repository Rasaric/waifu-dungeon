/*******************************************************************************


Character Constructor


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'

//PreLoader class***************************************************************
export default class Vision {
  constructor(scene) {

  }
  //create fog------------------------------------------------------------------
  fogOfWar(scene){
    let fogWidth = scene.dungeonMap.w*scene.dungeonMap.cols;
    let fogHeight = scene.dungeonMap.w*scene.dungeonMap.rows;
    const rt = scene.make.renderTexture({width: fogWidth, height: fogHeight}, true);
    rt.fill(0x000000, 1);
    rt.alpha = 0.9;
    rt.setDepth(4);

    //create a mask---------------------------------------------------------------
    scene.vision = scene.make.image({x: scene.player.x,	y: scene.player.y,	key: 'vision', add: false});

    //cut mask into fog-----------------------------------------------------------
    rt.mask = new Phaser.Display.Masks.BitmapMask(scene, scene.vision);
    rt.mask.invertAlpha = true;
  }
}
