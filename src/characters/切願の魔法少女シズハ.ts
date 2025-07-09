import { CharacterBase } from '../types/CharacterBase';

export class 切願の魔法少女シズハ extends CharacterBase {
  static id = '切願の魔法少女シズハ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体のEXゲージを50吸収し、その内の100％味方のEXゲージを回復/
    // 自身の左1レーンにいる味方のATKにスキル発動者自身の基礎ATK×1.6の固定値を加算（20CT）/
    // ノーツを前方に5移動
    this.battleSystem.addEx(50);
    this.getLeftCharacter()?.notesForward(5);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 水属性の味方のATKにスキル発動者自身の基礎ATK×4の固定値を加算（40CT）/
    // 前から2番目にいる味方のノーツを3前方に移動
    this.battleSystem.getSecondCharacters().forEach(c => c.notesForward(3));
  }
}
export default 切願の魔法少女シズハ;
