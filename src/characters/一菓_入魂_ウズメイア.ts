import { CharacterBase } from '../types/CharacterBase';

export class 一菓_入魂_ウズメイア extends CharacterBase {
  static id = '一菓♥入魂ウズメイア';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に100％ダメージ
    // 被ダメージを炎属性の味方の数×8％増加（20CT）
    // 前から2番目にいる味方のノーツを3前方に移動
    // 自身を含む炎属性の味方を5体以上編成している時、敵単体のEXゲージを100吸収し、その内の50％味方のEXゲージを回復
    for (const c of this.battleSystem.getSecondCharacters()) {
      c.notesForward(3);
    }
    if (this.battleSystem.getElementCount('炎') >= 5) {
      this.battleSystem.addEx(50);
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に330％のダメージ
    // 被ダメージを炎属性の味方の数×8％増加（20CT）
    // 敵単体に魅了を付与（8CT）
    // ノックバック無効を付与（1CT）
    // 自身のEX上昇を100アップ（25CT）
    // ※魅了状態：付与された敵のノーツが停止する。さらに、魅了状態の敵と隣接する敵が同ノーツ位置に移動した際、その敵も魅了状態となり停止する。
    this.setExUpBuff('一菓_入魂_ウズメイア', 100, 25);
  }
}
export default 一菓_入魂_ウズメイア;
