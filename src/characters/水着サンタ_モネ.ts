import { CharacterBase } from '../types/CharacterBase';

export class 水着サンタ_モネ extends CharacterBase {
  static id = '水着サンタ！？モネ';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に288％のダメージ
    // 自身と自身の右1レーンの味方のATK100％（ディフェンスタイプの場合、150％）アップ（30CT）
    // 光属性の味方のノーツを4前方に移動
    this.battleSystem.team.forEach(c => {
      if (c.isElement('光')) {
        c.notesForward(4);
      }
    });
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200％のダメージ
    // 光属性の味方のATK218％アップ（30CT）
    // クリティカル時のダメージ倍率を50％加算（20CT）
    // ノーツを7（ディフェンスタイプの場合、10）前方に移動
    this.battleSystem.team.forEach(c => {
      if (c.isElement('光')) {
        c.notesForward(c.isType('DEF') ? 10 : 7);
      }
    });
  }
}
export default 水着サンタ_モネ;
