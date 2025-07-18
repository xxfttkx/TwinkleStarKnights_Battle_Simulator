import { CharacterBase } from '../types/CharacterBase';

export class 招福の明星_ヴィーナス extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    if (this.isCharged) {
      this.battleSystem.addEx(100);
    }
    for (const c of team) {
      c.notesForward(7); // 给队友充能
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.data.faction === '人間' || c.data.element === '水') {
        c.notesForward(7); // 给队友充能
      }
    }
  }
}
