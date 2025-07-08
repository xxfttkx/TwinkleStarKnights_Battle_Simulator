import { CharacterBase } from '../types/CharacterBase';

export class 小さき復讐者_エンジュ extends CharacterBase {
  static id = '小さき復讐者エンジュ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ/
    // 敵全体の被ダメージを闇属性またはコラプサーの味方の数×8％（自身を含むコラプサーの味方と2体以上ユニゾン時、10％）増加（20CT）
    // ※2つの条件を満たした場合でも効果は重複しない
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に150％×8回のダメージ/
    // 闇属性またはコラプサーの味方のATKを闇属性またはコラプサーの味方の数×54％アップ（40CT）/
    // ノーツを7～7前方に移動 ※2つの条件を満たした場合でも効果は重複しない/
    // ラッシュ数が50以上の時、自身の行動CTを20％短縮（1CT）
    for (const c of this.battleSystem.team) {
      if (c.isElement('闇') || c.isAffiliation('コラプサー')) {
        c.notesForward(7);
      }
    }
    if (this.battleSystem.getRush() >= 50) {
      this.setCTBuff('小さき復讐者_エンジュ', 20, 1);
    }
  }
}
export default 小さき復讐者_エンジュ;
