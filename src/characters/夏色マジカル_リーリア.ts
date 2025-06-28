import { CharacterBase } from '../types/CharacterBase';

export class 夏色マジカル_リーリア extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isType('ATK')) {
        c.ctForward(4);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('魔族') || c.isElement('水')) {
        c.ctForward(10);
      }
    }
  }
}
