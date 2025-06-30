import { CharacterBase } from '../types/CharacterBase';

export class アイシクルノヴァ_サーシャ_絶氷 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('魔族')) {
        c.ctForward(3);
      }
    }
    for (const c of team) {
      if (c.isElement('水')) {
        c.ctForward(3);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('魔族') || c.isElement('水')) {
        c.ctForward(7);
      }
    }
  }
}
