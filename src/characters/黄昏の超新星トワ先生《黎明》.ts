import { CharacterBase } from '../types/CharacterBase';

export class 黄昏の超新星_トワ先生_黎明 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('闇')) {
        c.ctForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('闇')) {
        c.ctForward(7);
      }
    }
  }
}
