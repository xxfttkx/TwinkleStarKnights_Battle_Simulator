import { CharacterBase } from '../types/CharacterBase';

export class 鶴翼の針妙美鶴 extends CharacterBase {
  static id = '鶴翼の針妙美鶴';

  getEx_up(): number {
    let buffExUp = 0;
    for (const buff of this.buffs) {
      if (buff.target === 'ex_up') {
        buffExUp += buff.val;
      }
    }
    return super.getEx_up() + buffExUp;
  }

  useSkill1(_team: CharacterBase[]): void {
    // 敵単体に200％のダメージ
    // スタンゲージ4減少
    // 自身のEX上昇を50アップ（25CT）
    // 自身の右1レーンにいる味方のノーツを5前方に移動
    this.setExUpBuff('鶴翼の針妙美鶴.id', 50, 25);
    this.getRightCharacter()?.notesForward(5);
  }

  useSkill2(_team: CharacterBase[]): void {
    // 敵全体に200％のダメージ
    // 100％の確率で凍傷を付与（8CT）
    // 水属性の味方のATKを200％アップ（20CT）
    // クリティカル時のダメージ倍率を50％加算（20CT）
  }
}
export default 鶴翼の針妙美鶴;
