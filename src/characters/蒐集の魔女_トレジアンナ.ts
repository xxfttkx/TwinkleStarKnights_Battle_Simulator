import { CharacterBase } from '../types/CharacterBase';

export class 蒐集の魔女_トレジアンナ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('魔族')) {
        c.notesForward(3);
      }
    }
    for (const c of team) {
      if (c.isElement('光')) {
        c.notesForward(3);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('魔族') || c.isElement('光')) {
        c.notesForward(7);
      }
    }
    if (this.battleSystem.getElementCount('光') >= 5) {
      this.setExBuff(40, 1);
    }
  }

  getEx_up(): number {
    let buffExUp = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ex_up') {
        buffExUp += buff.val;
      }
    }
    return super.getEx_up() + buffExUp;
  }
}
