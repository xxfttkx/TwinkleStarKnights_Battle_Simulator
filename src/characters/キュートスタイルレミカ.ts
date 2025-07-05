import { CharacterBase } from '../types/CharacterBase';

export class キュートスタイル_レミカ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.4 + 0.08 * this.battleSystem.getElementCount('炎')
    );
    this.setBuff({
      target: 'ct',
      name: 'キュートスタイル_レミカ',
      val: 0.5,
      duration: 1,
    });
    if (this.battleSystem.isOverHeal()) {
      this.getLeftCharacter()?.notesForward(7);
    }
  }

  useSkill2(team: CharacterBase[]): void {
    this.battleSystem.addHP(
      0.5 + 0.1 * this.battleSystem.getElementCount('炎')
    );
    if (this.battleSystem.isOverHeal()) {
      for (const c of team) {
        c.setBuff({
          target: 'ct',
          name: 'キュートスタイル_レミカ',
          val: 0.15,
          duration: 10,
        });
      }
    }
    if (this.battleSystem.isFullOverheal()) {
      for (const c of team) {
        c.notesForward(6);
      }
    }
  }
}
