import { CharacterBase } from '../types/CharacterBase';

export class 静粛なる祈り手グロリア extends CharacterBase {
  static id = '静粛なる祈り手グロリア';

  useSkill1(_team: CharacterBase[]): void {
    // 前から2番目にいる味方のEX消費量を神族の味方の数×10%減少(次ターン以降EXスキル1回発動まで)/
    // ノーツを3前方に移動
    // 被ダメージ50%増加(20CT)
    this.battleSystem.getSecondCharacters().forEach(c => {
      c.setExBuff(this.battleSystem.getFactionCount('神族') * 0.1, 1);
      c.notesForward(3);
      // c.setDamageTakenBuff(0.5, 20);
    });
  }

  useSkill2(_team: CharacterBase[]): void {
    // 神族の味方のATKにスキル発動者自身の基礎ATK×2.8の固定値を加算(30CT) /
    // ノーツを前方に7～7移動/
    // 味方全体の被ダメージ10%増加(30CT)
    this.battleSystem.team.forEach(
      c => c.isFaction('神族') && c.notesForward(7)
    );
  }
}
export default 静粛なる祈り手グロリア;
