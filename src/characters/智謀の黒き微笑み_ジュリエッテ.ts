import { CharacterBase } from '../types/CharacterBase';

export class 智謀の黒き微笑み_ジュリエッテ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.4 + this.battleSystem.getElementCount('闇') * 0.08
    );
    for (const c of this.battleSystem.getSecondCharacters()) {
      c.notesForward(3);
    }
    if (this.battleSystem.getElementCount('闇') >= 3) {
      for (const c of this.battleSystem.getLastCharacters()) {
        c.notesForward(10); // 给最后一个位置的角色充能
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.5 + this.battleSystem.getElementCount('闇') * 0.1
    );
    for (const c of team) {
      if (c.isElement('闇')) {
        c.notesForward(7);
      }
    }
    if (this.battleSystem.isOverHeal()) {
      // todo: atk
    }
    if (this.battleSystem.isFullOverheal()) {
      // 自身の右1レーンにいる味方のEX消費量を闇属性の味方の数×15減少（次ターン以降EXスキル1回発動まで）
      this.getRightCharacter()?.setExBuff(
        this.battleSystem.getElementCount('闇') * 15,
        1
      );
    }
  }
}
