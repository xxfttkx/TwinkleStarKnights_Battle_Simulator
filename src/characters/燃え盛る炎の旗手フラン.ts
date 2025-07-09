import { CharacterBase } from '../types/CharacterBase';

export class 燃え盛る炎の旗手フラン extends CharacterBase {
  static id = '燃え盛る炎の旗手フラン';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に600%のダメージ
    // 神族の味方のATK100%アップ(40CT)
    // 前から2番目にいる味方のノーツを4前方に移動
    this.battleSystem.getSecondCharacters().forEach(c => c.notesForward(4));
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に60%のダメージ
    // 神族の味方の行動CT10%短縮(5CT)
    // 味方全体のノーツを前方に3〜4(神族の場合、10～10)移動
    for (const c of this.battleSystem.team) {
      if (c.isFaction('神族')) {
        c.setCTBuff(燃え盛る炎の旗手フラン.id, 10, 5);
      }
      c.notesForward(c.isFaction('神族') ? 10 : 4);
    }
  }
}
export default 燃え盛る炎の旗手フラン;
