import { CharacterBase } from '../types/CharacterBase';

export class 極天アルケミスト_アニマ_極天 extends CharacterBase {
  static id = '極天アルケミストアニマ《極天》';
  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ/
    // チーム内の異なる属性が5種類以上の時、敵単体に極天の呪縛を付与する（8CT）/
    // 自身の右1レーンにいる味方のATK100％アップ（40CT）/
    // 自身を含む魔族または雷属性の味方を3体以上編成している時、自身の右1レーンにいる味方のノーツを10前方に移動
    // ※極天の呪縛：すべての属性から受ける攻撃が弱点属性扱いとなる（攻撃側の属性は変化しない）
    if (this.battleSystem.getFactionOrElementCount('魔族', '雷')) {
      this.getRightCharacter()?.notesForward(10);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200％のダメージ/
    // チーム内の異なる属性が5種類以上の時、敵全体に極天の呪縛を付与する（8CT）/
    // 魔族または雷属性の味方のATK200％アップ（40CT）/
    // ノーツを7～7前方に移動※2つの条件を満たした場合でも効果は重複しない
    // ※極天の呪縛：すべての属性から受ける攻撃が弱点属性扱いとなる（攻撃側の属性は変化しない）
    for (const c of this.battleSystem.team) {
      if (c.isFactionOrElement('魔族', '雷')) {
        c.notesForward(7);
      }
    }
  }
}
export default 極天アルケミスト_アニマ_極天;
