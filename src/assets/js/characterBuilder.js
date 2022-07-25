/*******************************************************************************


Character Constructor


*******************************************************************************/
//required----------------------------------------------------------------------


//character builder-----------------------------------------------------------------
class Character {
  constructor(name, sprite, combat, dodge, hp, damage, armor, weapon) {
    this.name= name;
    this.sprite = sprite;
    //stats
    this.combat = combat;
    this.dodge = dodge;
    this.hp = hp;
    this.damage = damage;
    this.weapon = weapon;
    this.armor = armor;
    this.inventory = [];
    //status
    this.isAlive(true);
  }

  /*character Methods**************************************************************/
  //Combat----------------------------------------------------------------------
  onFight(target){

    let atkRoll = Math.floor(Math.random()*10)+this.combat;
    let defRoll = Math.floor(Math.random()*10)+target.dodge;

    console.log(`attack ${atkRoll}, defense ${defRoll}`)

    if (atkRoll>defRoll) {
      damageDealt = target.armor-this.combat;
      if (damageDealt<=0) {console.log(`${this.name} barely glanced ${target.name}'s ${target.armor}`);}
      else{
        target.hp = target.hp-(target.armor-this.combat);
        if(target.hp<=0){
          console.log(`${this.name} killed ${target.name} with her ${this.weapon}!`);
          target.isAlive=false;
        } else {
          console.log(`${this.name} attacked ${target.name} for ${this.damage} damage with their ${this.weapon}, ${target.name} has ${target.hp}hp left`);
        }
      }
    } else {
      console.log(`${target.name} dodged ${this.name}'s attack`);
    }
  }
  addItem(item){
    this.inventory.push(item);
  }

module.exports = Character;