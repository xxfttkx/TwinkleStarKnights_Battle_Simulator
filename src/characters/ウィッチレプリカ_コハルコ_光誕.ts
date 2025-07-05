import { CharacterBase } from '../types/CharacterBase';

export class ウィッチレプリカ_コハルコ_光誕 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    this.battleSystem.getRightmostCharacter()?.setBuff({
      target: 'ct',
      name: 'ウィッチレプリカ_コハルコ_光誕',
      val: 0.2,
      duration: 10,
    });
    // アタックタイプまたはヒールタイプの味方のノーツを5～5前方に移動/
    for (const c of team) {
      if (c.isType('ATK') || c.isType('HEAL')) {
        c.notesForward(5);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    // 魔族または光属性の味方の行動CT15％短縮（10CT）/
    // ノーツを7～7前方に移動
    for (const c of team) {
      if (c.isFactionOrElement('魔族', '光')) {
        c.setBuff({
          target: 'ct',
          name: 'ウィッチレプリカ_コハルコ_光誕',
          val: 0.15,
          duration: 10,
        });
        c.notesForward(7);
      }
    }
  }
}
