import { CharacterBase } from '../types/CharacterBase';

export class 煌炎の超天使_アナ_煌炎 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族') || c.isElement('炎')) {
        c.notesForward(4);
        // 行動CT20％短縮（5CT）
        c.setBuff({
          target: 'ct',
          name: '煌炎の超天使_アナ_煌炎_スキル1',
          val: 0.2,
          duration: 5,
        });
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族') || c.isElement('炎')) {
        c.notesForward(7);
      }
    }
  }
}
