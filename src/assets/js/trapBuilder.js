/*******************************************************************************


Trap Constructor


*******************************************************************************/
//required----------------------------------------------------------------------


//monster builder-----------------------------------------------------------------
class Trap {
  constructor(name, sprite, combat, damage, ) {
    this.name= name;
    this.sprite = sprite;
    //stats
    this.combat = combat;
    this.damage = damage;
    //status
    this.isTriggered = false;
  }

  /*Trap Methods**************************************************************/
  //Combat----------------------------------------------------------------------
  onFight(target){
    if(this.isTriggered=true){return false;}
    let atkRoll = Math.floor(Math.random()*10)+this.combat;
    console.log(`attack ${atkRoll}, defense ${defRoll}`)

    if (atkRoll>defRoll) {
      damageDealt = target.armor-this.damage;
      if (damageDealt<=0) {console.log(`${this.name} barely glanced ${target.name}'s ${target.armor}`);}
      else{
        target.hp = target.hp-(target.armor-this.combat);
        if(target.hp<=0){
          console.log(`${target.name} was killed by ${this.name}!`);
          target.isAlive=false;
        } else {
          console.log(`${target.name} was struck by a ${this.name}, taking ${damageDealt} damage. ${target.name} has ${target.hp}hp left`);
        }
      }
    } else {
      console.log(`${target.name} dodged the ${this.name}`);
    }
  }

module.exports = Trap;
