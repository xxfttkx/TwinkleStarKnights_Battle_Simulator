import { CharacterBase } from '../types/CharacterBase';

export class 最後のコラプサー_レイラ extends CharacterBase {
  useSkill1(team: CharacterBase[]): void {
    /*
    	敵単体に150%×4回のダメージ（味方のHPがオーバーヒール状態（100％超）の時、攻撃回数2回増加）/
      闇属性の味方のノーツを5～5前方に移動/
      コラプサーの味方の行動CT20%短縮（5CT）/
      コラプサーの味方を3体以上編成している時、コラプサーの味方（闇属性を除く）に闇の「サブ属性」を付与する（40CT）（優先発動）【バフ解除無効】
      ※サブ属性：属性指定スキルの条件や対象に含まれる（ダメージ計算には影響しない）
    */
    if (this.battleSystem.getAffiliationCount('コラプサー') >= 3) {
      for (const c of team) {
        if (c.isAffiliation('コラプサー') && !c.isElement('闇')) {
          c.setSubElementBuff('闇', 40);
        }
      }
    }
    for (const c of team) {
      if (c.isElement('闇')) {
        c.notesForward(5);
      }
      if (c.isAffiliation('コラプサー')) {
        c.setBuff({
          target: 'ct',
          name: '最後のコラプサー_レイラ',
          val: 0.2,
          duration: 5,
        });
      }
    }
  }

  useSkill2(team: CharacterBase[]): void {
    /*
    	敵全体に30%×8回のダメージ/
      闇属性の味方のATK300%アップ（30CT）/
      さらにコラプサーの味方のATK100%アップ（30CT）/
      闇属性のノーツを8～8前方に移動
    */
    for (const c of team) {
      if (c.isElement('闇')) {
        c.notesForward(8);
      }
    }
  }
}
