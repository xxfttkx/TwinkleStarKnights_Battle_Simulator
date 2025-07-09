import { CharacterBase } from '../types/CharacterBase';

export class 悪姫兎視たんたん_セナリィ extends CharacterBase {
  static id = '悪姫兎視たんたんセナリィ';
  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを1CT経過ごとに炎属性または水属性の味方の数x2％回復（20CT）
    // ※2つの条件を満たした場合でも効果は重複しない
    // ※効果は重複せず、上書きされる/
    // 炎属性の味方のATKを17％+自身のHP2000ごと×7％アップ（30CT）（最大80％）/
    // さらに水属性の味方のATKを17％+自身のHP2000ごと×7％アップ（30CT）（最大80％）/
    // 一番後方の味方のノーツを7前方に移動
    const num = this.battleSystem.team.filter(
      c => c.isElement('炎') || c.isElement('水')
    ).length;
    this.battleSystem.setRecoverHPEveryCT(num * 0.02, 20);
    for (const c of this.battleSystem.getLastCharacters()) {
      c.notesForward(7);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 味方のHPを45％+炎属性または水属性の味方の数×9％回復/
    // 炎属性または水属性の味方のATKを56％+自身のHP2000ごと×16％アップ（30CT）（最大200％）
    // ※2つの条件を満たした場合でも効果は重複しない/
    // 味方のHPがオーバーヒール状態（100％超）の時、
    // 炎属性の味方のノーツを5～5前方に移動し、
    // さらに水属性の味方のノーツを5～5前方に移動/
    // 味方のHPがフルオーバーヒール状態（300％）の時、
    // 自身のEX消費量を水属性の味方の数×15減少（次ターン以降EXスキル1回発動まで）
    const num = this.battleSystem.team.filter(
      c => c.isElement('炎') || c.isElement('水')
    ).length;
    this.battleSystem.addHP(0.45 + num * 0.09);
    if (this.battleSystem.isOverheal()) {
      for (const c of this.battleSystem.team) {
        if (c.isElement('炎') || c.isElement('水')) {
          c.notesForward(5);
        }
      }
    }
    if (this.battleSystem.isFullOverheal()) {
      this.setExBuff(
        this.battleSystem.team.filter(c => c.isElement('水')).length * 15,
        1
      );
    }
  }
}
export default 悪姫兎視たんたん_セナリィ;
