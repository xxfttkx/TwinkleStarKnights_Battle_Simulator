import { CharacterBase, type Buff } from '../types/CharacterBase';

export class 渇望の武闘天使_イングリット extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    if (this.battleSystem.isOverheal()) {
      for (const c of team) {
        const buff: Buff = {
          target: 'ct',
          name: '智謀の黒き微笑み_ジュリエッテ_EXスキル1',
          val: 0.15, // Buff 的效果值
          duration: 5, // Buff 的持续时间
        };
        c.setBuff(buff);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    if (this.battleSystem.isFullOverheal()) {
      this.battleSystem.addHP(1.0 - this.battleSystem.hp);
    } else if (this.battleSystem.isOverheal()) {
      this.battleSystem.addHP(1.0 - this.battleSystem.hp);
    }
  }
}
