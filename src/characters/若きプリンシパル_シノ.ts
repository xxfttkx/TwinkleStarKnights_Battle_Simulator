import { CharacterBase } from '../types/CharacterBase';

export class 若きプリンシパル_シノ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    // 敵単体に70％×8回のダメージ/
    // 人間の味方のノーツを前方に3～3移動/
    // さらに水属性の味方のノーツを3～3前方に移動/
    // 人間の味方を3体以上編成している時、自身の右2レーンにいる味方にチャージ状態を付与
    for (const c of team) {
      if (c.isFaction('人間')) {
        c.notesForward(3);
      }
      if (c.isElement('水')) {
        c.notesForward(3);
      }
    }
    if (this.battleSystem.getFactionCount('人間') >= 3) {
      const rightTwoLanes = this.getRightLanes(2);
      for (const c of rightTwoLanes) {
        c.setCharged();
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 対象とその左右1レーンにいる敵すべてに50％のダメージ/
    // ノーツをタイムライン上15の位置にワープさせる【強制移動無効対象外】
    // ※指定の位置より後方の敵も15の位置にワープさせる/
    // 人間または水属性の味方のATKを50％+自身の基礎ATK200ごと×13％アップ（30CT）（最大200％）
    // ※2つの条件を満たした場合でも効果は重複しない/
    // 人間または水属性の味方を5体以上編成している時、自身のEX消費量を50減少（次ターン以降EXスキル1回発動まで）
    if (this.battleSystem.getFactionOrElementCount('人間', '水') >= 5) {
      this.setExBuff(50, 1);
    }
  }
}
