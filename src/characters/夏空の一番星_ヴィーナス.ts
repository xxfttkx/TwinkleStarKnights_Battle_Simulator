import emitter from '../eventBus';
import { CharacterBase } from '../types/CharacterBase';

export class 夏空の一番星_ヴィーナス extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    this.setBuff({
      target: 'ex_up',
      name: '夏空の一番星_ヴィーナス',
      val: 60,
      duration: 25,
    });
    emitter.emit('ex-up-changed', this.data.name);
    for (const c of team) {
      c.ctForward(7);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.data.faction === '人間' || c.data.element === '水') {
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
