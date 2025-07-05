import { CharacterBase, type Buff } from '../types/CharacterBase';

export class 自称妹魔王_メイプル extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    const [left, right] = [this.getLeftCharacter(), this.getRightCharacter()];
    if (left) {
      const isYami = left.isElement('闇');
      const buff: Buff = {
        target: 'ct',
        name: '自称・妹魔王_メイプル_EXスキル1',
        val: isYami ? 0.402 : 0.201, // Buff 的效果值
        duration: 30, // Buff 的持续时间
      };
      left.setBuff(buff);
    }
    if (right) {
      const isYami = right.isElement('闇');
      right.notesForward(isYami ? 8 : 5);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('闇')) {
        c.notesForward(5);
      }
    }
    if (this.battleSystem.getElementCount('闇') >= 5) {
      for (const c of team) {
        const buff: Buff = {
          target: 'ct',
          name: '自称・妹魔王_メイプル_EXスキル2',
          val: 0.15, // Buff 的效果值
          duration: 5, // Buff 的持续时间
        };
        c.setBuff(buff);
      }
    }
  }
}
