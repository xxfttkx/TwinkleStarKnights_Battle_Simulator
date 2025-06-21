import emitter from '../eventBus';
import { CharacterBase } from '../types/CharacterBase';

export class 夏空の一番星_ヴィーナス extends CharacterBase {
  private skill1Active: boolean = false; // 跟踪 Skill1 是否激活
  private skill1RemainingCt: number = 0; // 跟踪 Skill1 的剩余持续时间

  useSkill1(team: CharacterBase[]): void {
    console.log(
      `夏空の一番星_ヴィーナス useSkill1 in class_夏空の一番星_ヴィーナス`
    );
    this.skill1Active = true;
    this.skill1RemainingCt = 25; // 设置持续时间为 25 CT
    emitter.emit('ex-up-changed', this.data.name);
    for (const c of team) {
      console.log(`${c.data.name} Forward(7)`);
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
    return super.getEx_up() + (this.skill1Active ? 60 : 0);
  }

  updateCT(): void {
    super.updateCT();
    if (this.skill1Active) {
      this.skill1RemainingCt -= 1;
      if (this.skill1RemainingCt <= 0) {
        this.skill1Active = false; // 技能效果结束
      }
    }
  }
}
