import { CharacterBase } from '../types/CharacterBase';

export class 星選の大怪盗_ミネコ extends CharacterBase {
  useSkill1(_team: CharacterBase[]): void {
    // 自身のATKを人間の味方の数×23％アップ（20CT）/
    // さらに光属性の味方の数×23％アップ（20CT）/
    // 自身の行動終了後のノーツ戻り位置を前から2番目の味方と同じ位置にする（対象がいない場合、行動CT値を参照した位置に戻る）/
    // 自身の被ダメージ10％増加（30CT）/
    // チャージ状態の時、自身にステルス状態を付与（40CT）

    // 怎么还有23％这种奇妙数值

    this.useSecondFrontAllyNoteReturn = true;
    if (this.isCharged) {
      this.setBuff({
        target: 'ステルス',
        name: '星選の大怪盗_ミネコ',
        val: 1,
        duration: 40,
      });
    }
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵単体に250％×10回のダメージ/
    // 自身を含む2体以上ユニゾン時、敵単体にユニゾン中の味方の数×10％被ダメージ増加（1CT）/
    // 自身の行動CT20％遅延（20CT）
    this.setCTBuff('星選の大怪盗_ミネコ', -20, 20);
  }
}
