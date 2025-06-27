import { CharacterBase, type Buff } from '../types/CharacterBase';

export class 正義のハッカー_コハルコ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {}

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      const buff: Buff = {
        target: 'ct',
        name: 'name不重要吧',
        val: c.isElement('光') ? 0.176 : 0.123,
        duration: 30,
      };
      c.setBuff(buff);
    }
  }
}
