import { CharacterBase } from '../types/CharacterBase';

export class 二代目_三太九郎_セシア extends CharacterBase {
  static id = '二代目・三太九郎セシア';
  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを40％+流星学園附属の味方の数×8％回復/
    // 自身の右1レーンにいる味方のATKを流星学園附属の味方の数×20％アップ（20CT）/
    // 流星学園附属の味方のノーツを4前方に移動
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getAffiliationCount('流星学園附属')
    );
    this.battleSystem.team.forEach(
      c => c.isAffiliation('流星学園附属') && c.notesForward(4)
    );
  }

  useSkill2(_team: CharacterBase[]): void {
    // 味方のHPを45％+流星学園附属の味方の数×9％回復/
    // 味方全体のATKを流星学園附属の味方の数×40％アップ（20CT）/
    // 味方のHPがオーバーヒール状態（100％超）の時、流星学園附属の味方の行動CT15％短縮（10CT）/
    // 味方のHPがフルオーバーヒール状態（300％）の時、流星学園附属の味方のノーツを6～6前方に移動
    this.battleSystem.addHP(
      0.45 + 0.09 * this.battleSystem.getAffiliationCount('流星学園附属')
    );
    if (this.battleSystem.isOverheal()) {
      this.battleSystem.team.forEach(
        c =>
          c.isAffiliation('流星学園附属') &&
          c.setCTBuff('二代目_三太九郎_セシア.id', 15, 10)
      );
    }
    if (this.battleSystem.isFullOverheal()) {
      this.battleSystem.team.forEach(
        c => c.isAffiliation('流星学園附属') && c.notesForward(6)
      );
    }
  }
}
export default 二代目_三太九郎_セシア;
