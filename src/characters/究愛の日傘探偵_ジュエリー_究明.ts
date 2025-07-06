import { CharacterBase } from '../types/CharacterBase';

export class 究愛の日傘探偵_ジュエリー_究明 extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 一番右に配置されている味方のATKを50％+自身の基礎ATK200ごと×8％アップ（30CT）（最大150％）/
    // クリティカルを20％加算（30CT）/
    // 一番後方の味方のノーツを前から2番目の味方と同じ位置に移動/
    // 被ダメージ50％増加（20CT）
    const secPos = this.battleSystem.getSecondPos();
    if (secPos != 999) {
      for (const c of this.battleSystem.getLastCharacters()) {
        c.notesChange(secPos);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    // 敵全体に60％のダメージ/
    // 人間または光属性の味方のクリティカルを光属性の味方の数×10％加算（30CT）/
    // 行動CT15％短縮（10CT）/
    // ノーツを7～7前方に移動 ※2つの条件を満たした場合でも効果は重複しない/
    // 味方全体に「究明の恩寵」の効果
    // ※究明の恩寵：対象に付与されているデバフ・状態異常効果をすべて解除し、解除された効果の数×20味方のEXゲージを回復（最大100）
    for (const c of team) {
      if (c.isFactionOrElement('人間', '光')) {
        c.setCTBuff('究愛の日傘探偵_ジュエリー_究明', 15, 10);
        c.notesForward(7);
      }
    }
  }
}
