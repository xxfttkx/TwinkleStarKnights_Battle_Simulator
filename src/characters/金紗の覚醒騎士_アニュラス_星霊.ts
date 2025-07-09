import { CharacterBase } from '../types/CharacterBase';

export class 金紗の覚醒騎士_アニュラス_星霊 extends CharacterBase {
  static id = '金紗の覚醒騎士アニュラス《星霊》';

  useSkill1(_team: CharacterBase[]): void {
    // 自身に「星霊の恩寵」の効果
    // ※星霊の恩寵：自身のATK170％アップ（20CT）/
    // 自身の行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）
    this.useSecondFrontAllyNoteReturn = true;
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に105％（自身を含む2体以上ユニゾン時、140%）×16回のダメージ/
    // 100％の確率で強制スタン（10CT）/
    // 攻撃対象が光属性の場合、100％の確率で封印を付与（40CT）/
    // 攻撃対象が闇属性の場合、100％の確率で萎縮【大】を付与（40CT）/
    // 自身の行動CT20％遅延（30CT）
    this.setCTBuff('金紗の覚醒騎士アニュラス《星霊》.id', -20, 30);
  }
}
export default 金紗の覚醒騎士_アニュラス_星霊;
