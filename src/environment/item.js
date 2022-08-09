/*******************************************************************************


Enemy Constructor - Item


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
export default class Item {
  constructor(name, url, combat, dodge, damage, armor, flavor, rarity) {
    this.name = name
    this.url = url
    this.combat = combat
    this.dodge = dodge
    this.damage = damage
    this.armor = armor
    this.flavor = flavor
    this.rarity = rarity
  }
  onDraw(scene, card){
    scene.lootDeck.splice(card.name, 1);
  }
}
