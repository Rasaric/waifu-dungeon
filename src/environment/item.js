/*******************************************************************************


Enemy Constructor - Item


*******************************************************************************/

//required----------------------------------------------------------------------
import Phaser from 'phaser'
export default class Item {
  constructor(name, url, combat, dodge, damage, armor, flavor) {
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
    card.rarity--
    if (card.rarity === 0){
      scene.lootDeck.splice(card, 1);
      console.log(scene.lootDeck);
    }
  }
}
