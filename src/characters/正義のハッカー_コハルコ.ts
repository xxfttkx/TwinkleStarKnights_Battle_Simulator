import { CharacterBase, type Buff } from '../types/CharacterBase';

export class 正義のハッカー_コハルコ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {}

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      const buff: Buff = c.isElement('光')
        ? {
            target: 'ct',
            name: 'name不重要吧',
            val: 0.176, // Buff 的效果值
            duration: 30, // Buff 的持续时间
          }
        : {
            target: 'ct',
            name: 'name不重要吧',
            val: 0.123, // Buff 的效果值
            duration: 30, // Buff 的持续时间
          };
      c.setBuff(buff);
    }
  }
}
