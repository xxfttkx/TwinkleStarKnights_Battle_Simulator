import { CharacterBase } from '../types/CharacterBase';

export class 健全シーレジャーイクシリオン extends CharacterBase {
  static id = '健全シーレジャーイクシリオン';

  useSkill1(_team: CharacterBase[]): void {
    // 自身のATKを神族の味方の数×23％アップ（20CT）
    // さらに雷属性の味方の数×23％アップ（20CT）
    // 自身の行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）
    this.useSecondFrontAllyNoteReturn = true;
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に2500％のダメージ
    // 100％の確率で麻痺を付与（15CT）
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('健全シーレジャーイクシリオン.id', -20, 20);
  }
}
export default 健全シーレジャーイクシリオン;
