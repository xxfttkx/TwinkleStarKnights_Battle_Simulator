import { CharacterBase } from '../types/CharacterBase';

export class 太陽の祝福_フィオナ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.data.element === '雷') {
        c.ctForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.data.element === '雷') {
        c.ctForward(7);
      }
    }
  }

  //todo: ex2+
}
