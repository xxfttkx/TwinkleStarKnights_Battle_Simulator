import { CharacterBase } from '../types/CharacterBase';

export class 魔を断つ聖剣_ユーリス extends CharacterBase {
  static id = '魔を断つ聖剣ユーリス';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に288%のダメージ
    // 自身のクリティカル19.8%加算(40CT)
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に332%×6回のダメージ
    // 一番後方の味方のノーツを3前方に移動
    for (const c of this.battleSystem.getLastCharacters()) {
      c.notesForward(3);
    }
  }
}
export default 魔を断つ聖剣_ユーリス;
