import { CharacterBase } from '../types/CharacterBase';

export class カジノスパイラル_ヒルディオーネ extends CharacterBase {
  static id = 'カジノスパイラルヒルディオーネ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ/
    // 敵全体の被ダメージを水属性の味方の数×8％（炎属性の味方を1体以上編成している時、10％）増加（20CT）/
    // 自身に挑発状態を付与（50CT）【バフ解除無効】/
    // ユニゾン時、自身を含むユニゾンした人数によって以下の効果を適用する
    // ・2、4体の時：自身の行動CT20％短縮（30CT）
    // ・3、5体の時：自身のATK120%アップ（30CT）
    const unisonCount = this.battleSystem.getUnisonCount();
    if (unisonCount === 2 || unisonCount === 4) {
      this.setCTBuff('カジノスパイラル_ヒルディオーネ', 20, 30);
    } else if (unisonCount === 3 || unisonCount === 5) {
      // 自身のATK120%アップ（30CT）
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に450％（自身を含む味方3体以上ユニゾン時、500％）のダメージ/
    // 自身に庇護状態を付与（50CT）【バフ解除無効】/
    // 被ダメージ20％軽減（50CT）【バフ解除無効】/
    // カウンター[進攻]：炎属性または水属性の味方のノーツを前方に5～5移動を付与（2回発動まで）【バフ解除無効】
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない
    // ※庇護状態：範囲効果も含む敵からのダメージやスキル効果を自身に引き付ける（ランブル敗北ダメージ、反射ダメージは除く）
    // ※カウンター：自身が敵からの攻撃を受けた際に記載の効果を発動する
  }
}
export default カジノスパイラル_ヒルディオーネ;
