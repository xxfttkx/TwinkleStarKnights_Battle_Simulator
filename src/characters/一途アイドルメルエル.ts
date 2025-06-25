import { CharacterBase } from '../types/CharacterBase';

export class 一途アイドル_メルエル extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('炎')) {
        c.ctForward(7);
      }
    }
    if(this.battleSystem.isFullOverheal()) {
      this.battleSystem.addEx(100);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('炎')) {
        c.ctForward(7);
      }
    }
  }
}
