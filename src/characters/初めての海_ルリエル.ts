import { CharacterBase } from '../types/CharacterBase';

export class 初めての海_ルリエル extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    this.getLeftCharacter()?.notesForward(4);
    this.setBuff({
      target: 'ct',
      name: '初めての海_ルリエル_スキル1',
      val: 0.2,
      duration: 1,
    });
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族') || c.isElement('雷')) {
        c.notesForward(7);
      }
    }
    this.setBuff({
      target: 'ct',
      name: '初めての海_ルリエル_スキル2',
      val: 0.2,
      duration: 1,
    });
  }
}
