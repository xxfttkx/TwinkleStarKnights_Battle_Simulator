import { CharacterBase } from '../types/CharacterBase';

export class 司書の夏休みウィステリア extends CharacterBase {
  static id = '司書の夏休みウィステリア';

  useSkill1(_team: CharacterBase[]): void {
    // 自身の右1レーンの味方のATK100％アップ（30CT）
    // 自身の行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）
    // 自身の被ダメージ50％増加（20CT）
    this.useSecondFrontAllyNoteReturn = true;
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に600％のダメージ
    // 水属性の味方のATK1000％アップ（1CT）
    // 自身の被ダメージ50％増加（20CT）
  }
}
export default 司書の夏休みウィステリア;
