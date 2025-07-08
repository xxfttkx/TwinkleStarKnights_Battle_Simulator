import { CharacterBase } from '../types/CharacterBase';

export class ナギサフォーム_アポロ extends CharacterBase {
  static id = 'ナギサフォームアポロ';

  getEx_up(): number {
    let buffExUp = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ex_up') {
        buffExUp += buff.val;
      }
    }
    return super.getEx_up() + buffExUp;
  }

  useSkill1(_team: CharacterBase[]): void {
    // 一番後方の味方のノーツを前から2番目の味方と同じ位置に移動/
    // 行動CT13.9％短縮（30CT）/
    // このスキルの対象に人間または雷属性が含まれる場合、その対象と自身のATKを150％アップ（30CT）
    // ※2つの条件を満たした場合でも効果は重複しない/
    // 自身の左1レーンの味方にチャージ状態を付与
    const secPos = this.battleSystem.getSecondPos();
    if (secPos !== 999) {
      for (const c of this.battleSystem.getLastCharacters()) {
        c.notesChange(secPos);
        c.setCTBuff('ナギサフォーム_アポロ', 13.9, 30);
        if (c.isFactionOrElement('人間', '雷')) {
          c.setATKBuff('ナギサフォーム_アポロ', 150, 30);
          // todo: 错误的，自身只该加一次，但atkbuff什么都每做所以懒改了
          this.setATKBuff('ナギサフォーム_アポロ', 150, 30);
        }
      }
    }
    this.getLeftCharacter()?.setCharged();
  }

  useSkill2(_team: CharacterBase[]): void {
    // 人間の味方のATK200％アップ（30CT）/
    // さらに雷属性の味方のATK200％アップ（30CT）/
    // 人間または雷属性の味方のノーツを7～7前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
    // 自身を含む人間または雷属性の味方と3体以上ユニゾン時、さらに人間または雷属性の味方のATKを10％+自身の基礎ATK200ごと×7.5％アップ（30CT）（最大100％）
    // ※2つの条件を満たした場合でも効果は重複しない
    for (const c of this.battleSystem.team) {
      if (c.isFactionOrElement('人間', '闇')) {
        c.notesForward(7);
      }
    }
  }

  // todo: ex2+
  // 敵単体に2700％のダメージ/
  // 人間の味方のATK200％アップ（30CT）/
  // さらに雷属性の味方のATK200％アップ（30CT）/
  // 人間または雷属性の味方のノーツを7～7前方に移動
  // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
  // 自身を含む人間または雷属性の味方と3体以上ユニゾン時、さらに人間または雷属性の味方のATKを10％+自身の基礎ATK200ごと×7.5％アップ（30CT）（最大100％）
  // ※2つの条件を満たした場合でも効果は重複しない
}
export default ナギサフォーム_アポロ;
