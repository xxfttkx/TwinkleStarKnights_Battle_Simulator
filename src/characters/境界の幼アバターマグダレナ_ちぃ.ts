import { CharacterBase } from '../types/CharacterBase';

export class 境界の幼アバターマグダレナ_ちぃ extends CharacterBase {
  static id = '境界の幼アバターマグダレナ（ちぃ）';

  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを40%+水属性の味方の数×8%回復/
    // 水属性の味方のATKを水属性の味方の数×20%アップ(30CT) /
    // ノーツを4前方に移動/
    // 味方のHPがフルオーバーヒール状態(300%)の時、自身のEX消費量100減少(次ターン以降 EXスキル1回発動まで)
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getElementCount('水')
    );
    this.battleSystem.team.forEach(c => {
      if (c.isElement('水')) {
        c.notesForward(4);
      }
    });
    this.battleSystem.isFullOverheal() && this.setExBuff(100, 1);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200%+オーバーヒール割合(フルオーバーヒール時200%)×1%のダメージ/
    // 味方のHPを50%+水属性の味方の数×10%回復/
    // 味方のHPがオーバーヒール状態(100%超)の時、味方全体の行動CT15%短縮(10CT)/
    // 敵全体に100%の確率で凍傷を付与(8CT)
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getElementCount('水')
    );
    this.battleSystem.isOverheal() &&
      this.battleSystem.team.forEach(c =>
        c.setCTBuff(境界の幼アバターマグダレナ_ちぃ.id, 15, 10)
      );
  }
}
export default 境界の幼アバターマグダレナ_ちぃ;
