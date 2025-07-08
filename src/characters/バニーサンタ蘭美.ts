import { CharacterBase } from '../types/CharacterBase';

export class バニーサンタ蘭美 extends CharacterBase {
  static id = 'バニーサンタ蘭美';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に70％×8回のダメージ
    // 自身の行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）
    this.useSecondFrontAllyNoteReturn = true;
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に250％×10回のダメージ
    // 15ノックバック
    // 自身を含む2体以上ユニゾン時、自身のクリティカル時のダメージ倍率を自身を含むユニゾンの味方の数×15％加算（1CT）
    // 1バトル中、自身のEXスキル2の使用が2回目以降の時、自身のATKを200％アップ（1CT）
    // 自身の行動CT20％遅延(20CT)
    this.setCTBuff('バニーサンタ蘭美', -20, 20);
  }
}
export default バニーサンタ蘭美;
