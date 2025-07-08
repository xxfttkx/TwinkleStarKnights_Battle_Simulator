import { CharacterBase } from '../types/CharacterBase';

export class おみくじどうぞトリシャ extends CharacterBase {
  static id = 'おみくじどうぞトリシャ';

  useSkill1(_team: CharacterBase[]): void {
    // 自身の右1レーンにいる味方の行動CT30％短縮（10CT）
    // ATKを100％アップ（30CT）
    // ノーツを7前方に移動
    const rightChar = this.getRightCharacter();
    if (rightChar) {
      rightChar.setCTBuff(おみくじどうぞトリシャ.id, 30, 10);
      rightChar.notesForward(7);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 炎属性の味方のATKを200％アップ（20CT）
    // クリティカル時のダメージ倍率を50％加算（20CT）
    // ノーツを7～7前方に移動
    for (const c of this.battleSystem.team) {
      if (c.isElement('炎')) {
        c.setATKBuff(おみくじどうぞトリシャ.id, 200, 20);
        c.notesForward(7);
      }
    }
  }
}
export default おみくじどうぞトリシャ;
