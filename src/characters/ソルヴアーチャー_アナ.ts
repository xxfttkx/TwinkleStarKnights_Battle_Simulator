import { CharacterBase } from '../types/CharacterBase';

export class ソルヴアーチャー_アナ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に144%のダメージ
    // 50%の確率で火傷を付与(40CT)
    // 自身のクリティカル14.8%加算(40CT)
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に134%のダメージ
    // 36%の確率で火傷を付与(40CT)
    // 一番後方の味方のノーツを3前方に移動
    for (const c of this.battleSystem.getLastCharacters()) {
      c.notesForward(3);
    }
  }
}
