import { CharacterBase } from '../types/CharacterBase';

export class 煌炎の超天使_アナ_煌炎 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族')||c.isElement('炎')) {
        c.ctForward(4);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族')||c.isElement('炎')) {
        c.ctForward(7);
      }
    }
  }
}
