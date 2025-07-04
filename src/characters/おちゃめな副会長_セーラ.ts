import { CharacterBase } from '../types/CharacterBase';

export class おちゃめな副会長_セーラ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('雷')) {
        c.ctForward(1);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {}
}
