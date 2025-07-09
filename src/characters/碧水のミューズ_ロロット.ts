import { CharacterBase } from '../types/CharacterBase';

export class 碧水のミューズ_ロロット extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getFactionOrElementCount('神族', '水')
    );
    for (const c of team) {
      if (c.isFaction('神族') || c.isElement('水')) {
        c.notesForward(5);
      }
    }
    this.setBuff({
      target: 'ct',
      name: '碧水のミューズ_ロロット',
      val: 0.5,
      duration: 1,
    });
  }

  useSkill2(team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getFactionOrElementCount('神族', '水')
    );
    if (this.battleSystem.isOverheal()) {
      for (const c of team) {
        c.setBuff({
          target: 'ct',
          name: '碧水のミューズ_ロロット',
          val: 0.15,
          duration: 10,
        });
      }
    }
    if (this.battleSystem.isFullOverheal()) {
      for (const c of team) {
        c.notesForward(6);
      }
    }
  }
}
