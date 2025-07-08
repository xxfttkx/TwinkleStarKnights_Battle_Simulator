import { CharacterBase } from '../types/CharacterBase';

export class 爆砕_破壊天使_メテオラ extends CharacterBase {
  static id = '爆砕★破壊天使メテオラ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ/
    // 標的状態を付与（10CT）/
    // 闇属性またはコラプサーの味方のノーツを4～4前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない
    // ※標的：対象へのダメージが50％アップ、通常攻撃によるスタンゲージ減少が2倍になる
    for (const c of this.battleSystem.team) {
      if (c.isElement('闇') || c.isAffiliation('コラプサー')) {
        c.notesForward(4);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に500％のダメージ/
    // 自身のATKをコラプサーの味方の数×100％アップ（1CT）/
    // 味方のHPがフルオーバーヒール状態（300％）の時、自身のクリティカル時のダメージ倍率を50％加算（1CT）/
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('爆砕_破壊天使_メテオラ', -20, 20);
  }
}
export default 爆砕_破壊天使_メテオラ;
