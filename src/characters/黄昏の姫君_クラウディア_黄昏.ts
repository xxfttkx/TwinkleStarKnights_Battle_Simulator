import { CharacterBase } from '../types/CharacterBase';

export class 黄昏の姫君_クラウディア_黄昏 extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    // 光属性の味方のノーツを7~7前方に移動
    for (const c of team) {
      if (c.isElement('光')) {
        c.notesForward(7);
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('光')) {
        c.notesForward(7);
      }
    }
  }
}
