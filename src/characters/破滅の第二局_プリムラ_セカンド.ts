import { CharacterBase } from '../types/CharacterBase';

export class 破滅の第二局_プリムラ_セカンド extends CharacterBase {
  static id = '破滅の第二局プリムラ《セカンド》';

  useSkill1(_team: CharacterBase[]): void {
    // 自身に「セカンドの恩寵」の効果
    // ATKを魔族の味方の数×36％アップ（20CT）
    // 行動CT70％短縮（1CT）
    // 自身を含む魔族の味方を5体以上編成している時、自身の左1レーンにいる味方のノーツを3前方に移動
    // ※セカンドの恩寵：水の「サブ属性」を付与する（40CT）【バフ解除無効】
    // ※サブ属性：属性指定スキルの条件や対象に含まれる（ダメージ計算には影響しない）
    this.setSubElementBuff('水', 40);
    this.setCTBuff('破滅の第二局プリムラ《セカンド》.id', 70, 1);
    this.battleSystem.getFactionCount('魔族') >= 5 &&
      this.getLeftCharacter()?.notesForward(3);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に2500％のダメージ
    // 敵のEXゲージを400減少させ、自身のATKを減少させたEXゲージ量×0.5％アップ（1CT）
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('破滅の第二局プリムラ《セカンド》.id', -20, 20);
  }
}
export default 破滅の第二局_プリムラ_セカンド;
