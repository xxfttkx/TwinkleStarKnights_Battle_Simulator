import { CharacterBase, type Buff } from '../types/CharacterBase';

export class 聖夜のキャロル_ルルカ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.data.faction === '魔族' || c.data.element === '雷') {
        c.ctForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.data.faction === '魔族' || c.data.element === '雷') {
        const buff: Buff = {
          target: 'ct',
          name: 'name不重要吧',
          val: 0.15, // Buff 的效果值
          duration: 10, // Buff 的持续时间
        };
        c.setBuff(buff);
        c.ctForward(7);
      }
    }
  }
}
