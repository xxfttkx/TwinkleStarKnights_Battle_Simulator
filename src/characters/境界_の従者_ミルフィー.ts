import { CharacterBase } from '../types/CharacterBase';

export class 境界_の従者_ミルフィー extends CharacterBase {
  static id = '《境界》の従者ミルフィー';

  useSkill1(_team: CharacterBase[]): void {
    // 一番後方の味方のノーツを前から2番目の味方と同じ位置に移動
    // 行動CT13.9%短縮（30CT）
    // このスキルの対象に神族が含まれる場合、自身の行動CT30%短縮（1CT）
    // 自身の右1レーンの味方のATK100%アップ（30CT）
    var flag = false;
    const secPos = this.battleSystem.getSecondPos();
    for (const c of this.battleSystem.getLastCharacters()) {
      flag = flag || c.isFaction('神族');
      if (secPos != 999) {
        c.notesChange(secPos);
      }
      c.setCTBuff(境界_の従者_ミルフィー.id, 13.9, 30);
    }
    flag && this.setCTBuff(境界_の従者_ミルフィー.id, 30, 1);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200%のダメージ
    // 神族の味方のクリティカルを神族の味方の数×8.2%加算（20CT）
    // クリティカル時のダメージ倍率を50%加算（20CT）
    // ノーツを7～7前方に移動
    for (const c of this.battleSystem.team) {
      if (c.isFaction('神族')) {
        // c.setCriticalBuff(境界_の従者_ミルフィー.id, 8.2, 20);
        // c.setCriticalDamageBuff(50, 20);
        c.notesForward(7);
      }
    }
  }
}
export default 境界_の従者_ミルフィー;
