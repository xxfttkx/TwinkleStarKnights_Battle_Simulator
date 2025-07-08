import { CharacterBase } from '../types/CharacterBase';

export class ワタシプレゼントリップル extends CharacterBase {
  static id = 'ワタシプレゼントリップル';

  useSkill1(_team: CharacterBase[]): void {
    // 対象とその左右1レーンにいる敵すべてに188％のダメージ
    // 敵単体の被ダメージを光属性の味方の数×8％増加(20CT)
    // 自身に挑発状態を付与（50CT）【バフ解除無効】
    // 自身が庇護状態の時、自身の行動CT20％短縮（5CT）
    if (this.hasStatus('庇護状態')) {
      this.setCTBuff('ワタシプレゼントリップル', 20, 5);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に230％×10回のダメージ
    // 自身に庇護状態を付与（50CT）【バフ解除無効】
    // 被ダメージ20％軽減（50CT）【バフ解除無効】
    // カウンター[進攻]：光属性の味方のノーツを前方に5～5移動を付与（2回発動まで）【バフ解除無効】
    // ※庇護状態：範囲効果も含む敵からのダメージやスキル効果を自身に引き付ける（ランブル敗北ダメージ、反射ダメージは除く）
    // ※カウンター：自身が敵からの攻撃を受けた際に記載の効果を発動する
    this.setStatus('庇護状態', 50);
  }
}
export default ワタシプレゼントリップル;
