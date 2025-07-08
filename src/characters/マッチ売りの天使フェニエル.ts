import { CharacterBase } from '../types/CharacterBase';

export class マッチ売りの天使フェニエル extends CharacterBase {
  static id = 'マッチ売りの天使フェニエル';

  useSkill1(_team: CharacterBase[]): void {
    // 前から2番目にいる味方のEX消費量を神族の味方の数×10％減少(次ターン以降EXスキル1回発動まで) /
    // ATKを100％アップ（40CT）/
    // ノーツを6前方に移動
    const secondFrontAlly = this.battleSystem.getCharacterByIndex(2 - 1);
    if (secondFrontAlly) {
      secondFrontAlly.setExBuff(
        this.battleSystem.getFactionCount('神族') * 0.1,
        1
      );
      secondFrontAlly.notesForward(6);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200％のダメージ/
    // 被ダメージを神族の味方の数×8％増加(20CT)/
    // 神族の味方のノーツを7～7（味方HP80％以下時は8～8、50％以下時は10～10）前方に移動
    for (const c of this.battleSystem.team) {
      if (c.isFaction('神族')) {
        c.notesForward(7);
      }
    }
  }
}
export default マッチ売りの天使フェニエル;
