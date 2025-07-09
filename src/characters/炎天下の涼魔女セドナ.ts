import { CharacterBase } from '../types/CharacterBase';

export class 炎天下の涼魔女セドナ extends CharacterBase {
  static id = '炎天下の涼魔女セドナ';

  useSkill1(_team: CharacterBase[]): void {
    // 対象とその左右2レーンにいる敵すべてに134％のダメージ/
    // 被ダメージ10％増加（10CT）/
    // 味方全体のノーツを1～3前方に移動
    this.battleSystem.team.forEach(c => c.notesForward(1));
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に336％のダメージ/
    // スタンゲージ6減少/
    // 魔族のATKを魔族の味方の数×100％アップ（1CT）
  }
}
export default 炎天下の涼魔女セドナ;
