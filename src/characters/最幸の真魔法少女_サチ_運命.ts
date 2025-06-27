import emitter from '../eventBus';
import { CharacterBase } from '../types/CharacterBase';

export class 最幸の真魔法少女_サチ_運命 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    this.setBuff({
      target: 'ex_up',
      name: '最幸の真魔法少女_サチ_運命',
      val: 60,
      duration: 25,
    });
    emitter.emit('ex-up-changed', this.data.name);
    let count = 0;
    for (const c of team) {
      if (c.isFaction('魔族') || c.isElement('光')) {
        count++;
      }
    }
    if (count >= 3) {
      this.getRightCharacter()?.ctForward(10);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    // todo: EXスキル2+
    for (const c of team) {
      if (c.isFaction('魔族') || c.isElement('光')) {
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
