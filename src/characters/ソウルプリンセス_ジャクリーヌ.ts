import { CharacterBase } from '../types/CharacterBase';

export class ソウルプリンセス_ジャクリーヌ extends CharacterBase {
  static id = 'ソウルプリンセスジャクリーヌ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ
    // 自身の右1レーンの味方にステルス状態を付与（40CT）（優先発動）/
    // アタックタイプの味方のノーツを4前方に移動/
    // 自身の左右1レーンの雷属性の味方に炎の「サブ属性」を付与する（40CT）【バフ解除無効】
    // ※ステルス状態：攻撃対象から除外されるようになる（範囲ダメージ含む）。味方が1人だけの状態では発動しない。
    // ※サブ属性：属性指定スキルの条件や対象に含まれる（ダメージ計算には影響しない）
    this.getRightCharacter()?.setStealth(ソウルプリンセス_ジャクリーヌ.id, 40);
    for (const c of this.battleSystem.team) {
      if (c.isType('ATK')) {
        c.notesForward(4);
      }
    }
    this.getLeftCharacter()?.setSubElementBuff('炎', 40);
    this.getRightCharacter()?.setSubElementBuff('炎', 40);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に150％×10回のダメージ
    // 自身と自身の左1レーンの味方にステルス状態を付与（40CT）（優先発動）
    // ステルス状態の味方3体以上の時、敵単体の被ダメージを40％増加(20CT)
    // ※ステルス状態：攻撃対象から除外されるようになる（範囲ダメージ含む）。味方が1人だけの状態では発動しない。
    this.setStealth(ソウルプリンセス_ジャクリーヌ.id, 40);
    this.getLeftCharacter()?.setStealth(ソウルプリンセス_ジャクリーヌ.id, 40);
  }
}
export default ソウルプリンセス_ジャクリーヌ;
