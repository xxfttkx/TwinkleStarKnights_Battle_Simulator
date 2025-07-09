import { CharacterBase } from '../types/CharacterBase';

export class 江戸っ子巫女ヒヨ extends CharacterBase {
  static id = '江戸っ子巫女ヒヨ';

  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを1CT経過ごとに人間の味方の数x2%回復（20CT）※効果は重複せず、上書きされる
    // 人間の味方の「固有ゲージ」を1増加する
    // 人間の味方のノーツを4前方に移動
    // スキル再使用時間6CT
    // ※固有ゲージ： 「〇〇状態」という特殊な強化状態に移行できるキャラが持つ、状態移行までの段階を表すゲージ
    this.battleSystem.setRecoverHPEveryCT(
      0.02 * this.battleSystem.getFactionCount('人間'),
      20
    );
    // todo: 人間の味方の「固有ゲージ」を1増加する
    this.battleSystem.team.forEach(
      c => c.isFaction('人間') && c.notesForward(4)
    );
  }

  useSkill2(_team: CharacterBase[]): void {
    // 味方のHPを50％+人間の味方の数×10％回復
    // 人間の味方の行動CT10％短縮（5CT）
    // 味方のHPがオーバーヒール状態（100%超）の時、味方全体のノーツを6～6前方に移動
    // 味方のHPがフルオーバーヒール状態（300%）の時、自身のEX消費量100減少（次ターン以降EXスキル1回発動まで）
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getFactionCount('人間')
    );
    this.battleSystem.team.forEach(
      c => c.isFaction('人間') && c.setCTBuff('江戸っ子巫女ヒヨ.id', 10, 5)
    );
    if (this.battleSystem.isOverheal()) {
      this.battleSystem.team.forEach(c => c.notesForward(6));
    }
    if (this.battleSystem.isFullOverheal()) {
      this.setExBuff(100, 1);
    }
  }
}
export default 江戸っ子巫女ヒヨ;
