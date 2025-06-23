import { CharacterBase } from '../types/CharacterBase';

export class 夏のお姉ちゃん_サーシャ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      c.ctForward(3);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('闇')) {
        c.ctForward(8);
      }
    }
  }
}
