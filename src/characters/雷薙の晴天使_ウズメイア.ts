import { CharacterBase } from '../types/CharacterBase';

export class 雷薙の晴天使_ウズメイア extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isFaction('神族')) {
        // 神族の味方の行動CT20%短縮(5CT)
        c.setBuff({
          target: 'ct',
          name: '雷薙の晴天使_ウズメイア_スキル1',
          val: 0.2,
          duration: 5,
        });
        c.notesForward(4);
      }
    }
  }

  useSkill2(_team: CharacterBase[]): void {}
}
