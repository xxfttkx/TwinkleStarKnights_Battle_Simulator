import { CharacterBase } from '../types/CharacterBase';

export class 聖庭園の刺客_ナターシャ extends CharacterBase {
  static id = '聖庭園の刺客ナターシャ';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に94％×6回のダメージ/
    // 被ダメージを神族または光属性の味方の数×8％（ラッシュ30以上の時、10％）増加（20CT）
    // ※2つの条件を満たした場合でも効果は重複しない/
    // 自身の行動CT20％短縮（10CT）
    this.setCTBuff('聖庭園の刺客_ナターシャ', 20, 10);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に150％×8回のダメージ/
    // 神族または光属性の味方のノーツを7～7前方に移動
    // ※2つの条件を満たした場合でもノーツ移動効果は重複しない/
    // 神族の味方が5体以上の時、敵単体に弱点属性を付与（5CT）
    // ※弱点属性：すべての属性から受ける攻撃が弱点属性扱いとなる（攻撃側の属性は変化しない）
    for (const c of this.battleSystem.team) {
      if (c.isFactionOrElement('神族', '光')) {
        c.notesForward(7);
      }
    }
  }
}
export default 聖庭園の刺客_ナターシャ;
