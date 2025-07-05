import { CharacterBase } from '../types/CharacterBase';

export class 一意専心_メルエル extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {}

  useSkill2(_team: CharacterBase[]): void {
    for (const c of this.battleSystem.getLastCharacters()) {
      c.notesForward(3);
    }
  }
}
