import { CharacterBase } from '../types/CharacterBase';

export class 傲岸なる演出家ロクサーナ extends CharacterBase {
  static id = '傲岸なる演出家ロクサーナ';
  useSkill1(_team: CharacterBase[]): void {
    // 味方のHPを40％+水属性の味方の数×8％回復/
    // 前から2番目にいる味方のノーツを3前方に移動/
    // 水属性の味方を3体以上編成している時、一番後方の味方のノーツを10前方に移動
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getElementCount('水')
    );
    this.battleSystem.getSecondCharacters().forEach(c => c.notesForward(3));
    if (this.battleSystem.getElementCount('水') >= 3) {
      this.battleSystem.getLastCharacters().forEach(c => c.notesForward(10));
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 味方のHPを50％+水属性の味方の数×10％回復/
    // 自身の右1レーンにいる味方のATK300％アップ（20CT）/
    // 味方のHPがオーバーヒール状態（100％超）の時、味方全体の行動CT15％短縮（10CT）/
    // 味方のHPがフルオーバーヒール状態（300％）の時、味方全体のノーツを前方に6～6移動
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getElementCount('水')
    );
    if (this.battleSystem.isOverheal()) {
      this.battleSystem.team.forEach(c =>
        c.setCTBuff('傲岸なる演出家ロクサーナ.id', 15, 10)
      );
    }
    if (this.battleSystem.isFullOverheal()) {
      this.battleSystem.team.forEach(c => c.notesForward(6));
    }
  }
}
export default 傲岸なる演出家ロクサーナ;
