import { CharacterBase } from '../types/CharacterBase';

export class 悪即ブーステッド_セナリィ_女帝 extends CharacterBase {
  static id = '悪即ブーステッドセナリィ《女帝》';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ/
    // 自身に「女帝の恩寵」の効果/
    // 挑発状態を付与（50CT）【バフ解除無効】/
    // カウンター[覇気]：自身のATK60％アップ（40CT）する効果を付与（5回発動まで）【バフ解除無効】（カウンター効果は重複しない）/
    // アタックタイプの味方のノーツを4前方に移動
    // ※女帝の恩寵：敵からの攻撃によるスタンゲージ減少を無効化する（30CT）【バフ解除無効】（強制スタンは対象外）
    this.battleSystem.team.forEach(c => c.isType('ATK') && c.notesForward(4));
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に450％（「女帝の恩寵」効果時、500％）のダメージ/
    // 自身に庇護状態を付与（50CT）【バフ解除無効】/
    // 被ダメージ20％軽減（50CT）【バフ解除無効】/
    // カウンター[進攻]：人間の味方のノーツを前方に5～5移動を付与（2回発動まで）【バフ解除無効】
  }
}
export default 悪即ブーステッド_セナリィ_女帝;
