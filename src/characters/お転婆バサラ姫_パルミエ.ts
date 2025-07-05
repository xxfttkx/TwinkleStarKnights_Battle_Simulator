import { CharacterBase } from '../types/CharacterBase';

export class お転婆バサラ姫_パルミエ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    this.setBuff({
      target: 'ct',
      name: 'お転婆バサラ姫_パルミエ',
      val: 0.1,
      duration: 1,
    });
    this.getRightCharacter()?.notesForward(10);
  }

  useSkill2(_team: CharacterBase[]): void {
    this.getRightCharacter()?.notesForward(3);
  }
}
