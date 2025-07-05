import { CharacterBase } from '../types/CharacterBase';

export class 虹色の魔弾使い_リーリア extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 一番後方の味方のノーツを3前方に移動
    for (const c of this.battleSystem.getLastCharacters()) {
      c.notesForward(3);
    }
  }

  useSkill2(_team: CharacterBase[]): void {}
}
