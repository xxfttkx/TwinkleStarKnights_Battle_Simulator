import { CharacterBase } from '../types/CharacterBase';

export class 真夏の竜妃マハムート extends CharacterBase {
  static id = '真夏の竜妃マハムート';

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に70%×8回のダメージ/
    // 自身の行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）
    this.useSecondFrontAllyNoteReturn = true;
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に2500%のダメージ/
    // ノーツを15後方に強制移動/
    // 自身のATKをラッシュ数×5%(最大1000%)アップ(1CT)/
    // 自身の行動CT20%遅延(20CT)
    this.setCTBuff('真夏の竜妃マハムート.id', -20, 20);
  }
}
export default 真夏の竜妃マハムート;
