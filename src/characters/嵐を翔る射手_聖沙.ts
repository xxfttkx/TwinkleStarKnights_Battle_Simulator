import emitter from '@/eventBus';
import { CharacterBase } from '../types/CharacterBase';

export class 嵐を翔る射手_聖沙 extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    this.setBuff({
      target: 'ex_up',
      name: '嵐を翔る射手_聖沙  ',
      val: 40,
      duration: 20,
    });
    emitter.emit('ex-up-changed', this.data.name);
  }

  useSkill2(team: CharacterBase[]): void {
    if (this.isCharged) {
      for (const c of team) {
        c.ctForward(7);
      }
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
