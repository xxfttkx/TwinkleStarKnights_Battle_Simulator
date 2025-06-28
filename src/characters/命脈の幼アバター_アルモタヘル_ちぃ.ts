import { CharacterBase } from '../types/CharacterBase';

export class 命脈の幼アバター_アルモタヘル_ちぃ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('水')) {
        c.ctForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('水')) {
        c.ctForward(7);
      }
    }
  }
}
