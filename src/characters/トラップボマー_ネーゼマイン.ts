import { CharacterBase } from '../types/CharacterBase';

export class トラップボマー_ネーゼマイン extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 一番後方の味方のノーツを前から2番目の味方と同じ位置に移動
    // 行動CT13.9%短縮 (30CT)
    // クリティカル14.8%加算(30CT)
    const secPos = this.battleSystem.getSecondPos();
    for (const c of this.battleSystem.getLastCharacters()) {
      if (secPos != 999) {
        c.notesChange(secPos);
      }
      c.setCTBuff('トラップボマー_ネーゼマイン', 13.9, 30);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体のATKを5.4% (光属性の場合、さらに6.6%) ダウン (40CT)
    // 36%の確率で混乱を付与 (40CT)
    // 100%のダメージ
  }
}
