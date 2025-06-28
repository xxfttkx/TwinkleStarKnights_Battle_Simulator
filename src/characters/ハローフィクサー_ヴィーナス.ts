import { CharacterBase } from '../types/CharacterBase';

export class ハローフィクサー_ヴィーナス extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      c.ctForward(7);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 味方HP50%以下時、自身の行動CT26.4%短縮(30CT)
    if (this.battleSystem.hp < 0.5) {
      this.setBuff({
        target: 'ct',
        name: 'ハローフィクサー_ヴィーナス',
        val: 0.264,
        duration: 30,
      });
    }
  }
}
