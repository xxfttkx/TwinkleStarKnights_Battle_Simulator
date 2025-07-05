import { CharacterBase, type Buff } from '../types/CharacterBase';

export class 霹靂の射手_梨緒 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    let secondPos = 999;
    for (const c of team) {
      if (c.notes != 0) secondPos = Math.min(secondPos, c.notes); // 找到第二个位置的最小 CT
    }
    for (const c of team) {
      if (c.notes == secondPos) {
        c.notesForward(3); // 给队友充能
      }
    }
    if (this.isThreeNingen(team)) {
      let isReady = false;
      for (const c of team) {
        if (isReady) {
          c.notesForward(10);
          break;
        }
        if (c.data.name == '霹靂の射手_梨緒') {
          isReady = true; // 检查是否有充能的角色
        }
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      c.notesForward(7);
    }
    if (this.isThreeNingen(team)) {
      for (const c of team) {
        const buff: Buff = {
          target: 'ct',
          name: 'name不重要吧',
          val: 0.15, // Buff 的效果值
          duration: 5, // Buff 的持续时间
        };
        c.setBuff(buff);
      }
    }
  }

  isThreeNingen(team: CharacterBase[]): boolean {
    let count = 0;
    for (const c of team) {
      if (c.isFaction('人間')) {
        count++;
      }
    }
    return count >= 3;
  }
}
