import { CharacterBase } from '../types/CharacterBase';

export class 流星の姫君_フィオナ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    for (const c of this.battleSystem.getSecondCharacters()) {
      c.ctForward(3);
    }
  }

  useSkill2(_team: CharacterBase[]): void {}
}
