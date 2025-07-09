import { CharacterBase } from '../types/CharacterBase';

export class サマーアイギスアム extends CharacterBase {
  static id = 'サマーアイギスアム';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ
    // 被ダメージを炎属性の味方の数×8％増加(20CT)
    // 自身の右1レーンにいる味方のノーツを4前方に移動
    this.getRightCharacter()?.notesForward(4);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 対象とその左右1レーンにいる敵すべてに200％のダメージ
    // ノーツをタイムライン上15の位置にワープさせる【強制移動無効対象外】
    // 味方に4回の攻撃を無効化するバリアを張る（40CT）【バフ解除無効】
  }
}
export default サマーアイギスアム;
