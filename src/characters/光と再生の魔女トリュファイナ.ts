import { CharacterBase } from '../types/CharacterBase';

export class 光と再生の魔女トリュファイナ extends CharacterBase {
  static id = '光と再生の魔女トリュファイナ';

  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを40%+魔族の味方の数×8%回復
    // 魔族の味方のATKを魔族の味方の数×20%アップ(30CT)
    // ノーツを4前方に移動
    // 味方のHPがフルオーバーヒール状態(300%)の時、自身のEX消費量100減少(次ターン以降EXスキル1回発動まで)
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getFactionCount('魔族')
    );
    this.battleSystem.team.forEach(c => {
      if (c.isFaction('魔族')) {
        c.notesForward(4);
      }
    });
    this.battleSystem.isFullOverheal() && this.setExBuff(100, 1);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に1600%+オーバーヒール割合(フルオーバーヒール時200%)×8%のダメージ
    // 自身のATKを魔族の味方の数×50%アップ(1CT)
  }
}
export default 光と再生の魔女トリュファイナ;
