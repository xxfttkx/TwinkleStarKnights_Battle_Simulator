import { CharacterBase } from '../types/CharacterBase';

export class 美の冒涜者_ヴァレリー extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getFactionCount('人間')
    );
    for (const c of team) {
      c.ctForward(4);
    }
    if (this.battleSystem.isOverHeal()) {
      this.setBuff({
        target: 'ct',
        name: '美の冒涜者_ヴァレリー',
        val: 0.5,
        duration: 1,
      });
    }
  }

  useSkill2(team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getFactionCount('人間')
    );
    if (this.battleSystem.isOverHeal()) {
      for (const c of team) {
        c.setBuff({
          target: 'ct',
          name: '美の冒涜者_ヴァレリー',
          val: 0.15,
          duration: 10,
        });
      }
    }
    if (this.battleSystem.isFullOverheal()) {
      for (const c of team) {
        c.ctForward(6);
      }
    }
  }
}
