import { CharacterBase } from '../types/CharacterBase';

export class 万成の幼天使_セシア extends CharacterBase {
  skill1CD: number = 0;

  updateCT(): void {
    super.updateCT();
    if (this.skill1CD > 0) {
      this.skill1CD--;
    }
  }
  getEx2Cost(): number {
    return 300;
  }

  canUseSkill1(): boolean {
    return this.skill1CD <= 0;
  }

  useSkill1(_team: CharacterBase[]): void {
    this.setBuff({
      target: 'ct',
      name: '万成の幼天使_セシア',
      val: 0.54,
      duration: 1,
    });
    this.setExBuff(100, 1);
    // スキル再使用時間12CT
    this.skill1CD = 12;
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族')) {
        c.notesForward(10);
      }
    }
  }
}
