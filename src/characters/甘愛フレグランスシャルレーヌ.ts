import { CharacterBase } from '../types/CharacterBase';

export class 甘愛フレグランス_シャルレーヌ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    const secondCharacters = this.battleSystem.getSecondCharacters();
    if (secondCharacters.length <= 0) return;
    const secondPos = secondCharacters[0].notes;
    for (const c of this.battleSystem.getLastCharacters()) {
      c.notesChange(secondPos);
    }
    //todo: 魅了状態の敵が1体以上の場合、敵単体のEXゲージを100吸収し、その内の50％味方のEXゲージを回復
  }

  useSkill2(team: CharacterBase[]): void {
    for (const c of team) {
      if (c.isElement('炎')) {
        c.notesForward(7);
      }
    }
    // todo: 魅了状態の敵が3体以上の場合、炎属性の味方の行動CTを15％短縮（5CT）
  }
}
