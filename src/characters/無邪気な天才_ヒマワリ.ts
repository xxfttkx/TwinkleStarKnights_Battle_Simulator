import { CharacterBase } from '../types/CharacterBase';

export class 無邪気な天才_ヒマワリ extends CharacterBase {
  static id = '無邪気な天才ヒマワリ';
  useSkill1(_team: CharacterBase[]): void {
    // 一番後方の味方のノーツを前から2番目の味方と同じ位置に移動/
    // 行動CT13.9％短縮（30CT）/
    // このスキルの対象に人間が含まれる場合、その人間のATKを100％アップ（30CT）/
    // 自身の左1レーンの味方にチャージ状態を付与
    const secPos = this.battleSystem.getSecondPos();
    if (secPos != 999) {
      for (const c of this.battleSystem.getLastCharacters()) {
        c.notesChange(secPos);
        c.setCTBuff('無邪気な天才_ヒマワリ', 13.9, 30);
      }
    }
    this.getLeftCharacter()?.setCharged();
  }

  useSkill2(_team: CharacterBase[]): void {
    // 人間の味方のATK200％アップ（30CT）/
    // さらに闇属性の味方のATK200％アップ（30CT）/
    // 人間または闇属性の味方のノーツを7前方に移動 ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
    // 自身を含む人間の味方を5体以上編成している時、味方全体の行動CTを10％短縮（5CT）
    for (const c of this.battleSystem.team) {
      if (c.isFactionOrElement('人間', '闇')) {
        c.notesForward(7);
      }
    }
    if (this.battleSystem.getFactionCount('人間') >= 5) {
      for (const c of this.battleSystem.team) {
        c.setCTBuff('無邪気な天才_ヒマワリ', 10, 5);
      }
    }
  }
}
export default 無邪気な天才_ヒマワリ;
